import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Loader2, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useMathConcept } from '../hooks/useMathConcepts';
import { useSEO } from '../hooks/useSEO';
import BlogContent from '../components/Concept/BlogContent';
import OptimizedImage from '../components/ui/OptimizedImage';

const ConceptPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { concept, loading, error } = useMathConcept(slug || '');
  const [heroImageError, setHeroImageError] = useState(false);
  const [showImageOverlay, setShowImageOverlay] = useState(false);
  const defaultHeroImage = 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=800';

  // SEO optimization for concept pages
  useSEO({
    title: concept?.title,
    description: concept?.description,
    keywords: `${concept?.title}, math, real world applications, ${slug?.replace(/-/g, ' ')}`,
    image: concept?.hero_image_url || concept?.thumbnail_url,
    url: `https://boredoppo.site/concepts/${slug}`,
    type: 'article'
  });

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
      <div className="min-h-screen dotted-background">
        {/* Floating Back Button - positioned below header */}
        <div className="fixed top-24 left-4 sm:left-6 lg:left-8 z-20">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200/50"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-barriecito">Back</span>
          </Link>
        </div>

        <div className="flex items-center justify-center py-20 pt-32">
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
      <div className="min-h-screen dotted-background">
        {/* Floating Back Button - positioned below header */}
        <div className="fixed top-24 left-4 sm:left-6 lg:left-8 z-20">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200/50"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-barriecito">Back</span>
          </Link>
        </div>

        <div className="flex items-center justify-center py-20 pt-32">
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
      <div className="min-h-screen dotted-background">
        {/* Floating Back Button - positioned below header with proper spacing */}
        <div className="fixed top-24 left-4 sm:left-6 lg:left-8 z-20">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 bg-white/90 backdrop-blur-sm text-gray-700 hover:text-gray-900 px-4 py-2 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 border border-gray-200/50 hover:bg-white/95"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-barriecito">Back</span>
          </Link>
        </div>

        {/* Main content - starts below header with proper spacing and padding for sticky overlay */}
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 pt-24 sm:pt-28 pb-24">
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
            
            {/* Hero image - centered, 9:16 aspect ratio, clickable, optimized */}
            <div className="w-full flex justify-center">
              <div 
                className="w-full max-w-md aspect-[9/16] bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden shadow-lg cursor-pointer hover:shadow-xl transition-shadow duration-300"
                onClick={handleImageClick}
              >
                <OptimizedImage
                  src={heroImageUrl}
                  alt={`${concept.title} - Math concept illustration`}
                  fallbackSrc={defaultHeroImage}
                  className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                  priority={true}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
            </div>
            
            {/* Blog content - centered */}
            <div className="w-full">
              <BlogContent content={blogContent} />
            </div>
          </div>
        </div>
      </div>

      {/* FIXED: Full-screen image overlay with scrolling support for tall images */}
      <AnimatePresence>
        {showImageOverlay && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm"
          >
            {/* Close button - fixed position */}
            <button
              onClick={handleCloseImageOverlay}
              className="fixed top-4 right-4 z-30 p-3 bg-black/50 hover:bg-black/70 text-white rounded-full transition-colors duration-200 backdrop-blur-sm"
              aria-label="Close image overlay"
            >
              <X className="h-6 w-6" />
            </button>

            {/* Scrollable container for the image */}
            <div 
              className="w-full h-full overflow-auto p-4 flex items-start justify-center cursor-pointer"
              onClick={handleCloseImageOverlay}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.3, type: "spring", damping: 25, stiffness: 300 }}
                className="relative max-w-4xl w-full min-h-full flex items-start justify-center py-8"
                onClick={(e) => e.stopPropagation()}
              >
                <OptimizedImage
                  src={heroImageUrl}
                  alt={`${concept.title} - Full size view`}
                  fallbackSrc={defaultHeroImage}
                  className="w-full h-auto object-contain rounded-lg shadow-2xl"
                  priority={true}
                />
              </motion.div>
            </div>

            {/* Instructions for scrolling - appears briefly */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ delay: 0.5, duration: 0.5 }}
              className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-20"
            >
              <div className="bg-black/70 text-white px-4 py-2 rounded-lg text-sm font-nunito backdrop-blur-sm">
                Scroll to see the full image • Click anywhere to close
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default ConceptPage;