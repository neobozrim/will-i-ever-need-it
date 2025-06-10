import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, MessageCircle, BarChart3, Image as ImageIcon } from 'lucide-react';
import { MathConcept } from '../../types';

interface ConceptCardProps {
  concept: MathConcept;
}

const ConceptCard: React.FC<ConceptCardProps> = ({ concept }) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'beginner':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'intermediate':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'advanced':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Fallback image if thumbnail is not available
  const defaultThumbnail = 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=400';
  const thumbnailUrl = concept.thumbnail_url || defaultThumbnail;

  const handleImageError = () => {
    console.error(`Failed to load image: ${thumbnailUrl}`);
    setImageError(true);
  };

  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  return (
    <Link to={`/concepts/${concept.slug}`} className="group block h-full">
      <div className="h-full flex flex-col bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-xl hover:border-gray-300 transition-all duration-300 transform hover:-translate-y-1">
        {/* Thumbnail */}
        <div className="aspect-square bg-gradient-to-br from-blue-50 to-purple-50 relative overflow-hidden">
          {!imageError ? (
            <img 
              src={thumbnailUrl}
              alt={concept.title}
              className={`w-full h-full object-cover transition-all duration-300 ${
                imageLoaded ? 'opacity-100' : 'opacity-0'
              } group-hover:scale-105`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full bg-gray-100 flex items-center justify-center">
              <ImageIcon className="w-12 h-12 text-gray-400" />
            </div>
          )}
          
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          
          {/* Category badge */}
          {concept.category && (
            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-medium text-gray-700">
              {concept.category}
            </div>
          )}
          
          {/* Difficulty badge */}
          <div className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border ${
            getDifficultyColor(concept.difficulty)
          }`}>
            {concept.difficulty}
          </div>
        </div>
        
        {/* Content */}
        <div className="p-6 flex-1">
          <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors duration-200">
            {concept.title}
          </h3>
          
          <p className="text-gray-600 mb-4 line-clamp-3 leading-relaxed">
            {concept.description}
          </p>
          
          {/* Meta info */}
          <div className="flex items-center justify-between text-sm text-gray-500 mb-4">
            <div className="flex items-center space-x-1">
              <MessageCircle className="h-4 w-4" />
              <span>talk to a robot</span>
            </div>
            <div className="flex items-center space-x-1">
              <BarChart3 className="h-4 w-4" />
              <span>interactive</span>
            </div>
          </div>
          
          {/* CTA */}
          <div className="flex items-center justify-between">
            <span className="text-blue-600 font-medium group-hover:text-blue-700 transition-colors duration-200">
              learn more
            </span>
            <ArrowRight className="h-4 w-4 text-blue-600 group-hover:translate-x-1 transition-transform duration-200" />
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ConceptCard;