import React, { useState } from 'react';

const VideoBlock: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = 'JBhtxkn9dRQ';
  const thumbnailUrl = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
  
  const iframeSrc = `https://www.youtube-nocookie.com/embed/${videoId}?` +
    `autoplay=1` +
    `&controls=1` +
    `&rel=0` +
    `&showinfo=0` +
    `&modestbranding=1`;

  const handlePlayClick = () => {
    setShowVideo(true);
  };

  const handleCloseModal = () => {
    setShowVideo(false);
  };

  return (
    <section className="py-20 dotted-background-light" data-video-section>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="font-barriecito text-3xl md:text-4xl text-gray-900 mb-4">
            See Math In Action, Then Master It
          </h2>
        </div>
        
        <div className="relative max-w-2xl mx-auto">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
            {/* FIXED: Added data-video-thumbnail attribute for auto-play targeting */}
            <div 
              className="relative aspect-video cursor-pointer group" 
              onClick={handlePlayClick}
              data-video-thumbnail
            >
              <img 
                src={thumbnailUrl} 
                alt="Math in Action - Click to play"
                className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-75"
                onError={(e) => {
                  // Fallback to a different thumbnail size if maxresdefault fails
                  const target = e.target as HTMLImageElement;
                  target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              {/* Play button positioned lower and with transparency */}
              <div className="absolute inset-0 flex items-end justify-center pb-16">
                <div className="w-16 h-16 bg-red-600/80 backdrop-blur-sm rounded-full flex items-center justify-center transform transition-all duration-300 group-hover:scale-110 group-hover:bg-red-600/90 shadow-lg">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.84L16.5 10 6.3 17.16V2.84z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="font-nunito text-white text-sm font-medium">math in action</span>
              </div>
              <div className="font-nunito text-gray-400 text-xs">click to watch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal - Larger size */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-80" onClick={handleCloseModal}>
          <div className="relative w-full max-w-6xl bg-black rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10 bg-black bg-opacity-50 rounded-full p-2 transition-colors"
              aria-label="Close video"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                src={iframeSrc}
                title="Math in Action - Real World Applications"
                className="absolute inset-0 w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default VideoBlock;