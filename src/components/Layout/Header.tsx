import React from 'react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 group">
            <div className="flex items-center justify-center w-10 h-10 group-hover:scale-105 transition-transform duration-200">
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
            <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Bored? Opposite!
            </span>
          </Link>
        </div>
      </div>
    </header>
  );
};

export default Header;