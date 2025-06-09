export interface MathConcept {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail_url: string | null;
  hero_image_url: string | null;
  audio_recording_url: string | null;
  blog_post_content: string | null;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
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