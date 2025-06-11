# ElevenLabs Math Tutor - Deployment Guide

## Setup Instructions

### 1. Install Supabase CLI
```bash
npm install -g supabase
```

### 2. Login to Supabase
```bash
supabase login
```

### 3. Link to Your Project
```bash
supabase link --project-ref xjmktjcflmjrqbtofdjq
```

### 4. Add Environment Secrets
Go to your Supabase Dashboard → Project Settings → Edge Functions → Environment Variables

Add these secrets:
- `ELEVENLABS_API_KEY` = your_elevenlabs_api_key
- `ELEVENLABS_AGENT_ID` = your_elevenlabs_agent_id

### 5. Deploy the Edge Function
```bash
supabase functions deploy start-conversation
```

### 6. Test the Function
```bash
# Test locally first (optional)
supabase functions serve

# Test the deployed function
curl -X POST 'https://xjmktjcflmjrqbtofdjq.supabase.co/functions/v1/start-conversation' \
  -H 'Authorization: Bearer YOUR_ANON_KEY' \
  -H 'Content-Type: application/json' \
  -d '{"concept": "probability"}'
```

## What Changed

1. **Removed VITE_ prefixes** from environment variables for security
2. **Created Supabase Edge Function** at `supabase/functions/start-conversation/index.ts`
3. **Updated VoiceAIAgent component** with real ElevenLabs integration
4. **Hardcoded Supabase credentials** in the client (anon key is safe to expose)

## How It Works

1. User visits `/concepts/probability`
2. Clicks the voice tutor button
3. Frontend calls Supabase Edge Function with concept name
4. Edge Function creates ElevenLabs conversation with concept-specific prompt
5. Returns conversation data to frontend
6. User can start voice interaction

## Testing

1. Upload a document called "probability" to your ElevenLabs knowledge base
2. Visit http://localhost:3000/concepts/probability
3. Click the voice tutor button
4. Check console for conversation ID and success messages

## Troubleshooting

- Check Supabase Edge Function logs in dashboard
- Verify ElevenLabs API keys are correctly set in Supabase secrets
- Ensure your ElevenLabs agent has access to the knowledge base
- Test the edge function directly using curl command above
