import React from 'react';
import { BookOpen } from 'lucide-react';
import ConceptCard from './ConceptCard';
import { mathConcepts } from '../../data/concepts';

const ConceptLibrary: React.FC = () => {
  return (
    <section id="concepts" className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-blue-100 rounded-xl">
              <BookOpen className="h-8 w-8 text-blue-600" />
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            real world math concepts
          </h2>
          
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            that are not boring and give you a{' '}
            <span className="font-bold text-blue-600">clear answer to</span>{' '}
            "when will i ever need it?"
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mathConcepts.map((concept) => (
            <ConceptCard key={concept.id} concept={concept} />
          ))}
        </div>
        
        <div className="text-center mt-12">
          <button className="bg-white text-gray-700 px-8 py-3 rounded-xl font-semibold border-2 border-gray-200 hover:border-gray-300 hover:shadow-lg transition-all duration-300 transform hover:scale-105">
            view all concepts
          </button>
        </div>
      </div>
    </section>
  );
};

export default ConceptLibrary;