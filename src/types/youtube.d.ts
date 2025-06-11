// Type definitions for YouTube Iframe API
declare namespace YT {
  interface Player {
    new(elementId: string | HTMLElement, config: PlayerConfig): Player;
    destroy(): void;
    // Add other player methods as needed
  }

  interface PlayerConfig {
    height?: string | number;
    width?: string | number;
    videoId: string;
    playerVars?: PlayerVars;
    events?: PlayerEvents;
  }

  interface PlayerVars {
    autoplay?: 0 | 1;
    controls?: 0 | 1 | 2;
    rel?: 0 | 1;
    showinfo?: 0 | 1;
    modestbranding?: 0 | 1;
    playsinline?: 0 | 1;
    origin?: string;
    // Add other player vars as needed
  }

  interface PlayerEvents {
    onReady?: (event: any) => void;
    onError?: (event: any) => void;
    // Add other event handlers as needed
  }
}

declare global {
  interface Window {
    YT: {
      Player: YT.Player;
      PlayerState: {
        ENDED: number;
        PLAYING: number;
        PAUSED: number;
        // Add other states as needed
      };
    };
    onYouTubeIframeAPIReady: () => void;
  }
}
