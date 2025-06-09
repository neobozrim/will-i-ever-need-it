import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, BarChart3, BookOpen, AlertCircle, Loader2 } from 'lucide-react';
import { useMathConcept } from '../hooks/useMathConcepts';
import AudioPlayer from '../components/Concept/AudioPlayer';
import VoiceAIAgent from '../components/Concept/VoiceAIAgent';
import BlogContent from '../components/Concept/BlogContent';

const ConceptPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const { concept, loading, error } = useMathConcept(slug || '');

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

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50">
        {/* Back button */}
        <div className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
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

  // Fallback image if hero image is not available
  const heroImageUrl = concept.hero_image_url || concept.thumbnail_url || 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=800';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Back button */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Link 
            to="/" 
            className="inline-flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200"
          >
            <ArrowLeft className="h-4 w-4" />
            <span className="font-medium">Back to Concepts</span>
          </Link>
        </div>
      </div>

      {/* Hero section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm font-medium">
                  {concept.category}
                </span>
                <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getDifficultyColor(concept.difficulty)}`}>
                  {concept.difficulty}
                </span>
              </div>
              
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                {concept.title}
              </h1>
              
              <p className="text-xl text-gray-600 mb-8 leading-relaxed">
                {concept.description}
              </p>
              
              <div className="flex items-center space-x-6 text-sm text-gray-500">
                <div className="flex items-center space-x-2">
                  <BarChart3 className="h-4 w-4" />
                  <span>Interactive</span>
                </div>
                <div className="flex items-center space-x-2">
                  <BookOpen className="h-4 w-4" />
                  <span>Comprehensive</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="aspect-video bg-gradient-to-br from-blue-100 to-purple-100 rounded-xl overflow-hidden">
                <img 
                  src={heroImageUrl} 
                  alt={concept.title}
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    // Fallback to default image if hero image fails to load
                    const target = e.target as HTMLImageElement;
                    target.src = 'https://images.pexels.com/photos/6256065/pexels-photo-6256065.jpeg?auto=compress&cs=tinysrgb&w=800';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="space-y-8">
          {/* Audio and AI blocks - two columns on desktop, stacked on mobile */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <AudioPlayer />
            <VoiceAIAgent />
          </div>
          
          {/* Main content */}
          <BlogContent content={concept.blog_post_content || concept.description} />
        </div>
      </div>
    </div>
  );
};

export default ConceptPage;