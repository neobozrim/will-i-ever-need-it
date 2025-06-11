import React, { useState } from 'react';

const VideoBlock: React.FC = () => {
  const [showVideo, setShowVideo] = useState(false);
  const videoId = 'h3pJZSTQqIg';
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
    <section className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            yes, you will need math and will be loving it!
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            meet jody on her mission to build the ultimate treehouse...
          </p>
        </div>
        
        <div className="relative">
          <div className="relative bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl overflow-hidden shadow-2xl">
            <div className="relative aspect-video cursor-pointer group" onClick={handlePlayClick}>
              <img 
                src={thumbnailUrl} 
                alt="Jody's Treehouse Adventure - Click to play"
                className="absolute inset-0 w-full h-full object-cover transition-opacity group-hover:opacity-75"
                onError={(e) => {
                  // Fallback to a different thumbnail size if maxresdefault fails
                  const target = e.target as HTMLImageElement;
                  target.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
                }}
              />
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-20 h-20 bg-red-600 rounded-full flex items-center justify-center transform transition-transform group-hover:scale-110">
                  <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M6.3 2.84L16.5 10 6.3 17.16V2.84z" />
                  </svg>
                </div>
              </div>
            </div>
            
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-white text-sm font-medium">jody's treehouse adventure</span>
              </div>
              <div className="text-gray-400 text-sm">click to watch</div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Modal */}
      {showVideo && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-75" onClick={handleCloseModal}>
          <div className="relative w-full max-w-4xl bg-black rounded-lg overflow-hidden" onClick={e => e.stopPropagation()}>
            <button 
              onClick={handleCloseModal}
              className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
              aria-label="Close video"
            >
              <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
            <div className="relative pt-[56.25%]">
              <iframe
                src={iframeSrc}
                title="Jody's Treehouse Adventure - Math in Real Life"
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