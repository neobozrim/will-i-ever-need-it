import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import ConceptCard from './ConceptCard';
import { useMathConcepts } from '../../hooks/useMathConcepts';

const ConceptLibrary: React.FC = () => {
  const { concepts, loading, error } = useMathConcepts();
  const [displayCount, setDisplayCount] = useState(15);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 15);
  };

  if (loading) {
    return (
      <section id="concepts" className="py-20 dotted-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-barriecito text-3xl md:text-4xl text-gray-900 mb-4">
              Discover More Math Superpowers
            </h2>
          </div>
          
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3 text-gray-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="font-nunito text-lg">Loading concepts...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="concepts" className="py-20 dotted-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            
            <h2 className="font-barriecito text-3xl md:text-4xl text-gray-900 mb-4">
              Oops! Something went wrong
            </h2>
            
            <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto mb-6">
              We couldn't load the math concepts right now. Please try again later.
            </p>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 max-w-md mx-auto">
              <p className="font-nunito text-red-700 text-sm">{error}</p>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (concepts.length === 0) {
    return (
      <section id="concepts" className="py-20 dotted-background-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-barriecito text-3xl md:text-4xl text-gray-900 mb-4">
              Discover More Math Superpowers
            </h2>
            
            <p className="font-nunito text-xl text-gray-600 max-w-3xl mx-auto">
              No concepts available yet. Check back soon!
            </p>
          </div>
        </div>
      </section>
    );
  }

  const displayedConcepts = concepts.slice(0, displayCount);
  const hasMoreConcepts = concepts.length > displayCount;

  return (
    <section id="concepts" className="py-20 dotted-background-light">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="font-barriecito text-3xl md:text-4xl text-gray-900 mb-4">
            Discover More Math Superpowers
          </h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displayedConcepts.map((concept) => (
            <ConceptCard 
              key={concept.id} 
              concept={concept} 
            />
          ))}
          
          {/* Feedback Card - Always visible at the end with updated gradient */}
          <div className="group block h-full">
            <div className="relative h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-2xl hover:border-transparent transition-all duration-500 transform hover:-translate-y-2">
              {/* Card Content */}
              <div className="relative z-10 h-full flex flex-col bg-white rounded-xl">
                {/* Thumbnail */}
                <div className="aspect-square bg-gradient-to-br from-purple-50 to-blue-50 relative overflow-hidden rounded-t-xl">
                  <img 
                    src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//feedback.png"
                    alt="Suggest a topic or leave feedback"
                    className="w-full h-full object-cover transition-all duration-500 group-hover:scale-110"
                    loading="lazy"
                    onError={(e) => {
                      // Fallback to icon if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                      const parent = target.parentElement;
                      if (parent) {
                        parent.innerHTML = `
                          <div class="w-full h-full bg-gradient-to-br from-purple-100 to-blue-100 flex items-center justify-center">
                            <div class="w-24 h-24 bg-gradient-to-br from-purple-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg">
                              <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                              </svg>
                            </div>
                          </div>
                        `;
                      }
                    }}
                  />
                  
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                </div>
                
                {/* Content */}
                <div className="p-6 flex-1 bg-white rounded-b-xl">
                  <h3 className="font-barriecito text-xl text-gray-900 mb-2 group-hover:text-purple-600 transition-colors duration-300 uppercase">
                    SUGGEST A TOPIC OR LEAVE FEEDBACK
                  </h3>
                  
                  <p className="font-nunito text-gray-600 mb-4 line-clamp-3 leading-relaxed">
                    Help us make math even more awesome! Share your ideas for new topics or let us know how we're doing.
                  </p>
                  
                  {/* CTA Button - Updated with new beautiful gradient */}
                  <a
                    href="https://yavor3.typeform.com/to/wrZL0wBL"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="font-barriecito inline-flex items-center justify-center w-full text-black py-3 px-4 rounded-xl text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105 border border-gray-200 bg-gradient-to-r from-[#97ECF1] to-[#FEC868] hover:from-[#7DD3DA] hover:to-[#FDB94E]"
                  >
                    SUGGEST NOW
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {hasMoreConcepts && (
          <div className="text-center mt-12">
            <button 
              onClick={handleLoadMore}
              className="font-barriecito bg-white text-gray-700 px-8 py-3 rounded-xl border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              load more
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ConceptLibrary;