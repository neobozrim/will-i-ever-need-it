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

  // FIXED: Much less sensitive scroll triggers - better mobile experience
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // FIXED: Trigger at 10% scroll instead of 0.2% - much less sensitive
      if (latest > 0.1 && !hasTriggered) {
        setHasTriggered(true);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasTriggered]);

  // FIXED: More responsive return trigger - 5% instead of 0.1%
  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latest) => {
      // FIXED: Return when hero is 5% visible instead of 0.1%
      if (latest < 0.05 && hasTriggered) {
        setHasTriggered(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress, hasTriggered]);

  // FIXED: Handle "WATCH THIS" button click - Scroll AND auto-play video
  const handleWatchClick = () => {
    // Find the video section and scroll to it smoothly
    const videoSection = document.querySelector('[data-video-section]');
    if (videoSection) {
      videoSection.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      
      // FIXED: Auto-play video after scrolling
      setTimeout(() => {
        // Find the video thumbnail and trigger click to auto-play
        const videoThumbnail = videoSection.querySelector('[data-video-thumbnail]');
        if (videoThumbnail) {
          (videoThumbnail as HTMLElement).click();
        }
      }, 800); // Wait for scroll to complete before auto-playing
    }
  };

  // UNIFIED: Entry animation variants using consistent structure
  const entryVariants = {
    heading: {
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
          mass: 0.8,
          delay: 0.2
        }
      }
    },
    description: {
      hidden: { 
        x: -200, 
        y: 0,
        opacity: 0, 
        scale: 0.9,
        rotate: -5
      },
      visible: { 
        x: 0, 
        y: 0,
        opacity: 1, 
        scale: 1,
        rotate: 0,
        transition: {
          type: "spring",
          damping: 15,
          stiffness: 120,
          mass: 1,
          delay: 0.5
        }
      }
    },
    button: {
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
          stiffness: 180, // INCREASED: Faster spring for quicker return
          mass: 0.4, // REDUCED: Lighter mass for faster movement
          delay: 0.3 // REDUCED: From 0.8 to 0.3 for much faster appearance
        }
      }
    },
    image: {
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
          stiffness: 140, // INCREASED: Faster spring for quicker return
          mass: 0.6, // REDUCED: Lighter mass for faster movement
          delay: 0.4 // REDUCED: From 1.1 to 0.4 for much faster appearance
        }
      }
    }
  };

  // TEXT JIGGLE ANIMATION - Aggressive for heading text
  const textJiggleVariants = {
    idle: {
      x: [0, -4, 4, -3, 3, -2, 2, 0],
      y: [0, -3, 3, -2, 2, -1, 1, 0],
      rotate: [0, -1.5, 1.5, -1, 1, -0.5, 0.5, 0],
      scale: [1, 1.03, 0.97, 1.02, 0.98, 1.01, 0.99, 1],
      transition: {
        duration: 4,
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1]
      }
    }
  };

  // IMAGE JIGGLE ANIMATION - Subtle and natural for character portrait
  const imageJiggleVariants = {
    idle: {
      // SUBTLE: Much smaller movements appropriate for an image
      x: [0, -2, 2, -1.5, 1.5, -1, 1, 0], // Reduced from 4px to 2px max
      y: [0, -1.5, 1.5, -1, 1, -0.5, 0.5, 0], // Reduced from 3px to 1.5px max
      rotate: [0, -0.8, 0.8, -0.6, 0.6, -0.4, 0.4, 0], // Reduced from 1.5deg to 0.8deg max
      scale: [1, 1.015, 0.985, 1.01, 0.99, 1.005, 0.995, 1], // Much subtler scaling
      transition: {
        duration: 5, // Slightly slower for more graceful movement
        repeat: Infinity,
        repeatType: "loop",
        ease: "easeInOut",
        times: [0, 0.14, 0.28, 0.42, 0.56, 0.7, 0.84, 1]
      }
    }
  };

  // FIXED: Unified animation state logic with predictable exit paths
  const getAnimationState = (element: 'heading' | 'description' | 'button' | 'image') => {
    if (!hasLoaded) return "hidden";
    
    if (hasTriggered) {
      // FIXED: Exit animations with explicit, predictable paths
      const exitAnimations = {
        heading: {
          x: -1200,
          y: -600,
          rotate: -45,
          scale: 0.3,
          opacity: 0,
          transition: { 
            type: "tween",
            duration: 0.6, 
            ease: "easeIn"
          }
        },
        description: {
          x: -1000,
          y: -200,
          rotate: -25,
          scale: 0.4,
          opacity: 0,
          transition: { 
            type: "tween",
            duration: 0.6, 
            ease: "easeIn", 
            delay: 0.05 
          }
        },
        button: {
          x: -800,
          y: 500,
          rotate: -180,
          scale: 0.2,
          opacity: 0,
          transition: { 
            type: "tween",
            duration: 0.6, 
            ease: "easeIn", 
            delay: 0.1 
          }
        },
        image: {
          x: 1000,
          y: 600,
          rotate: 360,
          scale: 0.1,
          opacity: 0,
          transition: { 
            type: "tween",
            duration: 0.6, 
            ease: "easeIn", 
            delay: 0.15 
          }
        }
      };
      
      return exitAnimations[element];
    }
    
    // Return to visible state using variants
    return "visible";
  };

  return (
    <section ref={containerRef} className="relative bg-white py-20 lg:py-32 overflow-hidden min-h-screen">
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

      {/* STABLE BACKGROUND IMAGE - Fixed positioning to prevent layout shifts */}
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
            willChange: 'transform'
          }}
        >
          <img 
            src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Hero-underlying-banner.svg"
            alt="Mathematical background pattern"
            className="w-full h-full object-cover opacity-20"
            style={{
              minWidth: '110vw',
              minHeight: '110vh',
              objectFit: 'cover',
              objectPosition: 'center center',
            }}
            onError={(e) => {
              console.error('Failed to load Hero-underlying-banner.svg');
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </motion.div>
      </div>

      {/* Bolt Banner - FIXED POSITIONING: 80px below the sign-in button */}
      <div className="absolute top-24 right-4 sm:right-6 lg:right-8 z-[100]">
        <a 
          href="https://bolt.new/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="block hover:scale-105 transition-transform duration-300"
        >
          <img 
            src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//white_circle_360x360%20(2).png"
            alt="Built with Bolt - Click to visit bolt.new"
            className="w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 lg:w-28 lg:h-28 object-contain opacity-80 hover:opacity-100 transition-opacity duration-300 cursor-pointer"
            onError={(e) => {
              console.error('Failed to load white circle image');
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
            }}
          />
        </a>
      </div>

      {/* Content positioned lower with proper spacing */}
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 z-10 h-full flex items-end pb-20 pt-32 lg:pt-40">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center w-full">
          {/* Left content */}
          <div className="text-left">
            {/* FIXED: Heading with unified animation variants */}
            <motion.div
              variants={entryVariants.heading}
              initial="hidden"
              animate={getAnimationState('heading')}
              style={{
                willChange: 'transform'
              }}
            >
              <motion.h1 
                className="font-barriecito text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-gray-900 mb-8 leading-tight"
                variants={textJiggleVariants}
                animate={hasLoaded && !hasTriggered ? "idle" : ""}
                style={{
                  fontFamily: "'Barriecito', cursive !important"
                }}
              >
                Math could be boring...
              </motion.h1>
            </motion.div>
            
            {/* FIXED: Description with unified animation variants */}
            <motion.p 
              className="font-nunito text-xl md:text-2xl text-gray-600 mb-8 max-w-4xl leading-relaxed"
              variants={entryVariants.description}
              initial="hidden"
              animate={getAnimationState('description')}
              style={{
                willChange: 'transform'
              }}
            >
              Or it could help you build a treehouse, crush gaming rivals, and become a legend, while the rest remain bored and... clueless!
            </motion.p>
            
            {/* FIXED: Button with unified animation variants and FASTER return */}
            <div className="flex justify-start">
              <motion.button 
                onClick={handleWatchClick}
                className="font-barriecito group bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-xl text-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 flex items-center space-x-2 cursor-pointer"
                variants={entryVariants.button}
                initial="hidden"
                animate={getAnimationState('button')}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                style={{
                  willChange: 'transform'
                }}
              >
                WATCH THIS
              </motion.button>
            </div>
          </div>

          {/* FIXED: Right side with unified animation variants and FASTER return */}
          <div className="flex justify-center lg:justify-end relative">
            <motion.div 
              className="relative"
              variants={entryVariants.image}
              initial="hidden"
              animate={getAnimationState('image')}
              style={{
                willChange: 'transform'
              }}
            >
              {/* OPTIMIZED: Hero image with subtle, image-appropriate jiggle animation */}
              <motion.img 
                src="https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//BoredOppoAndMaya.png" 
                alt="BoredOppo and Maya - Math learning characters"
                className="w-80 h-96 lg:w-96 lg:h-[450px] object-contain transform hover:scale-105 transition-transform duration-300"
                variants={imageJiggleVariants}
                animate={hasLoaded && !hasTriggered ? "idle" : ""}
                style={{
                  willChange: 'transform'
                }}
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