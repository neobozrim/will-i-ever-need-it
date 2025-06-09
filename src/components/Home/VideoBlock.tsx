import React, { useState } from 'react';
import { Play, Pause } from 'lucide-react';

const VideoBlock: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            yes, you will need math and will be loving it!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            meet jody on her mission...
          </p>
        </div>
        
        <div className="relative">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            {/* Video placeholder */}
            <div className="aspect-video bg-gradient-to-br from-blue-900 via-purple-900 to-gray-900 flex items-center justify-center relative">
              <div className="absolute inset-0 bg-black/20"></div>
              
              {/* Play button */}
              <button 
                onClick={() => setIsPlaying(!isPlaying)}
                className="relative z-10 group bg-white/20 backdrop-blur-sm hover:bg-white/30 rounded-full p-6 transition-all duration-300 transform hover:scale-110"
              >
                {isPlaying ? (
                  <Pause className="h-12 w-12 text-white" />
                ) : (
                  <Play className="h-12 w-12 text-white ml-1" />
                )}
              </button>
              
              {/* Decorative elements */}
              <div className="absolute top-8 left-8 w-16 h-16 border-2 border-white/30 rounded-lg"></div>
              <div className="absolute bottom-8 right-8 w-12 h-12 border-2 border-white/30 rounded-full"></div>
              <div className="absolute top-1/2 right-12 w-8 h-8 bg-white/20 rounded-full"></div>
            </div>
            
            {/* Video controls placeholder */}
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-white text-sm font-medium">jody's treehouse adventure</span>
              </div>
              <div className="text-gray-400 text-sm">5:42</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBlock;