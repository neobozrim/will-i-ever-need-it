import React from 'react';
import { Calculator, Triangle, Square, ArrowRight } from 'lucide-react';

interface FeaturedConceptCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  examples: string[];
  onClick: () => void;
}

const FeaturedConceptCard: React.FC<FeaturedConceptCardProps> = ({
  title,
  description,
  icon,
  color,
  examples,
  onClick
}) => {
  return (
    <div 
      className={`group relative bg-white rounded-2xl shadow-lg border border-gray-200 overflow-hidden hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 cursor-pointer ${color}`}
      onClick={onClick}
    >
      {/* Gradient background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br opacity-5 group-hover:opacity-10 transition-opacity duration-500"></div>
      
      <div className="relative p-8">
        {/* Icon */}
        <div className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl mb-6 group-hover:scale-110 transition-transform duration-300`}>
          {icon}
        </div>
        
        {/* Title */}
        <h3 className="text-2xl font-bold text-gray-900 mb-4 group-hover:text-blue-600 transition-colors duration-300">
          {title}
        </h3>
        
        {/* Description */}
        <p className="text-gray-600 mb-6 leading-relaxed">
          {description}
        </p>
        
        {/* Examples */}
        <div className="space-y-2 mb-6">
          <p className="text-sm font-semibold text-gray-700 uppercase tracking-wide">Real-world uses:</p>
          <ul className="space-y-1">
            {examples.map((example, index) => (
              <li key={index} className="text-sm text-gray-600 flex items-center">
                <div className="w-1.5 h-1.5 bg-blue-500 rounded-full mr-3 flex-shrink-0"></div>
                {example}
              </li>
            ))}
          </ul>
        </div>
        
        {/* CTA */}
        <div className="flex items-center justify-between">
          <span className="text-blue-600 font-semibold group-hover:text-blue-700 transition-colors duration-300">
            Explore Now
          </span>
          <ArrowRight className="h-5 w-5 text-blue-600 group-hover:translate-x-2 transition-transform duration-300" />
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-20 h-20 bg-gradient-to-br from-blue-100 to-purple-100 rounded-full opacity-20 group-hover:scale-125 transition-transform duration-500"></div>
      <div className="absolute -bottom-4 -right-4 w-16 h-16 bg-gradient-to-br from-purple-100 to-pink-100 rounded-full opacity-30 group-hover:scale-110 transition-transform duration-500"></div>
    </div>
  );
};

const FeaturedConcepts: React.FC = () => {
  const handleAreaClick = () => {
    // For now, we'll scroll to concepts section
    // Later this can navigate to a specific area concept page
    const conceptsSection = document.getElementById('concepts');
    if (conceptsSection) {
      conceptsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handlePythagoreanClick = () => {
    // For now, we'll scroll to concepts section
    // Later this can navigate to a specific pythagorean concept page
    const conceptsSection = document.getElementById('concepts');
    if (conceptsSection) {
      conceptsSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Featured Math Concepts
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Master these essential concepts and see how they power everything from architecture to video games
          </p>
        </div>

        {/* Featured cards grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* AREA Card */}
          <FeaturedConceptCard
            title="AREA"
            description="Calculate space, optimize layouts, and understand how much material you need for any project. From painting walls to designing gardens, area is everywhere."
            icon={
              <div className="w-full h-full bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center">
                <Square className="h-8 w-8 text-white" />
              </div>
            }
            color="hover:bg-gradient-to-br hover:from-green-50 hover:to-emerald-50"
            examples={[
              "Designing your dream room layout",
              "Calculating paint needed for walls",
              "Planning garden beds and landscaping",
              "Optimizing solar panel placement"
            ]}
            onClick={handleAreaClick}
          />

          {/* PYTHAGOREAN Card */}
          <FeaturedConceptCard
            title="PYTHAGOREAN THEOREM"
            description="Find distances, build structures, and navigate the world. This ancient formula is the secret behind GPS, construction, and even video game physics."
            icon={
              <div className="w-full h-full bg-gradient-to-br from-purple-500 to-violet-600 rounded-2xl flex items-center justify-center">
                <Triangle className="h-8 w-8 text-white" />
              </div>
            }
            color="hover:bg-gradient-to-br hover:from-purple-50 hover:to-violet-50"
            examples={[
              "Building perfectly square structures",
              "GPS navigation and mapping",
              "Video game collision detection",
              "Ladder safety calculations"
            ]}
            onClick={handlePythagoreanClick}
          />
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <Calculator className="h-5 w-5" />
            <span className="text-lg font-medium">Ready to dive deeper?</span>
          </div>
          <p className="text-gray-500 mt-2">Explore our full library of interactive math concepts below</p>
        </div>
      </div>
    </section>
  );
};

export default FeaturedConcepts;