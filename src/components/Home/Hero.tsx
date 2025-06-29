import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // More dramatic transform values with rotation and scaling
  // Heading - flies to top-left with rotation and scaling
  const headingX = useTransform(scrollYProgress, [0, 0.8], [0, -1200]);
  const headingY = useTransform(scrollYProgress, [0, 0.8], [0, -600]);
  const headingRotate = useTransform(scrollYProgress, [0, 0.8], [0, -45]);
  const headingScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.3]);
  const headingOpacity = useTransform(scrollYProgress, [0, 0.2, 0.6], [1, 0.8, 0]);

  // Description - flies to left-center with spin
  const descriptionX = useTransform(scrollYProgress, [0, 0.8], [0, -1000]);
  const descriptionY = useTransform(scrollYProgress, [0, 0.8], [0, -200]);
  const descriptionRotate = useTransform(scrollYProgress, [0, 0.8], [0, -25]);
  const descriptionScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.4]);
  const descriptionOpacity = useTransform(scrollYProgress, [0, 0.25, 0.65], [1, 0.9, 0]);

  // Button - flies to left-bottom diagonally with dramatic spin
  const buttonX = useTransform(scrollYProgress, [0, 0.8], [0, -800]);
  const buttonY = useTransform(scrollYProgress, [0, 0.8], [0, 500]);
  const buttonRotate = useTransform(scrollYProgress, [0, 0.8], [0, -180]);
  const buttonScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.2]);
  const buttonOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 0.85, 0]);

  // Image - flies to right-bottom with dramatic rotation and scaling
  const imageX = useTransform(scrollYProgress, [0, 0.8], [0, 1000]);
  const imageY = useTransform(scrollYProgress, [0, 0.8], [0, 600]);
  const imageRotate = useTransform(scrollYProgress, [0, 0.8], [0, 360]);
  const imageScale = useTransform(scrollYProgress, [0, 0.8], [1, 0.1]);
  const imageOpacity = useTransform(scrollYProgress, [0, 0.35, 0.75], [1, 0.7, 0]);

  // Decorative elements with their own dramatic animations
  const dot1X = useTransform(scrollYProgress, [0, 0.8], [0, 800]);
  const dot1Y = useTransform(scrollYProgress, [0, 0.8], [0, -300]);
  const dot1Rotate = useTransform(scrollYProgress, [0, 0.8], [0, 720]);
  const dot1Scale = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  const dot2X = useTransform(scrollYProgress, [0, 0.8], [0, 600]);
  const dot2Y = useTransform(scrollYProgress, [0, 0.8], [0, 800]);
  const dot2Rotate = useTransform(scrollYProgress, [0, 0.8], [0, -540]);
  const dot2Scale = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={containerRef} className="relative bg-white py-20 lg:py-32 overflow-hidden">
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-left">
            {/* Heading with dramatic fly-off animation */}
            <motion.h1 
              className="font-barriecito text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight"
              style={{
                x: headingX,
                y: headingY,
                rotate: headingRotate,
                scale: headingScale,
                opacity: headingOpacity,
              }}
              initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
              animate={{ 
                x: [0, -5, 0], 
                y: [0, -2, 0],
                rotate: [0, 1, 0]
              }}
              transition={{ 
                duration: 0.6, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut"
              }}
            >
              Math could be boring!
            </motion.h1>
            
            {/* Description with dramatic fly-off animation */}
            <motion.p 
              className="font-nunito text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed"
              style={{
                x: descriptionX,
                y: descriptionY,
                rotate: descriptionRotate,
                scale: descriptionScale,
                opacity: descriptionOpacity,
              }}
              initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
              animate={{ 
                x: [0, -3, 0], 
                y: [0, 1, 0],
                rotate: [0, -0.5, 0]
              }}
              transition={{ 
                duration: 0.8, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.1
              }}
            >
              Or it could help you build a treehouse, crush gaming rivals, and become a legend, while the rest remain bored and... clueless!
            </motion.p>
            
            {/* Button with dramatic fly-off animation */}
            <div className="flex justify-start">
              <motion.button 
                className="font-barriecito group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                style={{
                  x: buttonX,
                  y: buttonY,
                  rotate: buttonRotate,
                  scale: buttonScale,
                  opacity: buttonOpacity,
                }}
                initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
                animate={{ 
                  x: [0, -2, 0], 
                  y: [0, 2, 0],
                  rotate: [0, 0.5, 0],
                  scale: [1, 1.02, 1]
                }}
                transition={{ 
                  duration: 1, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.2
                }}
              >
                <span>WATCH THIS</span>
              </motion.button>
            </div>
          </div>

          {/* Right side - Bored character with dramatic fly-off animation */}
          <div className="flex justify-center lg:justify-end">
            <motion.div 
              className="relative"
              style={{
                x: imageX,
                y: imageY,
                rotate: imageRotate,
                scale: imageScale,
                opacity: imageOpacity,
              }}
              initial={{ x: 0, y: 0, rotate: 0, scale: 1 }}
              animate={{ 
                x: [0, 3, 0], 
                y: [0, -2, 0],
                rotate: [0, -1, 0],
                scale: [1, 1.01, 1]
              }}
              transition={{ 
                duration: 1.2, 
                repeat: Infinity, 
                repeatType: "reverse",
                ease: "easeInOut",
                delay: 0.3
              }}
            >
              <img 
                src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//bored.png" 
                alt="Bored character illustration"
                className="w-80 h-96 lg:w-96 lg:h-[450px] object-contain transform hover:scale-105 transition-transform duration-300"
                onError={(e) => {
                  console.error('Failed to load bored.png image');
                  // Fallback to a placeholder if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=400';
                }}
              />
              
              {/* Decorative elements with dramatic individual animations */}
              <motion.div 
                className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"
                style={{ 
                  x: dot1X,
                  y: dot1Y,
                  rotate: dot1Rotate,
                  scale: dot1Scale,
                  opacity: imageOpacity
                }}
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 10, 0]
                }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut"
                }}
              />
              <motion.div 
                className="absolute -bottom-6 -left-6 w-6 h-6 bg-pink-400 rounded-full"
                style={{ 
                  x: dot2X,
                  y: dot2Y,
                  rotate: dot2Rotate,
                  scale: dot2Scale,
                  opacity: imageOpacity
                }}
                animate={{ 
                  scale: [1, 1.3, 1],
                  rotate: [0, -15, 0]
                }}
                transition={{ 
                  duration: 1.5, 
                  repeat: Infinity, 
                  repeatType: "reverse",
                  ease: "easeInOut",
                  delay: 0.5
                }}
              />
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;