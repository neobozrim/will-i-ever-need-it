import React, { useState } from 'react';
import { motion } from 'framer-motion';
import AuthModal from './AuthModal';

interface AuthOverlayProps {
  title?: string;
  description?: string;
  className?: string;
}

const AuthOverlay: React.FC<AuthOverlayProps> = ({ 
  title = "Sign In Required",
  description = "Please sign in to access this feature",
  className = ""
}) => {
  const [showAuthModal, setShowAuthModal] = useState(false);

  const handleSignInClick = () => {
    setShowAuthModal(true);
  };

  return (
    <>
      <div className={`absolute inset-0 bg-white/95 backdrop-blur-sm flex items-center justify-center z-40 rounded-2xl ${className}`}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="text-center p-6 max-w-sm"
        >
          {/* Maya's Avatar */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 rounded-full overflow-hidden border-4 border-purple-200 shadow-lg">
              <img 
                src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//voice-ai-avatar.png"
                alt="Maya - AI Math Tutor"
                className="w-full h-full object-cover"
                onError={(e) => {
                  console.error('Failed to load Maya avatar');
                  // Fallback to gradient background with initials
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    parent.className = 'w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-full flex items-center justify-center text-white font-barriecito text-xl shadow-lg';
                    parent.innerHTML = 'M';
                  }
                }}
              />
            </div>
          </div>

          {/* Title */}
          <h3 className="font-barriecito text-xl text-gray-900 mb-2">
            {title}
          </h3>

          {/* Description */}
          <p className="font-nunito text-gray-600 mb-6 leading-relaxed">
            {description}
          </p>

          {/* Single Sign In Link */}
          <button
            onClick={handleSignInClick}
            className="font-barriecito text-blue-600 hover:text-blue-700 underline text-lg transition-colors"
          >
            Sign in
          </button>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
};

export default AuthOverlay;