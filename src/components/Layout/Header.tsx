import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
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
            <span className="logo-text text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bored? Opposite!
            </span>
          </Link>
          
          {/* Bolt.new link */}
          <a 
            href="https://bolt.new/" 
            target="_blank" 
            rel="noopener noreferrer"
            className="flex items-center space-x-2 text-gray-600 hover:text-gray-900 transition-colors duration-200 group"
          >
            <span className="font-nunito text-sm">Built with</span>
            <div className="flex items-center space-x-1">
              <svg 
                className="w-4 h-4 text-orange-500 group-hover:text-orange-600 transition-colors duration-200" 
                viewBox="0 0 24 24" 
                fill="currentColor"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"/>
              </svg>
              <span className="font-nunito text-sm font-medium">Bolt</span>
            </div>
          </a>
        </div>
      </div>
    </header>
  );
};

export default Header;