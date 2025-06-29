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
                  
                  {/* Decorative elements with idle animations and fly-away triggers - FIFTH & SIXTH TO GO */}
                  <motion.div 
                    className="absolute -top-4 -right-4 w-8 h-8 bg-yellow-400 rounded-full"
                    initial={{ scale: 1, rotate: 0, opacity: 1 }}
                    animate={hasTriggered ? {
                      x: 800,
                      y: -300,
                      rotate: 720,
                      scale: 0,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut", delay: 0.08 } // Tiny delay
                    } : { 
                      scale: [1, 1.2, 1],
                      rotate: [0, 10, 0],
                      transition: { 
                        duration: 2, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut"
                      }
                    }}
                    exit={{
                      x: 800,
                      y: -300,
                      rotate: 720,
                      scale: 0,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut", delay: 0.08 }
                    }}
                  />
                  <motion.div 
                    className="absolute -bottom-6 -left-6 w-6 h-6 bg-pink-400 rounded-full"
                    initial={{ scale: 1, rotate: 0, opacity: 1 }}
                    animate={hasTriggered ? {
                      x: 600,
                      y: 800,
                      rotate: -540,
                      scale: 0,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 } // Tiny delay
                    } : { 
                      scale: [1, 1.3, 1],
                      rotate: [0, -15, 0],
                      transition: { 
                        duration: 1.5, 
                        repeat: Infinity, 
                        repeatType: "reverse",
                        ease: "easeInOut",
                        delay: 0.5
                      }
                    }}
                    exit={{
                      x: 600,
                      y: 800,
                      rotate: -540,
                      scale: 0,
                      opacity: 0,
                      transition: { duration: 0.5, ease: "easeInOut", delay: 0.1 }
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