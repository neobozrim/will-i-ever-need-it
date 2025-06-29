import React, { useState, useRef, useEffect } from 'react';
import { Mic, Bot, Loader2, Play, MicOff } from 'lucide-react';
import { supabase } from '../../lib/supabase';

// Type for our conversation data
interface ConversationData {
  signed_url?: string;
  agent_id: string;
  concept: string;
  auth_created: boolean;
}

// Type for ElevenLabs conversation instance
interface ElevenLabsConversation {
  endSession: () => Promise<void>;
  setVolume: (volume: { volume: number }) => void;
  getInputVolume: () => number;
  getOutputVolume: () => number;
}

interface VoiceAIAgentProps {
  conceptSlug?: string;
}

const VoiceAIAgent: React.FC<VoiceAIAgentProps> = ({ conceptSlug }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);
  const [conversation, setConversation] = useState<ElevenLabsConversation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');

  // Use dynamic import for ElevenLabs SDK since it's browser-only
  const startTutor = async () => {
    const slug = conceptSlug || 'general-math';
    
    setIsLoading(true);
    setError(null);
    
    try {
      console.log(`Starting tutor for concept: ${slug}`);
      
      // Get signed URL from our edge function
      const response = await fetch(`https://xjmktjcflmjrqbtofdjq.supabase.co/functions/v1/start-conversation`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhqbWt0amNmbG1qcnFidG9mZGpxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk0OTYxODksImV4cCI6MjA2NTA3MjE4OX0.SWyvV0aoi8KmrW8fJGzEzy8cC3qXTy5_OyobTbVanXc`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ concept: slug })
      });
      
      const data = await response.json();
      const functionError = !response.ok ? new Error(`${response.status}: ${data.error || 'Unknown error'}`) : null;

      console.log('Function response:', { data, error: functionError });

      if (functionError) {
        console.error('Supabase function error:', functionError);
        throw new Error(functionError.message || 'Failed to call start-conversation function');
      }

      if (data?.error) {
        console.error('ElevenLabs error:', data.error);
        throw new Error(data.error);
      }

      if (!data?.agent_id) {
        throw new Error('Invalid response: missing agent_id');
      }

      setConversationData(data);
      console.log('Conversation data received:', data);
      
      // Request microphone permission explicitly
      console.log('Requesting microphone permission...');
      try {
        await navigator.mediaDevices.getUserMedia({ audio: true });
        console.log('Microphone permission granted');
      } catch (err) {
        throw new Error('Microphone permission denied. Please allow microphone access and try again.');
      }

      // Now start the actual ElevenLabs conversation
      await startElevenLabsConversation(data);
      
    } catch (err) {
      console.error('Error starting tutor:', err);
      const errorMessage = err instanceof Error ? err.message : 'Failed to start tutor. Please try again.';
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const startElevenLabsConversation = async (data: ConversationData) => {
    try {
      const { Conversation } = await import('@elevenlabs/client');

      const sessionOptions = data.signed_url 
        ? { signedUrl: data.signed_url }
        : { agentId: data.agent_id };

      console.log('Starting ElevenLabs session with options:', sessionOptions);
      setConnectionStatus('connecting');

      // Add conversation overrides with concept-specific prompt
      const conversationOverride = {
        agent: {
          prompt: {
            prompt: `You are a helpful math tutor assistant. The user is learning about ${data.concept}.

Look in your knowledge base for the document about "${data.concept}" and focus only on that topic.

You should IMMEDIATELY start the conversation by greeting the user and asking how you can help with ${data.concept}. Do not wait for the user to speak first.

Only discuss ${data.concept} - ignore other math topics in your knowledge base.`
          },
          firstMessage: `Hey! I see you're learning about ${data.concept.replace(/-/g, ' ')}. How can I assist you with this topic today?`,
          language: "en" as const // Explicitly set language with const assertion
        }
      };

      // Start session with overrides
      const conv = await Conversation.startSession({
        ...sessionOptions,
        overrides: conversationOverride,
        onConnect: () => {
          console.log('Connected to ElevenLabs');
          setIsConnected(true);
          setConnectionStatus('connected');
        },
        onDisconnect: () => {
          console.log('Disconnected from ElevenLabs');
          setIsConnected(false);
          setConnectionStatus('disconnected');
        },
        onMessage: (message) => {
          console.log('Message received:', message);
        },
        onError: (error) => {
          console.error('ElevenLabs error:', error);
          setError(`Voice connection error: ${error.message || error}`);
        },
        onModeChange: (mode) => {
          console.log('Mode changed to:', mode);
          setIsListening(mode?.mode === 'listening');
        }
      });

      const conversationId = conv.getId();
      console.log('Conversation started with ID:', conversationId);
      
      setConversation(conv);
      
    } catch (err) {
      console.error('Error starting ElevenLabs conversation:', err);
      setError(`Failed to connect to voice service: ${err instanceof Error ? err.message : 'Unknown error'}`);
      setConnectionStatus('disconnected');
    }
  };

  const endConversation = async () => {
    if (conversation) {
      try {
        await conversation.endSession();
        setConversation(null);
        setConversationData(null);
        setIsConnected(false);
        setConnectionStatus('disconnected');
        setIsListening(false);
        console.log('Conversation ended');
      } catch (error) {
        console.error('Error ending conversation:', error);
      }
    }
  };

  const formatConceptName = (slug: string): string => {
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  };

  const getStatusColor = () => {
    if (error) return 'text-red-600';
    if (isConnected && isListening) return 'text-green-600';
    if (isConnected) return 'text-blue-600';
    if (connectionStatus === 'connecting') return 'text-yellow-600';
    return 'text-gray-600';
  };

  const getStatusText = () => {
    if (error) return 'Error';
    if (isConnected && isListening) return 'Listening';
    if (isConnected) return 'Connected';
    if (connectionStatus === 'connecting') return 'Connecting';
    return 'Ready';
  };

  const getStatusIcon = () => {
    if (error) return 'bg-red-500';
    if (isConnected && isListening) return 'bg-green-500 animate-pulse';
    if (isConnected) return 'bg-blue-500';
    if (connectionStatus === 'connecting') return 'bg-yellow-500 animate-pulse';
    return 'bg-gray-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg">
            <Bot className="h-5 w-5 text-white" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">Voice AI Tutor</h3>
            <p className="text-sm text-gray-500">
              {conceptSlug ? `Ready to discuss ${formatConceptName(conceptSlug)}` : 'Click to start talking'}
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <div className={`w-2 h-2 rounded-full transition-colors ${getStatusIcon()}`}></div>
          <span className={`text-sm font-medium transition-colors ${getStatusColor()}`}>
            {getStatusText()}
          </span>
        </div>
      </div>
      
      {/* Voice controls */}
      <div className="text-center space-y-4">
        {/* Start conversation button */}
        {!conversation && (
          <button
            onClick={startTutor}
            disabled={isLoading}
            className={`w-24 h-24 rounded-full transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-blue-300 ${
              isLoading
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-gradient-to-br from-blue-500 to-purple-600 hover:shadow-xl hover:scale-105 active:scale-95'
            }`}
            aria-label={`Start ${conceptSlug ? formatConceptName(conceptSlug) : ''} tutor`}
          >
            {isLoading ? (
              <Loader2 className="h-8 w-8 text-white mx-auto animate-spin" />
            ) : (
              <Play className="h-8 w-8 text-white mx-auto ml-1" />
            )}
          </button>
        )}

        {/* Voice interaction controls */}
        {conversation && (
          <div className="flex items-center justify-center space-x-4">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-green-500 animate-pulse shadow-lg'
                : isConnected
                ? 'bg-blue-500'
                : 'bg-gray-400'
            }`}>
              {isListening ? (
                <Mic className="h-6 w-6 text-white" />
              ) : isConnected ? (
                <MicOff className="h-6 w-6 text-white" />
              ) : (
                <Loader2 className="h-6 w-6 text-white animate-spin" />
              )}
            </div>
            
            <button
              onClick={endConversation}
              className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              End Session
            </button>
          </div>
        )}
        
        <p className="text-sm text-gray-600 max-w-xs mx-auto">
          {isLoading 
            ? 'Starting tutor...' 
            : !conversation
            ? conceptSlug 
              ? `Tap to start ${formatConceptName(conceptSlug)} tutor`
              : 'Tap to start tutor'
            : connectionStatus === 'connecting'
            ? 'Connecting to voice service...'
            : isListening
            ? 'Listening... Speak now!'
            : isConnected
            ? 'Connected - waiting for you to speak'
            : 'Reconnecting...'
          }
        </p>
      </div>
      
      {/* Status messages */}
      {conversationData && isConnected && !error && (
        <div className="mt-4 p-3 bg-green-50 rounded-lg text-center border border-green-200">
          <p className="text-sm text-green-700 font-medium">✅ Voice tutor is active!</p>
          <p className="text-xs text-green-600 mt-1">
            Discussing {conversationData.concept ? formatConceptName(conversationData.concept) : 'mathematics'}
          </p>
        </div>
      )}
      
      {error && (
        <div className="mt-4 p-3 bg-red-50 rounded-lg text-center border border-red-200">
          <p className="text-sm text-red-700 font-medium">❌ Error</p>
          <p className="text-xs text-red-600 mt-1 break-words">{error}</p>
          <div className="mt-3 space-x-2">
            <button 
              onClick={() => setError(null)}
              className="text-xs text-red-600 hover:text-red-800 underline transition-colors"
            >
              Dismiss
            </button>
            <button 
              onClick={startTutor}
              className="text-xs text-red-600 hover:text-red-800 underline transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
      
      <div className="mt-6 flex items-center justify-center space-x-4 text-sm text-gray-500">
        <span>Voice Powered</span>
        <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
        <span>AI Tutor</span>
        {conceptSlug && (
          <>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span>{formatConceptName(conceptSlug)}</span>
          </>
        )}
      </div>
    </div>
  );
};

export default VoiceAIAgent;