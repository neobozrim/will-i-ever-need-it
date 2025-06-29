import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
  const [showElements, setShowElements] = useState(true);
  const [hasLoaded, setHasLoaded] = useState(false);
  
  // Track scroll progress of the hero section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  // Trigger entry animations on component mount
  useEffect(() => {
    const timer = setTimeout(() => {
      setHasLoaded(true);
    }, 100); // Small delay to ensure smooth mounting

    return () => clearTimeout(timer);
  }, []);

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

  // Handle "WATCH THIS" button click - FIXED: No auto-scroll, just smooth scroll
  const handleWatchClick = () => {
    // Find the video section and scroll to it smoothly
    const videoSection = document.querySelector('[data-video-section]');
    if (videoSection) {
      videoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start' // Changed from 'center' to 'start' for better positioning
      });
      // REMOVED: Auto video play - let user click to play
    }
  };

  // Entry animation variants
  const dropInVariants = {
    hidden: { 
      y: -100, 
      opacity: 0, 
      scale: 0.8,
      rotate: -10
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 12,
        stiffness: 100,
        mass: 0.8
      }
    }
  };

  const slideInFromLeftVariants = {
    hidden: { 
      x: -200, 
      opacity: 0, 
      scale: 0.9,
      rotate: -5
    },
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 15,
        stiffness: 120,
        mass: 1
      }
    }
  };

  const bounceInVariants = {
    hidden: { 
      y: 50, 
      opacity: 0, 
      scale: 0.7
    },
    visible: { 
      y: 0, 
      opacity: 1, 
      scale: 1,
      transition: {
        type: "spring",
        damping: 8,
        stiffness: 150,
        mass: 0.6
      }
    }
  };

  const slideInFromRightVariants = {
    hidden: { 
      x: 300, 
      opacity: 0, 
      scale: 0.8,
      rotate: 15
    },
    visible: { 
      x: 0, 
      opacity: 1, 
      scale: 1,
      rotate: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100,
        mass: 1.2
      }
    }
  };

  return (
    <section ref={containerRef} className="relative bg-white py-20 lg:py-32 overflow-hidden min-h-screen">
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

      {/* FIXED: Static Background - No scaling animations that cause glitches */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
        {/* FIXED: Static banner background - removed scaling animation */}
        <div className="absolute inset-0 w-full h-full flex items-center justify-center">
          <img 
            src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2023banner2.svg"
            alt="Mathematical background pattern"
            className="w-full h-full opacity-20 object-cover"
            style={{
              minWidth: '100vw',
              minHeight: '100vh',
              objectFit: 'cover', // Changed from 'contain' to 'cover' for consistent sizing
              objectPosition: 'center center'
            }}
            onError={(e) => {
              console.error('Failed to load Asset 23banner2.svg');
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </div>

        {/* SIMPLIFIED: Gentle color overlays - reduced complexity to prevent glitches */}
        <motion.div
          className="absolute inset-0 w-full h-full"
          animate={{
            background: [
              'radial-gradient(circle at 30% 40%, rgba(255, 173, 173, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 70% 60%, rgba(255, 214, 165, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 50% 30%, rgba(222, 218, 244, 0.15) 0%, transparent 70%)',
              'radial-gradient(circle at 30% 40%, rgba(255, 173, 173, 0.15) 0%, transparent 70%)',
            ],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        {/* SIMPLIFIED: Single gentle pulsing spot */}
        <motion.div
          className="absolute top-1/3 left-1/3 w-32 h-32 rounded-full blur-xl"
          animate={{
            scale: [0.8, 1.2, 0.8],
            opacity: [0.1, 0.3, 0.1],
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          style={{
            background: 'rgba(255, 173, 173, 0.3)',
          }}
        />
      </div>

      {/* MOVED CONTENT LOWER - Added more top padding and flex positioning */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 h-full flex items-end pb-20 pt-32 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left content */}
          <div className="text-left">
            <AnimatePresence>
              {showElements && (
                <>
                  {/* Heading with DROP IN animation */}
                  <motion.h1 
                    className="font-barriecito text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight"
                    variants={dropInVariants}
                    initial="hidden"
                    animate={hasLoaded && !hasTriggered ? "visible" : hasTriggered ? {
                      x: -1200,
                      y: -600,
                      rotate: -45,
                      scale: 0.3,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut" }
                    } : "hidden"}
                    exit={{
                      x: -1200,
                      y: -600,
                      rotate: -45,
                      scale: 0.3,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut" }
                    }}
                    transition={{
                      delay: 0.2 // First element to appear
                    }}
                  >
                    Math could be boring!
                  </motion.h1>
                  
                  {/* Description with SLIDE IN FROM LEFT animation */}
                  <motion.p 
                    className="font-nunito text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed"
                    variants={slideInFromLeftVariants}
                    initial="hidden"
                    animate={hasLoaded && !hasTriggered ? "visible" : hasTriggered ? {
                      x: -1000,
                      y: -200,
                      rotate: -25,
                      scale: 0.4,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut", delay: 0.02 }
                    } : "hidden"}
                    exit={{
                      x: -1000,
                      y: -200,
                      rotate: -25,
                      scale: 0.4,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut", delay: 0.02 }
                    }}
                    transition={{
                      delay: 0.5 // Second element to appear
                    }}
                  >
                    Or it could help you build a treehouse, crush gaming rivals, and become a legend, while the rest remain bored and... clueless!
                  </motion.p>
                  
                  {/* Button with BOUNCE IN animation */}
                  <div className="flex justify-start">
                    <motion.button 
                      onClick={handleWatchClick}
                      className="font-barriecito group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 cursor-pointer"
                      variants={bounceInVariants}
                      initial="hidden"
                      animate={hasLoaded && !hasTriggered ? "visible" : hasTriggered ? {
                        x: -800,
                        y: 500,
                        rotate: -180,
                        scale: 0.2,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut", delay: 0.04 }
                      } : "hidden"}
                      exit={{
                        x: -800,
                        y: 500,
                        rotate: -180,
                        scale: 0.2,
                        opacity: 0,
                        transition: { duration: 0.5, ease: "easeInOut", delay: 0.04 }
                      }}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      transition={{
                        delay: 0.8 // Third element to appear
                      }}
                    >
                      <span>WATCH THIS</span>
                    </motion.button>
                  </div>
                </>
              )}
            </AnimatePresence>
          </div>

          {/* Right side - Characters image with SLIDE IN FROM RIGHT animation */}
          <div className="flex justify-center lg:justify-end">
            <AnimatePresence>
              {showElements && (
                <motion.div 
                  className="relative"
                  variants={slideInFromRightVariants}
                  initial="hidden"
                  animate={hasLoaded && !hasTriggered ? "visible" : hasTriggered ? {
                    x: 1000,
                    y: 600,
                    rotate: 360,
                    scale: 0.1,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeInOut", delay: 0.06 }
                  } : "hidden"}
                  exit={{
                    x: 1000,
                    y: 600,
                    rotate: 360,
                    scale: 0.1,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeInOut", delay: 0.06 }
                  }}
                  transition={{
                    delay: 1.1 // Last element to appear
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