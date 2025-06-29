import React from 'react';
import { AlertCircle, Loader2 } from 'lucide-react';
import ConceptCard from './ConceptCard';
import { useMathConcepts } from '../../hooks/useMathConcepts';
import { MathConcept } from '../../types';

interface FeaturedConceptsProps {
  onOpenOverlay: (concept: MathConcept) => void;
}

const FeaturedConcepts: React.FC<FeaturedConceptsProps> = ({ onOpenOverlay }) => {
  const { concepts, loading, error } = useMathConcepts();

  // Filter for AREA and PYTHAGOREAN concepts
  const featuredConcepts = concepts.filter(concept => 
    concept.title.toLowerCase().includes('area') || 
    concept.title.toLowerCase().includes('pythagorean') ||
    concept.slug.includes('area') ||
    concept.slug.includes('pythagorean')
  ).slice(0, 2); // Take only first 2 matches

  if (loading) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured Math Concepts
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Master these essential concepts and see how they power everything from architecture to video games
            </p>
          </div>
          
          <div className="flex justify-center items-center py-12">
            <div className="flex items-center space-x-3 text-gray-600">
              <Loader2 className="h-6 w-6 animate-spin" />
              <span className="text-lg">Loading featured concepts...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  if (error || featuredConcepts.length === 0) {
    return (
      <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Featured concepts coming soon
            </h2>
            
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We're working on highlighting the best math concepts for you.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Math Concepts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master these essential concepts and see how they power everything from architecture to video games
          </p>
        </div>

        {/* Featured cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {featuredConcepts.map((concept) => (
            <ConceptCard 
              key={concept.id} 
              concept={concept} 
              onOpenOverlay={onOpenOverlay}
            />
          ))}
        </div>

        {/* Bottom transition text */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <span className="text-lg font-medium">Ready to dive deeper?</span>
          </div>
          <p className="text-gray-500 mt-2">Explore our full library of interactive math concepts below</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedConcepts;