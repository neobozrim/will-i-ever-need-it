import React, { useState, useRef, useEffect } from 'react';
import { Mic, Loader2, MicOff, Settings, Volume2, VolumeX, X } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { useAuth } from '../../contexts/AuthContext';
import AuthModal from '../Auth/AuthModal';

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
  const [isMinimized, setIsMinimized] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);

  const { user, loading: authLoading } = useAuth();

  // Auto-start functionality - only if authenticated
  useEffect(() => {
    if (autoStart && !conversation && !isLoading && user) {
      startTutor();
    }
  }, [autoStart, user]);

  // Use dynamic import for ElevenLabs SDK since it's browser-only
  const startTutor = async () => {
    // Check authentication first
    if (!user) {
      setError('Please sign in to use the voice tutor');
      return;
    }

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
      const functionError = !response.ok ? new Error(response.status + ': ' + (data.error || 'Unknown error')) : null;

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
      const prompt = customPrompt || `You are Maya, the confident math genius from Bored? Opposite! - a site that aims to make math approachable for students by showing how it applies in real life using fun examples.  You've built a slime empire, a successful lemonade delivery by drone business, an ice-cream shop, crushed video game rivals, and become legendary using math.
      
      You're helping with ${data.concept}. Keep your responses:
      - SHORT and punchy (like your comic style)
      - SPECIFIC - when asked a general question, make sure to clarify the intent in order to be on point
      - CONFIDENT - you're the expert who beats Jimmy at everything using MATH
      - NO customer service language - no "Is there anything else I can help you with?" every response. Instead keep things conversational, as if you are talking to fellow school kid.
      
      Your knowledge base contains theory (including practice problems) and comic examples showing how ${data.concept} applies to real life . Use ALL of it and choose the most relevant parts to refer to, based on the conversation needs. Connect formulas to real examples when it makes sense.
      
      When users ask broad questions (like "area formula"),  don't assume - check if multiple specific concepts or formulas are discussed in the text and if more than one, clarify the student's exact need, if the question was too broad. 
      
      If you are asked about something that isn't in the knowledge base, politely explain that you are prepared to only talk about the content in the Bored? Opposite site!  
      
      Keep the energy from the comics - you are fun, sometimes cheeky, high energy math empire builder, not a helpdesk.';
      
      const conversationOverride = {
        agent: {
          prompt: {
            prompt: prompt
          },
          firstMessage: `Hey! Ready to master ${data.concept.replace(/-/g, ' ')}? Where do you want to start?`,
          language: "en" as const
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
          setError('Voice connection error: ' + (error.message || error));
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
      setError('Failed to connect to voice service: ' + (err instanceof Error ? err.message : 'Unknown error'));
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
    if (isConnected) return `text-${primaryColor}-600`;
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
    if (isConnected) return `bg-${primaryColor}-500`;
    if (connectionStatus === 'connecting') return 'bg-yellow-500 animate-pulse';
    return 'bg-gray-500';
  };

  // Handle sign in button click
  const handleSignInClick = () => {
    setShowAuthModal(true);
  };

  // FIXED: Unified minimized view for ALL users - shows Maya's avatar
  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => setIsMinimized(false)}
          className="w-16 h-16 rounded-full bg-white shadow-lg border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50 overflow-hidden"
        >
          <img 
            src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//voice-ai-avatar.png"
            alt="Maya - Click to expand"
            className="w-full h-full object-cover"
            onError={(e) => {
              console.error('Failed to load Maya avatar');
              // Fallback to gradient background with initials
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const parent = target.parentElement;
              if (parent) {
                parent.className = 'w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-barriecito text-xl shadow-lg border-2 border-purple-200 hover:border-purple-300 transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4 focus:ring-purple-300/50';
                parent.innerHTML = 'M';
              }
            }}
          />
          {/* Status indicator - only show for authenticated users */}
          {showStatusIndicator && user && (
            <div className={`absolute -top-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${getStatusIcon()}`}></div>
          )}
        </button>
      </div>
    );
  }

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50 w-80 h-80 transition-all duration-300">
        <div className="relative w-full h-full bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
          {/* Header - ALWAYS VISIBLE with X button */}
          <div className="relative flex items-center justify-between p-4 border-b border-gray-100 bg-gradient-to-r from-purple-50 to-pink-50 z-50">
            <div className="flex items-center space-x-3">
              {/* Maya's Avatar */}
              <div className="flex-shrink-0">
                <img 
                  src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//voice-ai-avatar.png"
                  alt="Maya - AI Math Tutor"
                  className="w-10 h-10 rounded-full object-cover border-2 border-purple-200"
                  onError={(e) => {
                    console.error('Failed to load Maya avatar');
                    // Fallback to gradient background with initials
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                    const parent = target.parentElement;
                    if (parent) {
                      parent.className = 'w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 flex items-center justify-center text-white font-barriecito text-sm border-2 border-purple-200 flex-shrink-0';
                      parent.innerHTML = 'M';
                    }
                  }}
                />
              </div>
              <div>
                {/* RESTORED: "Chat with Maya" heading for ALL users */}
                <h3 className="font-barriecito text-lg text-gray-900">Chat with Maya</h3>
                {/* Status indicator - only show for authenticated users */}
                {showStatusIndicator && user && (
                  <div className="flex items-center space-x-2">
                    <div className={`w-2 h-2 rounded-full transition-colors ${getStatusIcon()}`}></div>
                    <span className={`font-nunito text-xs font-medium transition-colors ${getStatusColor()}`}>
                      {getStatusText()}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            {/* Control buttons - ALWAYS VISIBLE */}
            <div className="flex items-center space-x-1">
              {/* Settings button - only for authenticated users with active conversation */}
              {showVolumeControls && conversation && user && (
                <button
                  onClick={() => setShowSettings(!showSettings)}
                  className="p-1.5 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
                >
                  <Settings className="h-4 w-4" />
                </button>
              )}
              
              {/* FIXED: BLACK X button - ALWAYS VISIBLE for ALL users */}
              <button
                onClick={() => setIsMinimized(true)}
                className="p-1.5 text-black hover:text-gray-800 hover:bg-gray-100 transition-colors rounded-lg"
                title="Minimize chat"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          {/* Authentication Overlay - positioned BELOW header for unauthenticated users */}
          {!authLoading && !user && (
            <div className="absolute inset-0 top-16 bg-white/95 backdrop-blur-sm flex items-center justify-center z-40 rounded-b-2xl">
              <div className="text-center p-6 max-w-sm">
                {/* Maya's Avatar */}
                <div className="flex justify-center mb-4">
                  <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg">
                    <img 
                      src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//voice-ai-avatar.png"
                      alt="Maya - AI Math Tutor"
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        console.error('Failed to load Maya avatar');
                        // Fallback to gradient background with initials
                        const target = e.target as HTMLImageElement;
                        target.style.display = 'none';
                        const parent = target.parentElement;
                        if (parent) {
                          parent.className = 'w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-barriecito text-xl shadow-lg';
                          parent.innerHTML = 'M';
                        }
                      }}
                    />
                  </div>
                </div>

                {/* Description */}
                <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
                  Sign in to start chatting with your AI math tutor Maya!
                </p>

                {/* Single Sign In Link - opens the shared modal */}
                <button
                  onClick={handleSignInClick}
                  className="font-barriecito text-blue-600 hover:text-blue-700 underline text-lg transition-colors"
                >
                  Sign in
                </button>
              </div>
            </div>
          )}

          {/* Volume Controls - Only show if authenticated */}
          {showSettings && showVolumeControls && conversation && user && (
            <div className="p-3 bg-gray-50 border-b border-gray-100">
              <div className="flex items-center space-x-2">
                <button
                  onClick={toggleMute}
                  className="p-1.5 text-gray-600 hover:text-gray-800 transition-colors rounded-lg hover:bg-gray-100"
                >
                  {isMuted ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}
                </button>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.1"
                  value={volume}
                  onChange={(e) => handleVolumeChange(parseFloat(e.target.value))}
                  className="flex-1 h-1.5 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  disabled={isMuted}
                />
                <span className="font-nunito text-xs text-gray-500 w-8 text-center">
                  {Math.round(volume * 100)}%
                </span>
              </div>
            </div>
          )}
          
          {/* Main content area - Only show if authenticated */}
          {user && (
            <div className="flex-1 flex flex-col items-center justify-center p-6 space-y-4">
              {/* Start conversation button - Using custom SVG */}
              {!conversation && (
                <button
                  onClick={startTutor}
                  disabled={isLoading}
                  className={`w-24 h-24 relative transition-all duration-300 transform focus:outline-none focus:ring-4 focus:ring-purple-300 ${
                    isLoading
                      ? 'cursor-not-allowed opacity-50'
                      : 'hover:scale-105 active:scale-95'
                  }`}
                  aria-label={`Start conversation with Maya about ${conceptSlug ? formatConceptName(conceptSlug) : 'mathematics'}`}
                >
                  {isLoading ? (
                    <div className="absolute inset-0 flex items-center justify-center bg-white rounded-full">
                      <Loader2 className="h-6 w-6 text-purple-600 animate-spin" />
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
                          parent.innerHTML = '<svg class="h-6 w-6 text-white ml-0.5" fill="currentColor" viewBox="0 0 20 20"><path d="M6.3 2.84L16.5 10 6.3 17.16V2.84z" /></svg>';
                        }
                      }}
                    />
                  )}
                </button>
              )}

              {/* Voice interaction controls */}
              {conversation && (
                <div className="flex flex-col items-center space-y-4">
                  <div className={`w-20 h-20 rounded-full flex items-center justify-center transition-all duration-300 ${
                    isListening
                      ? 'bg-green-500 animate-pulse shadow-lg'
                      : isConnected
                      ? `bg-${primaryColor}-500`
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
                    className="font-barriecito px-4 py-2 text-sm text-gray-600 hover:text-gray-800 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-gray-300"
                  >
                    End Session
                  </button>
                </div>
              )}
              
              <p className="font-nunito text-sm text-gray-600 text-center leading-relaxed">
                {isLoading 
                  ? 'Starting conversation...' 
                  : !conversation
                  ? 'Tap to start conversation'
                  : connectionStatus === 'connecting'
                  ? 'Connecting to Maya...'
                  : isListening
                  ? 'Maya is listening!'
                  : isConnected
                  ? 'Ready to chat'
                  : 'Reconnecting...'
                }
              </p>
            </div>
          )}
          
          {/* Status messages - Only show if authenticated */}
          {user && conversationData && isConnected && !error && (
            <div className="p-3 bg-green-50 border-t border-green-200">
              <p className="font-nunito text-xs text-green-700 font-medium text-center">✅ Maya is ready to chat!</p>
            </div>
          )}
          
          {user && error && (
            <div className="p-3 bg-red-50 border-t border-red-200">
              <p className="font-nunito text-xs text-red-700 font-medium text-center">❌ Error</p>
              <p className="font-nunito text-xs text-red-600 mt-1 text-center break-words">{error}</p>
              <div className="mt-2 flex justify-center space-x-2">
                <button 
                  onClick={() => setError(null)}
                  className="font-barriecito text-xs text-red-600 hover:text-red-800 underline transition-colors"
                >
                  Dismiss
                </button>
                <button 
                  onClick={startTutor}
                  className="font-barriecito text-xs text-red-600 hover:text-red-800 underline transition-colors"
                >
                  Retry
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Shared Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
};

export default VoiceAIAgent;