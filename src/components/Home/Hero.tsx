import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

const Hero: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [hasTriggered, setHasTriggered] = useState(false);
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
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasTriggered]);

  // Reset when scrolling back to top - also more sensitive
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      if (latest < 0.001 && hasTriggered) {
        setHasTriggered(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasTriggered]);

  // Handle "WATCH THIS" button click - FIXED: Smooth scroll without auto-play
  const handleWatchClick = () => {
    // Find the video section and scroll to it smoothly
    const videoSection = document.querySelector('[data-video-section]');
    if (videoSection) {
      videoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
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

  // JINGLE ANIMATION VARIANTS - Playful wiggle and bounce effects
  const jingleVariants = {
    idle: {
      x: [0, -2, 2, -1, 1, 0],
      y: [0, -1, 1, -0.5, 0.5, 0],
      rotate: [0, -1, 1, -0.5, 0.5, 0],
      scale: [1, 1.02, 0.98, 1.01, 0.99, 1],
      transition: {
        duration: 2.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    }
  };

  const buttonJingleVariants = {
    idle: {
      x: [0, -1, 1, -0.5, 0.5, 0],
      y: [0, -2, 1, -1, 0.5, 0],
      rotate: [0, -0.5, 0.5, -0.3, 0.3, 0],
      scale: [1, 1.05, 0.95, 1.03, 0.97, 1],
      transition: {
        duration: 3,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: 0.5, // Offset from heading
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
      }
    }
  };

  const imageJingleVariants = {
    idle: {
      x: [0, 1, -1, 0.5, -0.5, 0],
      y: [0, -1, 2, -1.5, 1, 0],
      rotate: [0, 0.5, -0.5, 0.3, -0.3, 0],
      scale: [1, 1.03, 0.97, 1.02, 0.98, 1],
      transition: {
        duration: 3.5,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        delay: 1, // Offset from other elements
        times: [0, 0.2, 0.4, 0.6, 0.8, 1]
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
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </a>
      </div>

      {/* ANIMATED COLOR MIXING BACKGROUND - Starts immediately on page load */}
      <motion.div 
        className="absolute inset-0 pointer-events-none overflow-hidden z-0"
        animate={{
          background: [
            'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15), rgba(251, 146, 60, 0.15))',
            'linear-gradient(135deg, rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15), rgba(251, 146, 60, 0.15), rgba(34, 197, 94, 0.15))',
            'linear-gradient(225deg, rgba(236, 72, 153, 0.15), rgba(251, 146, 60, 0.15), rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.15))',
            'linear-gradient(315deg, rgba(251, 146, 60, 0.15), rgba(34, 197, 94, 0.15), rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15))',
            'linear-gradient(45deg, rgba(59, 130, 246, 0.15), rgba(147, 51, 234, 0.15), rgba(236, 72, 153, 0.15), rgba(251, 146, 60, 0.15))'
          ]
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "easeInOut",
          repeatType: "loop"
        }}
        style={{
          willChange: 'background'
        }}
      />

      {/* CLEAN PULSING BACKGROUND IMAGE - No opacity changes, just scale */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden z-[1]">
        <motion.div 
          className="absolute inset-0 w-full h-full flex items-center justify-center"
          animate={{
            scale: [1, 1.03, 1], // Subtle scale animation only
          }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: "easeInOut",
            repeatType: "loop"
          }}
          style={{
            transform: 'none',
            willChange: 'transform'
          }}
        >
          <img 
            src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2023banner2.svg"
            alt="Mathematical background pattern"
            className="w-full h-full object-cover opacity-20" // Fixed opacity, no animation
            style={{
              minWidth: '110vw',
              minHeight: '110vh',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
            onError={(e) => {
              console.error('Failed to load Asset 23banner2.svg');
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </motion.div>
      </div>

      {/* Content positioned lower with proper spacing */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 h-full flex items-end pb-20 pt-32 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left content */}
          <div className="text-left">
            {/* Heading with DROP IN animation + JINGLE - ALWAYS RENDERED */}
            <motion.h1 
              className="font-barriecito text-3xl md:text-5xl lg:text-6xl text-gray-900 mb-8 leading-tight"
              variants={dropInVariants}
              initial="hidden"
              animate={
                !hasLoaded ? "hidden" :
                hasTriggered ? {
                  x: -1200,
                  y: -600,
                  rotate: -45,
                  scale: 0.3,
                  opacity: 0,
                  transition: { duration: 0.5, ease: "easeInOut" }
                } : ["visible", "idle"]
              }
              transition={{
                delay: 0.2
              }}
              style={{
                willChange: 'transform'
              }}
            >
              <motion.span
                variants={jingleVariants}
                animate={hasLoaded && !hasTriggered ? "idle" : ""}
              >
                Math could be boring!
              </motion.span>
            </motion.h1>
            
            {/* Description with SLIDE IN FROM LEFT animation - ALWAYS RENDERED */}
            <motion.p 
              className="font-nunito text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed"
              variants={slideInFromLeftVariants}
              initial="hidden"
              animate={
                !hasLoaded ? "hidden" :
                hasTriggered ? {
                  x: -1000,
                  y: -200,
                  rotate: -25,
                  scale: 0.4,
                  opacity: 0,
                  transition: { duration: 0.5, ease: "easeInOut", delay: 0.02 }
                } : "visible"
              }
              transition={{
                delay: 0.5
              }}
            >
              Or it could help you build a treehouse, crush gaming rivals, and become a legend, while the rest remain bored and... clueless!
            </motion.p>
            
            {/* Button with BOUNCE IN animation + JINGLE - ALWAYS RENDERED */}
            <div className="flex justify-start">
              <motion.button 
                onClick={handleWatchClick}
                className="font-barriecito group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 cursor-pointer"
                variants={bounceInVariants}
                initial="hidden"
                animate={
                  !hasLoaded ? "hidden" :
                  hasTriggered ? {
                    x: -800,
                    y: 500,
                    rotate: -180,
                    scale: 0.2,
                    opacity: 0,
                    transition: { duration: 0.5, ease: "easeInOut", delay: 0.04 }
                  } : ["visible", "idle"]
                }
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{
                  delay: 0.8
                }}
                style={{
                  willChange: 'transform'
                }}
              >
                <motion.span
                  variants={buttonJingleVariants}
                  animate={hasLoaded && !hasTriggered ? "idle" : ""}
                >
                  WATCH THIS
                </motion.span>
              </motion.button>
            </div>
          </div>

          {/* Right side - BoredOppo and Maya characters with SLIDE IN FROM RIGHT animation + JINGLE - ALWAYS RENDERED */}
          <div className="flex justify-center lg:justify-end">
            <motion.div 
              className="relative"
              variants={slideInFromRightVariants}
              initial="hidden"
              animate={
                !hasLoaded ? "hidden" :
                hasTriggered ? {
                  x: 1000,
                  y: 600,
                  rotate: 360,
                  scale: 0.1,
                  opacity: 0,
                  transition: { duration: 0.5, ease: "easeInOut", delay: 0.06 }
                } : ["visible", "idle"]
              }
              transition={{
                delay: 1.1
              }}
              style={{
                willChange: 'transform'
              }}
            >
              <motion.img 
                src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//BoredOppoAndMaya.png" 
                alt="BoredOppo and Maya - Math learning characters"
                className="w-80 h-96 lg:w-96 lg:h-[450px] object-contain transform hover:scale-105 transition-transform duration-300"
                variants={imageJingleVariants}
                animate={hasLoaded && !hasTriggered ? "idle" : ""}
                onError={(e) => {
                  console.error('Failed to load BoredOppoAndMaya.png image');
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://images.pexels.com/photos/8197528/pexels-photo-8197528.jpeg?auto=compress&cs=tinysrgb&w=400';
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