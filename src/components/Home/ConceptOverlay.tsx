import React, { useState, useEffect } from 'react';
import { X, ArrowLeft } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { MathConcept } from '../../types';
import VoiceAIAgent from '../Concept/VoiceAIAgent';
import BlogContent from '../Concept/BlogContent';

interface ConceptOverlayProps {
  concept: MathConcept | null;
  isOpen: boolean;
  onClose: () => void;
}

const ConceptOverlay: React.FC<ConceptOverlayProps> = ({ concept, isOpen, onClose }) => {
  const [heroImageError, setHeroImageError] = useState(false);
  const defaultHeroImage = 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=800';

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleImageError = () => {
    setHeroImageError(true);
  };

  if (!concept) return null;

  const heroImageUrl = !heroImageError ? (concept?.hero_image_url || concept?.thumbnail_url || defaultHeroImage) : defaultHeroImage;
  const blogContent = concept?.blog_post_content || `# ${concept?.title || 'Concept'}\n\n${concept?.description || 'No description available'}`;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl max-h-[90vh] bg-white rounded-2xl shadow-2xl overflow-hidden"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-20 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors duration-200 backdrop-blur-sm"
              aria-label="Close overlay"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Back button */}
            <button
              onClick={onClose}
              className="font-barriecito absolute top-4 left-4 z-20 flex items-center space-x-2 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full transition-colors duration-200 backdrop-blur-sm"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="text-sm pr-2">Back</span>
            </button>

            {/* Scrollable content */}
            <div className="overflow-y-auto max-h-[90vh]">
              <div className="grid grid-cols-1 lg:grid-cols-2 min-h-[80vh]">
                {/* Left side - Hero image (9:16 aspect ratio) */}
                <div className="relative bg-gradient-to-br from-blue-100 to-purple-100 flex items-center justify-center p-8">
                  <div className="w-full max-w-md aspect-[9/16] rounded-xl overflow-hidden shadow-lg">
                    <img 
                      src={heroImageUrl} 
                      alt={concept.title}
                      className="w-full h-full object-cover"
                      onError={handleImageError}
                    />
                  </div>
                </div>

                {/* Right side - Content */}
                <div className="p-8 flex flex-col space-y-8">
                  {/* Header */}
                  <div>
                    <h1 className="font-barriecito text-3xl md:text-4xl text-gray-900 mb-4">
                      {concept.title}
                    </h1>
                    <p className="font-nunito text-lg text-gray-600 leading-relaxed">
                      {concept.description}
                    </p>
                  </div>

                  {/* Voice AI Agent */}
                  <div className="flex-shrink-0">
                    <VoiceAIAgent />
                  </div>

                  {/* Blog content */}
                  <div className="flex-1">
                    <BlogContent content={blogContent} />
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default ConceptOverlay;