import React from 'react';
import { TreePine, Zap, Building } from 'lucide-react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-br from-orange-100 via-red-100 to-pink-100 py-20 lg:py-32 overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      <div className="absolute top-20 left-10 w-72 h-72 bg-orange-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-72 h-72 bg-red-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000"></div>
      
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-left">
          <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-2 leading-tight">
            math could be boring
          </h1>
          <h2 className="text-3xl md:text-5xl lg:text-6xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-blue-800 bg-clip-text text-transparent">
              like... real boring
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed">
            but not when it actually helps you do cool stuff like:
          </p>
          
          {/* Fancy scenario bullets */}
          <div className="flex flex-col md:flex-row items-start gap-6 mb-6 max-w-5xl">
            <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="p-3 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <TreePine className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-green-700 text-lg">building a treehouse</span>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="p-3 bg-gradient-to-br from-purple-500 to-violet-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Zap className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-purple-700 text-lg">talking to aliens</span>
            </div>
            
            <div className="flex items-center space-x-3 bg-white/90 backdrop-blur-sm px-6 py-4 rounded-2xl shadow-lg border border-gray-200 hover:shadow-xl transition-all duration-300 transform hover:scale-105 group">
              <div className="p-3 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl group-hover:scale-110 transition-transform duration-200">
                <Building className="h-6 w-6 text-white" />
              </div>
              <span className="font-bold text-orange-700 text-lg">tallest marshmallow tower</span>
            </div>
          </div>
          
          <p className="text-xl text-gray-600 mb-8">
            don't believe us? Well, stay ignorant, or join the cool kids and WATCH THIS:
          </p>
          
          <div className="flex justify-start">
            <button className="group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2">
              <span>WATCH THIS</span>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;