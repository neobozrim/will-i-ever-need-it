import React, { useState, useRef, useEffect } from 'react';
import { Mic, Loader2, MicOff, Settings, Volume2, VolumeX } from 'lucide-react';
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
  // Customization props
  theme?: 'default' | 'minimal' | 'compact';
  primaryColor?: string;
  showVolumeControls?: boolean;
  showStatusIndicator?: boolean;
  customPrompt?: string;
  autoStart?: boolean;
  buttonSize?: 'small' | 'medium' | 'large';
}

const VoiceAIAgent: React.FC<VoiceAIAgentProps> = ({ 
  conceptSlug,
  theme = 'default',
  primaryColor = 'blue',
  showVolumeControls = true,
  showStatusIndicator = true,
  customPrompt,
  autoStart = false,
  buttonSize = 'large'
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [conversationData, setConversationData] = useState<ConversationData | null>(null);
  const [conversation, setConversation] = useState<ElevenLabsConversation | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [connectionStatus, setConnectionStatus] = useState<'disconnected' | 'connecting' | 'connected'>('disconnected');
  const [volume, setVolume] = useState(0.8);
  const [isMuted, setIsMuted] = useState(false);
  const [showSettings, setShowSettings] = useState(false);

  // Auto-start functionality
  useEffect(() => {
    if (autoStart && !conversation && !isLoading) {
      startTutor();
    }
  }, [autoStart]);

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
      const functionError = !response.ok ? new Error(\`${response.status}: ${data.error || 'Unknown error'}`) : null;

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

      // Build conversation prompt - use custom prompt if provided
      const prompt = customPrompt || `You are Maya, a helpful and friendly math tutor. The user is learning about ${data.concept}.

Look in your knowledge base for the document about "${data.concept}" and focus only on that topic.

You should IMMEDIATELY start the conversation by greeting the user warmly and asking how you can help with ${data.concept}. Do not wait for the user to speak first.

Only discuss ${data.concept} - ignore other math topics in your knowledge base.`;

      // Add conversation overrides with concept-specific prompt
      const conversationOverride = {
        agent: {
          prompt: {
            prompt: prompt
          },
          firstMessage: `Hi there! I'm Maya, your math tutor. I see you're learning about ${data.concept.replace(/-/g, ' ')}. How can I help you with this topic today?`,
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
          setError(\`Voice connection error: ${error.message || error}`);
        },
        onModeChange: (mode) => {
          console.log('Mode changed to:', mode);
          setIsListening(mode?.mode === 'listening');
        }
      });

      const conversationId = conv.getId();
      console.log('Conversation started with ID:', conversationId);
      
      setConversation(conv);
      
      // Set initial volume
      if (conv.setVolume) {
        conv.setVolume({ volume: isMuted ? 0 : volume });
      }
      
    } catch (err) {
      console.error('Error starting ElevenLabs conversation:', err);
      setError(\`Failed to connect to voice service: ${err instanceof Error ? err.message : 'Unknown error'}`);
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

  const handleVolumeChange = (newVolume: number) => {
    setVolume(newVolume);
    if (conversation && conversation.setVolume) {
      conversation.setVolume({ volume: isMuted ? 0 : newVolume });
    }
  };

  const toggleMute = () => {
    const newMutedState = !isMuted;
    setIsMuted(newMutedState);
    if (conversation && conversation.setVolume) {
      conversation.setVolume({ volume: newMutedState ? 0 : volume });
    }
  };

  const formatConceptName = (slug: string): string => {
    return slug.charAt(0).toUpperCase() + slug.slice(1).replace(/-/g, ' ');
  };

  const getStatusColor = () => {
    if (error) return 'text-red-600';
    if (isConnected && isListening) return 'text-green-600';
    if (isConnected) return \`text-${primaryColor}-600`;
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
    if (isConnected) return \`bg-${primaryColor}-500`;
    if (connectionStatus === 'connecting') return 'bg-yellow-500 animate-pulse';
    return 'bg-gray-500';
  };

  const getButtonSize = () => {
    switch (buttonSize) {
      case 'small': return 'w-20 h-20';
      case 'medium': return 'w-24 h-24';
      case 'large': return 'w-32 h-32';
      default: return 'w-32 h-32';
    }
  };

  const getIconSize = () => {
    switch (buttonSize) {
      case 'small': return 'h-6 w-6';
      case 'medium': return 'h-7 w-7';
      case 'large': return 'h-8 w-8';
      default: return 'h-8 w-8';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-8">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          {/* Maya's Avatar */}
          <div className="flex-shrink-0">
            <img 
              src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//voice-ai-avatar.png"
              alt="Maya - AI Math Tutor"
              className="w-12 h-12 rounded-full object-cover border-2 border-purple-200"
              onError={(e) => {
                console.error('Failed to load Maya avatar');
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </div>
          <div>
            <h3 className="font-barriecito text-2xl text-gray-900 mb-1">Discuss with Maya</h3>
            <div className="flex items-center space-x-2">
              <img 
                src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//voice-ai-avatar.png"
                alt="Maya"
                className="w-4 h-4 rounded-full object-cover"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <p className="font-nunito text-gray-600">
                {conceptSlug ? \`Ready to discuss ${formatConceptName(conceptSlug)}` : 'Ready to start conversation'}
              </p>
            </div>
          </div>
        </div>
        <div className="flex items-center space-x-3">
          {showStatusIndicator && (
            <>
              <div className={\`w-3 h-3 rounded-full transition-colors ${getStatusIcon()}`}></div>
              <span className={\`font-nunito text-sm font-medium transition-colors ${getStatusColor()}`}>
                {getStatusText()}
              </span>
            </>
          )}
          {showVolumeControls && conversation && (
            <button
              onClick={() => setShowSettings(!showSettings)}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-50"
            >
              <Settings className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      {/* Volume Controls */}
      {showSettings && showVolumeControls && conversation && (
        <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
          <div className="flex items-center space-x-3">
            <button
              onClick={toggleMute}
              className="p-2 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
            >
              {isMuted ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={volume}
              onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
              className="flex-1 h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
              disabled={isMuted}
            />
            <span className="font-nunito text-sm text-gray-500 w-12 text-center">
              {Math.round(volume * 100)}%
            </span>
          </div>
        </div>
      )}
      
      {/* Voice controls */}
      <div className="text-center space-y-6">
        {/* Start conversation button - Using custom SVG */}
        {!conversation && (
          <button
            onClick={startTutor}
            disabled={isLoading}
            className={\`${getButtonSize()} relative transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-purple-300 ${
              isLoading
                ? 'cursor-not-allowed opacity-50'
                : 'hover:scale-105 active:scale-95'
            }`}
            aria-label={\`Start conversation with Maya about ${conceptSlug ? formatConceptName(conceptSlug) : 'mathematics'}`}
          >
            {isLoading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full">
                <Loader2 className="h-8 w-8 text-purple-600 animate-spin" />
              </div>
            ) : (
              <img 
                src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//voice-ai-button.svg"
                alt="Start conversation with Maya"
                className="w-full h-full object-contain hover:drop-shadow-lg transition-all duration-300"
                onError={(e) => {
                  console.error('Failed to load voice AI button');
                  // Fallback to a simple gradient button
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.className += ' bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center';
                    parent.innerHTML = '<svg class="h-8 w-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.84L16.5 10 6.3 17.16V2.84z" /></svg>';
                  }
                }}
              />
            )}
          </button>
        )}

        {/* Voice interaction controls */}
        {conversation && (
          <div className="flex items-center justify-center space-x-6">
            <div className={\`w-24 h-24 rounded-full flex items-center justify-center transition-all duration-300 ${
              isListening
                ? 'bg-green-500 animate-pulse shadow-lg'
                : isConnected
                ? `bg-${primaryColor}-500`
                : 'bg-gray-400'
            }`}>
              {isListening ? (
                <Mic className="h-8 w-8 text-white" />
              ) : isConnected ? (
                <MicOff className="h-8 w-8 text-white" />
              ) : (
                <Loader2 className="h-8 w-8 text-white animate-spin" />
              )}
            </div>
            
            <button
              onClick={endConversation}
              className="font-barriecito px-6 py-3 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
            >
              End Session
            </button>
          </div>
        )}
        
        <p className="font-nunito text-gray-600 max-w-md mx-auto leading-relaxed">
          {isLoading 
            ? 'Starting conversation with Maya...' 
            : !conversation
            ? 'Tap to start conversation'
            : connectionStatus === 'connecting'
            ? 'Connecting to Maya...'
            : isListening
            ? 'Maya is listening... Speak now!'
            : isConnected
            ? 'Connected - waiting for you to speak'
            : 'Reconnecting...'
          }
        </p>
      </div>
      
      {/* Status messages */}
      {conversationData && isConnected && !error && (
        <div className="mt-6 p-4 bg-green-50 rounded-lg text-center border border-green-200">
          <p className="font-nunito text-sm text-green-700 font-medium">✅ Maya is ready to chat!</p>
          <p className="font-nunito text-xs text-green-600 mt-1">
            Discussing {conversationData.concept ? formatConceptName(conversationData.concept) : 'mathematics'}
          </p>
        </div>
      )}
      
      {error && (
        <div className="mt-6 p-4 bg-red-50 rounded-lg text-center border border-red-200">
          <p className="font-nunito text-sm text-red-700 font-medium">❌ Error</p>
          <p className="font-nunito text-xs text-red-600 mt-2 break-words">{error}</p>
          <div className="mt-4 space-x-3">
            <button 
              onClick={() => setError(null)}
              className="font-barriecito text-sm text-red-600 hover:text-red-800 underline transition-colors"
            >
              Dismiss
            </button>
            <button 
              onClick={startTutor}
              className="font-barriecito text-sm text-red-600 hover:text-red-800 underline transition-colors"
            >
              Retry
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default VoiceAIAgent;