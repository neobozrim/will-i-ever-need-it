import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, AlertCircle, Loader2 } from 'lucide-react';
import { useMathConcept } from '../hooks/useMathConcepts';
import VoiceAIAgent from '../components/Concept/VoiceAIAgent';
import BlogContent from '../components/Concept/BlogContent';

const ConceptPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { concept, loading, error } = useMathConcept(slug || '');
  const [heroImageError, setHeroImageError] = useState(false);
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
              <span className="font-medium">Back to Concepts</span>
            </Link>
          </div>
        </div>

        <div className="flex items-center justify-center py-20">
          <div className="flex items-center space-x-3 text-gray-600">
            <Loader2 className="h-8 w-8 animate-spin" />
            <span className="text-xl">Loading concept...</span>
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
              <span className="font-medium">Back to Concepts</span>
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
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              {error === 'Concept not found' ? 'Concept Not Found' : 'Error Loading Concept'}
            </h1>
            <p className="text-gray-600 mb-6">
              {error === 'Concept not found' 
                ? 'The concept you\'re looking for doesn\'t exist or has been moved.'
                : error || 'Something went wrong while loading this concept.'
              }
            </p>
            <Link 
              to="/" 
              className="text-blue-600 hover:text-blue-700 font-medium"
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
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Concepts</span>
          </Link>
        </div>
      </div>

      {/* Single column layout */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12">
        <div className="space-y-8 sm:space-y-12">
          {/* Header section */}
          <div className="text-center">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-4 sm:mb-6">
              {concept.title}
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-600 leading-relaxed max-w-3xl mx-auto">
              {concept.description}
            </p>
          </div>
          
          {/* Hero image */}
          <div className="w-full">
            <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden shadow-lg">
              <img 
                src={heroImageUrl} 
                alt={concept.title}
                className="w-full h-full object-cover"
                onError={handleImageError}
              />
            </div>
          </div>

          {/* Voice AI Agent */}
          <div className="w-full">
            <VoiceAIAgent />
          </div>
          
          {/* Blog content */}
          <div className="w-full">
            <BlogContent content={blogContent} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConceptPage;