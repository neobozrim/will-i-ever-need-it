import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { concept } = await req.json()
    
    if (!concept) {
      return new Response(
        JSON.stringify({ error: 'Concept is required' }),
        { 
          status: 400, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    // Get environment variables
    const elevenlabsApiKey = Deno.env.get('ELEVENLABS_API_KEY')
    const elevenlabsAgentId = Deno.env.get('ELEVENLABS_AGENT_ID')

    if (!elevenlabsApiKey || !elevenlabsAgentId) {
      console.error('Missing ElevenLabs credentials')
      return new Response(
        JSON.stringify({ error: 'Server configuration error - missing credentials' }),
        { 
          status: 500, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    console.log(`Creating signed URL for concept: ${concept}`)

    // Get signed URL for the conversation
    // This is the correct endpoint for ElevenLabs Conversational AI
    const signedUrlResponse = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversation/get-signed-url?agent_id=${elevenlabsAgentId}`,
      {
        method: 'GET',
        headers: {
          'xi-api-key': elevenlabsApiKey,
          'Content-Type': 'application/json'
        }
      }
    )

    if (!signedUrlResponse.ok) {
      const errorText = await signedUrlResponse.text()
      console.error('ElevenLabs signed URL error:', signedUrlResponse.status, errorText)
      return new Response(
        JSON.stringify({ 
          error: 'Failed to get signed URL from ElevenLabs',
          details: errorText,
          status: signedUrlResponse.status
        }),
        { 
          status: signedUrlResponse.status, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' }
        }
      )
    }

    const signedUrlData = await signedUrlResponse.json()
    console.log('Signed URL created successfully')
    
    // Return the signed URL and additional info for the frontend to use
    return new Response(
      JSON.stringify({
        signed_url: signedUrlData.signed_url,
        agent_id: elevenlabsAgentId,
        concept: concept,
        auth_created: true
      }),
      { 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )

  } catch (error) {
    console.error('Edge function error:', error)
    return new Response(
      JSON.stringify({ 
        error: 'Internal server error',
        message: error.message 
      }),
      { 
        status: 500, 
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    )
  }
})
