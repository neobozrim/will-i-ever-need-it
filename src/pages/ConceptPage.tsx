import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMathConcept } from '../hooks/useMathConcepts';
import VoiceAIAgent from '../components/Concept/VoiceAIAgent';
import BlogContent from '../components/Concept/BlogContent';

const ConceptPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { concept, loading, error } = useMathConcept(slug || '');
  const [heroImageError, setHeroImageError] = useState(false);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const defaultHeroImage = 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=800';

  // Force scroll to top when component mounts or slug changes
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [slug]);

  // Handle image error
  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    setHeroImageError(true);
    const target = e.target as HTMLImageElement;
    target.src = defaultHeroImage;
  };

  // Handle image overlay
  const handleImageClick = () => {
    setShowImageOverlay(true);
  };

  const handleCloseImageOverlay = () => {
    setShowImageOverlay(false);
  };

  // Handle escape key for image overlay
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && showImageOverlay) {
        setShowImageOverlay(false);
      }
    };

    if (showImageOverlay) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [showImageOverlay]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-barriecito">Back to Concepts</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="flex items-center space-x-3 text-gray-600">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="font-nunito text-xl">Loading concept...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !concept) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-barriecito">Back to Concepts</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="text-center">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-red-100 rounded-xl">
                <AlertCircle className="h-8 w-8 text-red-600" />
              </div>
            </div>
            <h1 className="font-barriecito text-2xl text-gray-900 mb-4">
              {error === 'Concept not found' ? 'Concept Not Found' : 'Error Loading Concept'}
            </h1>
            <p className="font-nunito text-gray-600 mb-6">
              {error === 'Concept not found' 
                ? 'The concept you\'re looking for doesn\'t exist or has been moved.'
                : error || 'Something went wrong while loading this concept.'
              }
            </p>
            <Link 
              to="/" 
              className="font-barriecito text-blue-600 hover:text-blue-700"
            >
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Handle media URLs from Supabase with error state
  const heroImageUrl = !heroImageError ? (concept?.hero_image_url || concept?.thumbnail_url || defaultHeroImage) : defaultHeroImage;
  
  // Use blog content from concept or fallback to description
  const blogContent = concept?.blog_post_content || `# ${concept?.title || 'Concept'}\n\n${concept?.description || 'No description available'}`;

  return (
    <>
      <div className="min-h-screen bg-gray-50">
        {/* Back button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <Link 
              to="/" 
              className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
            >
              <ArrowLeft className="h-4 w-4" />
              <span className="font-barriecito">Back to Concepts</span>
            </Link>
          </div>
        </div>

        {/* Main content - centered single column layout */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
          <div className="space-y-8 sm:space-y-12">
            {/* Header section - centered */}
            <div className="text-center">
              <h1 className="font-barriecito text-3xl sm:text-4xl md:text-5xl text-gray-900 mb-4 sm:mb-6">
                {concept.title}
              </h1>
              
              <p className="font-nunito text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
                {concept.description}
              </p>
            </div>
            
            {/* Hero image - centered, 9:16 aspect ratio, clickable */}
            <div className="w-full flex justify-center">
              <div 
                className="w-full max-w-md aspect-[9/16] bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={handleImageClick}
              >
                <img 
                  src={heroImageUrl} 
                  alt={concept.title}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  onError={handleImageError}
                />
              </div>
            </div>

            {/* Voice AI Agent - centered */}
            <div className="w-full">
              <VoiceAIAgent conceptSlug={slug} />
            </div>
            
            {/* Blog content - centered */}
            <div className="w-full">
              <BlogContent content={blogContent} />
            </div>
          </div>
        </div>
      </div>

      {/* Full-screen image overlay */}
      <AnimatePresence>
        {showImageOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-sm"
            onClick={handleCloseImageOverlay}
          >
            {/* Close button */}
            <button
              onClick={handleCloseImageOverlay}
              className="absolute top-4 right-4 z-20 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200 backdrop-blur-sm"
              aria-label="Close image overlay"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Full-screen image */}
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
              className="relative max-w-4xl max-h-[90vh] w-full h-full flex items-center justify-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img 
                src={heroImageUrl} 
                alt={concept.title}
                className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                onError={handleImageError}
              />
            </motion.div>

            {/* Image title */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-center">
              <h2 className="font-barriecito text-2xl text-white mb-2">{concept.title}</h2>
              <p className="font-nunito text-gray-300 text-sm">Click anywhere to close</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConceptPage;