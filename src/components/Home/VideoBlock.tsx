import React from 'react';

const VideoBlock: React.FC = () => {
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
            {/* YouTube Video Embed */}
            <div className="aspect-video">
              <iframe
                src="https://www.youtube.com/embed/h3pJZSTQqIg"
                title="Jody's Treehouse Adventure - Math in Real Life"
                className="w-full h-full"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
              />
            </div>
            
            {/* Video info bar */}
            <div className="bg-gray-800 px-6 py-4 flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                <span className="text-white text-sm font-medium">jody's treehouse adventure</span>
              </div>
              <div className="text-gray-400 text-sm">watch & learn</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoBlock;