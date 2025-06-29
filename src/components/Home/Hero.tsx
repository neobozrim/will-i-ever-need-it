import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-white py-20 lg:py-32">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-left">
            <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-8 leading-tight">
              Bored? Opposite!
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed">
              Use that "boring" math to build epic stuff, crush rivals, and become a legend, while the rest remain bored and... clueless!
            </p>
            
            <div className="flex justify-start">
              <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
                <span>WATCH THIS</span>
              </button>
            </div>
          </div>

          {/* Right side - Animated monster */}
          <div className="flex justify-center lg:justify-end">
            <div className="relative">
              <div className="w-80 h-96 lg:w-96 lg:h-[500px] rounded-3xl overflow-hidden shadow-2xl transform hover:scale-105 transition-transform duration-300 animate-jiggle">
                <img 
                  src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//monster.png" 
                  alt="Friendly monster character"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    console.error('Failed to load monster image');
                    // Fallback to a placeholder if image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=400';
                  }}
                />
              </div>
              
              {/* Decorative elements */}
              <div className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-1000"></div>
              <div className="absolute -bottom-6 -left-6 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-500"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;