import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { User } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';
import UserMenu from '../Auth/UserMenu';
import AuthModal from '../Auth/AuthModal';

const Header: React.FC = () => {
  const { user, loading } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);

  return (
    <>
      <header className="absolute top-0 left-0 right-0 z-50 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <Link to="/" className="flex items-center space-x-2 group">
              <div className="flex items-center justify-center w-8 h-8 group-hover:scale-105 transition-transform duration-200">
                <img 
                  src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//logo.svg" 
                  alt="Bored? Opposite! Logo"
                  className="w-full h-full object-contain"
                  onError={(e) => {
                    console.error('Failed to load logo:', e);
                    // Fallback to a simple text logo if image fails
                    const target = e.target as HTMLImageElement;
                    target.style.display = 'none';
                  }}
                />
              </div>
              <span className="logo-text text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                Bored? Opposite!
              </span>
            </Link>

            {/* Auth Section */}
            <div className="flex items-center">
              {loading ? (
                <div className="w-8 h-8 bg-gray-200 rounded-full animate-pulse"></div>
              ) : user ? (
                <UserMenu />
              ) : (
                <button
                  onClick={() => setShowAuthModal(true)}
                  className="flex items-center space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-xl font-barriecito hover:shadow-lg transition-all duration-300 transform hover:scale-105"
                >
                  <User className="h-4 w-4" />
                  <span>Sign In</span>
                </button>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        initialMode="login"
      />
    </>
  );
};

export default Header;