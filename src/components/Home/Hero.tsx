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

  // Handle "WATCH THIS" button click
  const handleWatchClick = () => {
    // Find the video section and scroll to it
    const videoSection = document.querySelector('[data-video-section]');
    if (videoSection) {
      videoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'center'
      });
      
      // Wait for scroll to complete, then trigger video play
      setTimeout(() => {
        // Dispatch custom event to trigger video play
        const playVideoEvent = new CustomEvent('playVideo');
        window.dispatchEvent(playVideoEvent);
      }, 1000); // Wait 1 second for smooth scroll to complete
    }
  };

  return (
    <section ref={containerRef} className="relative bg-white py-20 lg:py-32 overflow-hidden">
      {/* Bolt Banner - MOVED TO TOP WITH HIGHEST Z-INDEX */}
      <div className="absolute top-4 right-4 sm:top-6 sm:right-6 lg:top-8 lg:right-8 z-[100]">
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

      {/* Animated Banner Background - Smaller and More Prominent Colors - LOWER Z-INDEX */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* Main banner with pulsing scale animation - SMALLER SIZE */}
        <motion.div
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          animate={{
            scale: [0.6, 0.65, 0.6, 0.58, 0.6], // Much smaller scale values
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        >
          <img 
            src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//banner.svg"
            alt="Mathematical background pattern"
            className="w-full h-full object-contain opacity-20" // Changed to object-contain and increased opacity
            onError={(e) => {
              console.error('Failed to load banner.svg');
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </motion.div>

        {/* Flowing color overlays with MORE PROMINENT colors */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 20% 30%, rgba(255, 173, 173, 0.35) 0%, transparent 60%)',
              'radial-gradient(circle at 80% 70%, rgba(255, 214, 165, 0.35) 0%, transparent 60%)',
              'radial-gradient(circle at 60% 20%, rgba(222, 218, 244, 0.35) 0%, transparent 60%)',
              'radial-gradient(circle at 30% 80%, rgba(217, 233, 248, 0.35) 0%, transparent 60%)',
              'radial-gradient(circle at 70% 50%, rgba(228, 241, 238, 0.35) 0%, transparent 60%)',
              'radial-gradient(circle at 20% 30%, rgba(255, 173, 173, 0.35) 0%, transparent 60%)',
            ],
          }}
          transition={{
            duration: 12,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Secondary flowing color layer - MORE PROMINENT */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            background: [
              'linear-gradient(45deg, rgba(255, 173, 173, 0.25) 0%, rgba(255, 214, 165, 0.25) 25%, rgba(222, 218, 244, 0.25) 50%, rgba(217, 233, 248, 0.25) 75%, rgba(228, 241, 238, 0.25) 100%)',
              'linear-gradient(135deg, rgba(228, 241, 238, 0.25) 0%, rgba(217, 233, 248, 0.25) 25%, rgba(222, 218, 244, 0.25) 50%, rgba(255, 214, 165, 0.25) 75%, rgba(255, 173, 173, 0.25) 100%)',
              'linear-gradient(225deg, rgba(255, 214, 165, 0.25) 0%, rgba(228, 241, 238, 0.25) 25%, rgba(255, 173, 173, 0.25) 50%, rgba(217, 233, 248, 0.25) 75%, rgba(222, 218, 244, 0.25) 100%)',
              'linear-gradient(315deg, rgba(222, 218, 244, 0.25) 0%, rgba(255, 173, 173, 0.25) 25%, rgba(228, 241, 238, 0.25) 50%, rgba(255, 214, 165, 0.25) 75%, rgba(217, 233, 248, 0.25) 100%)',
              'linear-gradient(45deg, rgba(255, 173, 173, 0.25) 0%, rgba(255, 214, 165, 0.25) 25%, rgba(222, 218, 244, 0.25) 50%, rgba(217, 233, 248, 0.25) 75%, rgba(228, 241, 238, 0.25) 100%)',
            ],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* Pulsing color spots - LARGER AND MORE PROMINENT */}
        <motion.div
          className="absolute top-1/4 left-1/4 w-48 h-48 rounded-full blur-xl"
          animate={{
            scale: [0.8, 1.4, 0.8],
            opacity: [0.3, 0.6, 0.3],
            background: [
              'rgba(255, 173, 173, 0.5)',
              'rgba(255, 214, 165, 0.5)',
              'rgba(222, 218, 244, 0.5)',
              'rgba(255, 173, 173, 0.5)',
            ],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute top-3/4 right-1/4 w-36 h-36 rounded-full blur-lg"
          animate={{
            scale: [1, 0.7, 1.5, 1],
            opacity: [0.4, 0.2, 0.7, 0.4],
            background: [
              'rgba(217, 233, 248, 0.5)',
              'rgba(228, 241, 238, 0.5)',
              'rgba(222, 218, 244, 0.5)',
              'rgba(217, 233, 248, 0.5)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2,
          }}
        />

        <motion.div
          className="absolute top-1/2 right-1/3 w-32 h-32 rounded-full blur-lg"
          animate={{
            scale: [0.9, 1.6, 0.6, 0.9],
            opacity: [0.35, 0.8, 0.15, 0.35],
            background: [
              'rgba(255, 214, 165, 0.5)',
              'rgba(228, 241, 238, 0.5)',
              'rgba(255, 173, 173, 0.5)',
              'rgba(255, 214, 165, 0.5)',
            ],
          }}
          transition={{
            duration: 10,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 4,
          }}
        />

        {/* Additional floating color elements for more vibrancy */}
        <motion.div
          className="absolute top-1/3 left-2/3 w-28 h-28 rounded-full blur-md"
          animate={{
            scale: [1.2, 0.8, 1.2],
            opacity: [0.25, 0.5, 0.25],
            background: [
              'rgba(222, 218, 244, 0.4)',
              'rgba(255, 173, 173, 0.4)',
              'rgba(217, 233, 248, 0.4)',
              'rgba(222, 218, 244, 0.4)',
            ],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1,
          }}
        />

        <motion.div
          className="absolute bottom-1/4 left-1/3 w-40 h-40 rounded-full blur-xl"
          animate={{
            scale: [0.7, 1.3, 0.7],
            opacity: [0.2, 0.6, 0.2],
            background: [
              'rgba(228, 241, 238, 0.4)',
              'rgba(255, 214, 165, 0.4)',
              'rgba(222, 218, 244, 0.4)',
              'rgba(228, 241, 238, 0.4)',
            ],
          }}
          transition={{
            duration: 9,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3,
          }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10">
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
                      onClick={handleWatchClick}
                      className="font-barriecito group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 cursor-pointer"
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

          {/* Right side - New Characters PNG with idle animation and fly-away trigger - NO DECORATIVE DOTS */}
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
                    src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2021characters.png" 
                    alt="Math characters illustration"
                    className="w-80 h-96 lg:w-96 lg:h-[450px] object-contain transform hover:scale-105 transition-transform duration-300"
                    onError={(e) => {
                      console.error('Failed to load characters.png image');
                      // Fallback to a placeholder if image fails to load
                      const target = e.target as HTMLImageElement;
                      target.src = 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=400';
                    }}
                  />
                  
                  {/* REMOVED: Pink and yellow decorative dots */}
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