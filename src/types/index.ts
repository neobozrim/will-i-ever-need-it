export interface MathConcept {
  id: string;
  slug: string;
  title: string;
  description: string;
  thumbnail: string;
  content: string;
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  category: string;
}

export interface AudioPlayer {
  isPlaying: boolean;
  duration: number;
  currentTime: number;
}