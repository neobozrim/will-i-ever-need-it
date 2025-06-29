import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Transform values for different elements with varying speeds and directions
  // Heading - flies to top-left
  const headingX = useTransform(scrollYProgress, [0, 1], [0, -800]);
  const headingY = useTransform(scrollYProgress, [0, 1], [0, -400]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  // Description - flies to left-center
  const descriptionX = useTransform(scrollYProgress, [0, 1], [0, -600]);
  const descriptionY = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const descriptionOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

  // Button - flies to left-bottom diagonally
  const buttonX = useTransform(scrollYProgress, [0, 1], [0, -500]);
  const buttonY = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  // Image - flies to right-bottom
  const imageX = useTransform(scrollYProgress, [0, 1], [0, 600]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 400]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);
  const imageRotate = useTransform(scrollYProgress, [0, 1], [0, 15]);

  return (
    <section ref={containerRef} className="relative bg-white py-20 lg:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-left">
            {/* Heading with fly-off animation */}
            <motion.h1 
              className="font-barriecito text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight"
              style={{
                x: headingX,
                y: headingY,
                opacity: headingOpacity,
              }}
              initial={{ x: 0, y: 0 }}
              animate={{ x: 0, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100 }}
            >
              Math could be boring!
            </motion.h1>
            
            {/* Description with fly-off animation */}
            <motion.p 
              className="font-nunito text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed"
              style={{
                x: descriptionX,
                y: descriptionY,
                opacity: descriptionOpacity,
              }}
              initial={{ x: 0, y: 0 }}
              animate={{ x: 0, y: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.1 }}
            >
              Or it could help you build a treehouse, crush gaming rivals, and become a legend, while the rest remain bored and... clueless!
            </motion.p>
            
            {/* Button with fly-off animation */}
            <div className="flex justify-start">
              <motion.button 
                className="font-barriecito group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                style={{
                  x: buttonX,
                  y: buttonY,
                  opacity: buttonOpacity,
                }}
                initial={{ x: 0, y: 0 }}
                animate={{ x: 0, y: 0 }}
                transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.2 }}
              >
                <span>WATCH THIS</span>
              </motion.button>
            </div>
          </div>

          {/* Right side - Bored character with fly-off animation */}
          <div className="flex justify-center lg:justify-end">
            <motion.div 
              className="relative"
              style={{
                x: imageX,
                y: imageY,
                opacity: imageOpacity,
                rotate: imageRotate,
              }}
              initial={{ x: 0, y: 0, rotate: 0 }}
              animate={{ x: 0, y: 0, rotate: 0 }}
              transition={{ type: "spring", damping: 20, stiffness: 100, delay: 0.3 }}
            >
              <img 
                src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//bored.png" 
                alt="Bored character illustration"
                className="w-80 h-96 lg:w-96 lg:h-[450px] object-contain transform hover:scale-105 transition-transform duration-300 animate-jiggle"
                onError={(e) => {
                  console.error('Failed to load bored.png image');
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=400';
                }}
              />
              
              {/* Decorative elements with subtle animations */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full animate-bounce delay-1000"
                style={{ opacity: imageOpacity }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-pink-400 rounded-full animate-bounce delay-500"
                style={{ opacity: imageOpacity }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;