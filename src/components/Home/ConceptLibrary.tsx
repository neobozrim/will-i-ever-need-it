import React, { useState } from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import ConceptCard from './ConceptCard';
import ConceptOverlay from './ConceptOverlay';
import { useMathConcepts } from '../../hooks/useMathConcepts';
import { MathConcept } from '../../types';

const ConceptLibrary: React.FC = () => {
  const { concepts, loading, error } = useMathConcepts();
  const [displayCount, setDisplayCount] = useState(15);
  const [selectedConcept, setSelectedConcept] = useState<MathConcept | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleLoadMore = () => {
    setDisplayCount(prev => prev + 15);
  };

  const handleOpenOverlay = (concept: MathConcept) => {
    setSelectedConcept(concept);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedConcept(null);
  };

  if (loading) {
    return (
      <section id="concepts" className="py-20 bg-gray-50">
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
      <section id="concepts" className="py-20 bg-gray-50">
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
      <section id="concepts" className="py-20 bg-gray-50">
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
    <>
      <section id="concepts" className="py-20 bg-gray-50">
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
                onOpenOverlay={handleOpenOverlay}
              />
            ))}
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

      {/* Concept Overlay */}
      <ConceptOverlay
        concept={selectedConcept}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </>
  );
};

export default ConceptLibrary;