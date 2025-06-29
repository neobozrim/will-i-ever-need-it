import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showElements, setShowElements] = useState(true);
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Trigger fly-away animation when user starts scrolling - ultra sensitive
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // Trigger at just 0.2% scroll - even more sensitive!
      if (latest > 0.002 && !hasTriggered) {
        setHasTriggered(true);
        // Hide elements after animation completes
        setTimeout(() => {
          setShowElements(false);
        }, 500); // Faster completion
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasTriggered]);

  // Reset when scrolling back to top - also more sensitive
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.001 && hasTriggered) {
        setHasTriggered(false);
        setShowElements(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasTriggered]);

  return (
    <section ref={containerRef} className="relative bg-white py-20 lg:py-32 overflow-hidden">
      {/* White Circle in Top Right Corner - Responsive - Links to Bolt.new */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-10">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:scale-105 transition-transform duration-300"
        >
          <img 
            src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//white_circle_360x360%20(2).png"
            alt="Built with Bolt - Click to visit bolt.new"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-32 lg:h-32 xl:w-40 xl:h-40 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onError={(e) => {
              console.error('Failed to load white circle image');
              // Hide the image if it fails to load
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </a>
      </div>

      {/* RESTORED: Beautiful Animated Background - PULSING ELEMENTS */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* Base background pattern */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center opacity-10">
          <img 
            src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2023banner2.svg"
            alt="Mathematical background pattern"
            className="w-full h-full object-cover"
            style={{
              minWidth: '100vw',
              minHeight: '100vh',
              objectFit: 'cover',
              objectPosition: 'center center'
            }}
            onError={(e) => {
              console.error('Failed to load Asset 23banner2.svg');
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* RESTORED: Animated Color Overlays - Multiple layers for depth */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 60%, rgba(147, 51, 234, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 50% 30%, rgba(236, 72, 153, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 20% 70%, rgba(34, 197, 94, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 80% 20%, rgba(249, 115, 22, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 30% 40%, rgba(59, 130, 246, 0.15) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* RESTORED: Multiple Pulsing Spots for Beautiful Effect */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-40 h-40 rounded-full blur-3xl"
          animate={{
            scale: [0.8, 1.6, 0.8],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 30, 0],
            y: [0, -20, 0],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: 'linear-gradient(45deg, rgba(59, 130, 246, 0.4), rgba(147, 51, 234, 0.4))',
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full blur-2xl"
          animate={{
            scale: [1.2, 0.6, 1.2],
            opacity: [0.15, 0.35, 0.15],
            x: [0, -25, 0],
            y: [0, 25, 0],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
          style={{
            background: 'linear-gradient(135deg, rgba(236, 72, 153, 0.4), rgba(249, 115, 22, 0.4))',
          }}
        />

        <motion.div
          className="absolute bottom-1/3 left-1/2 w-36 h-36 rounded-full blur-3xl"
          animate={{
            scale: [0.9, 1.4, 0.9],
            opacity: [0.08, 0.25, 0.08],
            x: [0, 15, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 14,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
          style={{
            background: 'linear-gradient(90deg, rgba(34, 197, 94, 0.4), rgba(59, 130, 246, 0.4))',
          }}
        />

        {/* Additional smaller pulsing elements */}
        <motion.div
          className="absolute top-3/4 right-1/4 w-24 h-24 rounded-full blur-xl"
          animate={{
            scale: [0.7, 1.3, 0.7],
            opacity: [0.12, 0.28, 0.12],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 6,
          }}
          style={{
            background: 'radial-gradient(circle, rgba(147, 51, 234, 0.3), rgba(236, 72, 153, 0.3))',
          }}
        />

        <motion.div
          className="absolute top-1/6 right-1/2 w-28 h-28 rounded-full blur-2xl"
          animate={{
            scale: [1.1, 0.5, 1.1],
            opacity: [0.1, 0.3, 0.1],
            x: [0, 20, 0],
            y: [0, 15, 0],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 8,
          }}
          style={{
            background: 'linear-gradient(180deg, rgba(249, 115, 22, 0.3), rgba(34, 197, 94, 0.3))',
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left content */}
          <div className="text-left">
            <AnimatePresence>
              {showElements && (
                <>
                  {/* Heading with idle animation and fly-away trigger - FIRST TO GO */}
                  <motion.h1 
                    className="font-barriecito text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight"
                    initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                    animate={hasTriggered ? {
                      x: -1200,
                      y: -600,
                      rotate: -45,
                      scale: 0.3,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut" } // NO DELAY - starts immediately
                    } : { 
                      x: [0, -5, 0], 
                      y: [0, -2, 0],
                      rotate: [0, 1, 0],
                      transition: { 
                        duration: 0.6, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    exit={{
                      x: -1200,
                      y: -600,
                      rotate: -45,
                      scale: 0.3,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut" }
                    }}
                  >
                    Math could be boring!
                  </motion.h1>
                  
                  {/* Description with idle animation and fly-away trigger - SECOND TO GO */}
                  <motion.p 
                    className="font-nunito text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed"
                    initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                    animate={hasTriggered ? {
                      x: -1000,
                      y: -200,
                      rotate: -25,
                      scale: 0.4,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut", delay: 0.02 } // Tiny delay
                    } : { 
                      x: [0, -3, 0], 
                      y: [0, 1, 0],
                      rotate: [0, -0.5, 0],
                      transition: { 
                        duration: 0.8, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.1
                      }
                    }}
                    exit={{
                      x: -1000,
                      y: -200,
                      rotate: -25,
                      scale: 0.4,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut", delay: 0.02 }
                    }}
                  >
                    Or it could help you build a treehouse, crush gaming rivals, and become a legend, while the rest remain bored and... clueless!
                  </motion.p>
                  
                  {/* Button with idle animation and fly-away trigger - THIRD TO GO */}
                  <div className="flex justify-start">
                    <motion.button 
                      className="font-barriecito group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2"
                      initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                      animate={hasTriggered ? {
                        x: -800,
                        y: 500,
                        rotate: -180,
                        scale: 0.2,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut", delay: 0.04 } // Tiny delay
                      } : { 
                        x: [0, -2, 0], 
                        y: [0, 2, 0],
                        rotate: [0, 0.5, 0],
                        scale: [1, 1.02, 1],
                        transition: { 
                          duration: 1, 
                          repeat: Infinity, 
                          repeatType: "reverse",
                          ease: "easeInOut",
                          delay: 0.2
                        }
                      }}
                      exit={{
                        x: -800,
                        y: 500,
                        rotate: -180,
                        scale: 0.2,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut", delay: 0.04 }
                      }}
                    >
                      <span>WATCH THIS</span>
                    </motion.button>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Right side - Bored character with idle animation and fly-away trigger - FOURTH TO GO */}
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence>
              {showElements && (
                <motion.div 
                  className="relative"
                  initial={{ x: 0, y: 0, rotate: 0, scale: 1, opacity: 1 }}
                  animate={hasTriggered ? {
                    x: 1000,
                    y: 600,
                    rotate: 360,
                    scale: 0.1,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeInOut", delay: 0.06 } // Tiny delay
                  } : { 
                    x: [0, 3, 0], 
                    y: [0, -2, 0],
                    rotate: [0, -1, 0],
                    scale: [1, 1.01, 1],
                    transition: { 
                      duration: 1.2, 
                      repeat: Infinity, 
                      repeatType: "reverse",
                      ease: "easeInOut",
                      delay: 0.3
                    }
                  }}
                  exit={{
                    x: 1000,
                    y: 600,
                    rotate: 360,
                    scale: 0.1,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeInOut", delay: 0.06 }
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;