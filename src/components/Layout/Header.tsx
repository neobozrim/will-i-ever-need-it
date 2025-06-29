import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Header: React.FC = () => {
  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <header className={`${
      isHomePage 
        ? 'bg-white shadow-sm border-b border-gray-100' 
        : 'bg-transparent backdrop-blur-sm border-b border-white/10'
    } ${isHomePage ? 'relative' : 'absolute top-0 left-0 right-0 z-50'}`}>
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
            <span className={`logo-text text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent ${
              !isHomePage ? 'drop-shadow-sm' : ''
            }`}>
              Bored? Opposite!
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;