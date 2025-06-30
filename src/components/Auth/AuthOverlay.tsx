import React, { useState } from 'react';
import { User, Lock } from 'lucide-react';
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
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');

  const handleAuthClick = (mode: 'login' | 'register') => {
    setAuthMode(mode);
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
          {/* Lock Icon */}
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
              <Lock className="h-8 w-8 text-white" />
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

          {/* Auth Buttons */}
          <div className="space-y-3">
            <button
              onClick={() => handleAuthClick('login')}
              className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 px-4 rounded-xl font-barriecito text-lg hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              Sign In
            </button>
            
            <button
              onClick={() => handleAuthClick('register')}
              className="w-full border-2 border-gray-300 text-gray-700 py-3 px-4 rounded-xl font-barriecito text-lg hover:border-gray-400 hover:bg-gray-50 transition-all duration-300"
            >
              Create Account
            </button>
          </div>

          {/* Benefits */}
          <div className="mt-6 text-left">
            <p className="font-nunito text-sm text-gray-500 mb-2">With an account you can:</p>
            <ul className="font-nunito text-sm text-gray-600 space-y-1">
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                <span>Chat with Maya, your AI tutor</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-purple-500 rounded-full"></div>
                <span>Track your learning progress</span>
              </li>
              <li className="flex items-center space-x-2">
                <div className="w-1.5 h-1.5 bg-pink-500 rounded-full"></div>
                <span>Save your favorite concepts</span>
              </li>
            </ul>
          </div>
        </motion.div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode={authMode}
      />
    </>
  );
};

export default AuthOverlay;