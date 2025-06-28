export interface MathConcept {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  hero_image_url: string | null;
  audio_recording_url: string | null;
  blog_post_content: string | null;
  created_at?: string;
  updated_at?: string;
}

export interface AudioPlayer {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
}

// Database types
export interface DatabaseMathConcept {
  id: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  hero_image_url: string | null;
  audio_recording_url: string | null;
  blog_post_content: string | null;
  slug: string;
  created_at: string;
  updated_at: string;
}

// ElevenLabs types
export interface ElevenLabsConversation {
  id: string;
  agent_id: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export interface ElevenLabsError {
  error: string;
  details?: string;
  message?: string;
}

// Supabase Edge Function types
export interface EdgeFunctionResponse<T = any> {
  data: T | null;
  error: {
    message: string;
    [key: string]: any;
  } | null;
}

// Voice AI Component states
export type VoiceAIStatus = 'ready' | 'loading' | 'active' | 'recording' | 'error';