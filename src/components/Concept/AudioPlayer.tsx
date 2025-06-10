import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, SkipBack, SkipForward, Volume2 } from 'lucide-react';

interface AudioPlayerProps {
  audioUrl?: string | null;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({ audioUrl }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressInterval = useRef<number>();

  // Update progress bar
  useEffect(() => {
    if (isPlaying) {
      progressInterval.current = window.setInterval(() => {
        if (audioRef.current) {
          setCurrentTime(audioRef.current.currentTime);
        }
      }, 1000);
    } else {
      clearInterval(progressInterval.current);
    }

    return () => {
      clearInterval(progressInterval.current);
    };
  }, [isPlaying]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = (currentTime / duration) * 100;

  // Toggle play/pause
  const togglePlayPause = () => {
    if (!audioRef.current) return;
    
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(error => {
        console.error('Error playing audio:', error);
      });
    }
    setIsPlaying(!isPlaying);
  };

  // Handle time update
  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setCurrentTime(audioRef.current.currentTime);
    }
  };

  // Handle seeking
  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current) return;
    
    const rect = e.currentTarget.getBoundingClientRect();
    const pos = (e.clientX - rect.left) / rect.width;
    const newTime = pos * duration;
    
    audioRef.current.currentTime = newTime;
    setCurrentTime(newTime);
  };

  // Show placeholder if no audio URL is provided
  if (!audioUrl) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Audio Explanation</h3>
          <div className="flex items-center space-x-1 text-sm text-gray-400">
            <Volume2 className="h-4 w-4" />
            <span>Coming Soon</span>
          </div>
        </div>
        
        {/* Placeholder waveform */}
        <div className="bg-gray-50 rounded-lg p-4 mb-4">
          <div className="flex items-center justify-center h-16 space-x-1">
            {Array.from({ length: 40 }).map((_, i) => (
              <div
                key={i}
                className="w-1 bg-gray-300 rounded-full opacity-30"
                style={{
                  height: `${Math.random() * 40 + 10}px`,
                }}
              />
            ))}
          </div>
        </div>
        
        <div className="text-center text-gray-500">
          <p className="text-sm">Audio explanation will be available soon!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-gray-900">Audio Explanation</h3>
        <div className="flex items-center space-x-1 text-sm text-gray-500">
          <Volume2 className="h-4 w-4" />
          <span>High Quality</span>
        </div>
      </div>
      
      {/* Waveform visualization placeholder */}
      <div className="bg-gray-50 rounded-lg p-4 mb-4">
        <div className="flex items-center justify-center h-16 space-x-1">
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              className={`w-1 bg-gradient-to-t from-blue-500 to-purple-500 rounded-full transition-all duration-200 ${
                i < (progressPercentage / 100) * 40 ? 'opacity-100' : 'opacity-30'
              }`}
              style={{
                height: `${Math.random() * 40 + 10}px`,
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mb-4">
        <div className="flex justify-between text-sm text-gray-500 mb-2">
          <span>{formatTime(currentTime)}</span>
          <span>{formatTime(duration)}</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div
            className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full transition-all duration-300"
            style={{ width: `${progressPercentage}%` }}
          />
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-center space-x-4">
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <SkipBack className="h-5 w-5" />
        </button>
        
        <button
          onClick={togglePlayPause}
          className="p-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-full hover:shadow-lg transition-all duration-200 transform hover:scale-105"
        >
          {isPlaying ? (
            <Pause className="h-6 w-6" />
          ) : (
            <Play className="h-6 w-6 ml-0.5" />
          )}
        </button>
        
        <button className="p-2 text-gray-600 hover:text-gray-900 transition-colors duration-200">
          <SkipForward className="h-5 w-5" />
        </button>
      </div>
      
      {/* Audio element */}
      <audio
        ref={audioRef}
        src={audioUrl}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => setIsPlaying(false)}
        onTimeUpdate={handleTimeUpdate}
        onLoadedMetadata={(e) => {
          const audio = e.currentTarget;
          setDuration(audio.duration);
        }}
        className="hidden"
      />
    </div>
  );
};

export default AudioPlayer;