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

  // Mathematical components data with flowing patterns
  const mathComponents = [
    // Left to Right Flow - Top Row
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2010triangle.svg",
      alt: "Triangle",
      size: "w-8 h-8",
      startX: -200,
      startY: 100,
      endX: typeof window !== 'undefined' ? window.innerWidth + 200 : 1400,
      endY: 120,
      duration: 25,
      delay: 0
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2012PYTHAGOR-F.svg",
      alt: "Pythagorean Formula",
      size: "w-16 h-8",
      startX: -300,
      startY: 150,
      endX: typeof window !== 'undefined' ? window.innerWidth + 300 : 1500,
      endY: 180,
      duration: 30,
      delay: 5
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2013DISTANCE-F.svg",
      alt: "Distance Formula",
      size: "w-14 h-7",
      startX: -250,
      startY: 200,
      endX: typeof window !== 'undefined' ? window.innerWidth + 250 : 1450,
      endY: 160,
      duration: 28,
      delay: 10
    },
    
    // Right to Left Flow - Middle Row
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2014QUADRATIC-F.svg",
      alt: "Quadratic Formula",
      size: "w-18 h-8",
      startX: typeof window !== 'undefined' ? window.innerWidth + 200 : 1400,
      startY: 250,
      endX: -200,
      endY: 280,
      duration: 32,
      delay: 2
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%2015PERC-CHANGE-F.svg",
      alt: "Percentage Change",
      size: "w-16 h-7",
      startX: typeof window !== 'undefined' ? window.innerWidth + 300 : 1500,
      startY: 300,
      endX: -300,
      endY: 320,
      duration: 35,
      delay: 7
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%201611.svg",
      alt: "Number 11",
      size: "w-8 h-10",
      startX: typeof window !== 'undefined' ? window.innerWidth + 150 : 1350,
      startY: 350,
      endX: -150,
      endY: 370,
      duration: 26,
      delay: 12
    },
    
    // Diagonal Flow - Top Left to Bottom Right
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%201713.svg",
      alt: "Number 13",
      size: "w-8 h-10",
      startX: -150,
      startY: 80,
      endX: typeof window !== 'undefined' ? window.innerWidth + 150 : 1350,
      endY: 400,
      duration: 40,
      delay: 3
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%201817.svg",
      alt: "Number 17",
      size: "w-8 h-10",
      startX: -200,
      startY: 120,
      endX: typeof window !== 'undefined' ? window.innerWidth + 200 : 1400,
      endY: 450,
      duration: 38,
      delay: 8
    },
    
    // Diagonal Flow - Top Right to Bottom Left
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%201919.svg",
      alt: "Number 19",
      size: "w-8 h-10",
      startX: typeof window !== 'undefined' ? window.innerWidth + 150 : 1350,
      startY: 80,
      endX: -150,
      endY: 400,
      duration: 42,
      delay: 4
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%201cube.svg",
      alt: "Cube",
      size: "w-12 h-12",
      startX: typeof window !== 'undefined' ? window.innerWidth + 200 : 1400,
      startY: 120,
      endX: -200,
      endY: 450,
      duration: 36,
      delay: 9
    },
    
    // Left to Right Flow - Bottom Row
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%202cone.svg",
      alt: "Cone",
      size: "w-10 h-12",
      startX: -180,
      startY: 400,
      endX: typeof window !== 'undefined' ? window.innerWidth + 180 : 1380,
      endY: 420,
      duration: 33,
      delay: 6
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%203cylinder.svg",
      alt: "Cylinder",
      size: "w-10 h-12",
      startX: -220,
      startY: 450,
      endX: typeof window !== 'undefined' ? window.innerWidth + 220 : 1420,
      endY: 480,
      duration: 29,
      delay: 11
    },
    
    // Right to Left Flow - Various Heights
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%204sphere.svg",
      alt: "Sphere",
      size: "w-11 h-11",
      startX: typeof window !== 'undefined' ? window.innerWidth + 180 : 1380,
      startY: 180,
      endX: -180,
      endY: 200,
      duration: 31,
      delay: 1
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%205heart.svg",
      alt: "Heart",
      size: "w-10 h-10",
      startX: typeof window !== 'undefined' ? window.innerWidth + 160 : 1360,
      startY: 380,
      endX: -160,
      endY: 400,
      duration: 27,
      delay: 13
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%206diamond.svg",
      alt: "Diamond",
      size: "w-10 h-10",
      startX: typeof window !== 'undefined' ? window.innerWidth + 140 : 1340,
      startY: 220,
      endX: -140,
      endY: 240,
      duration: 34,
      delay: 14
    },
    
    // More Diagonal Flows
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%208rectangle.svg",
      alt: "Rectangle",
      size: "w-12 h-8",
      startX: -170,
      startY: 300,
      endX: typeof window !== 'undefined' ? window.innerWidth + 170 : 1370,
      endY: 150,
      duration: 37,
      delay: 15
    },
    {
      src: "https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//Asset%209trappezoid.svg",
      alt: "Trapezoid",
      size: "w-12 h-8",
      startX: typeof window !== 'undefined' ? window.innerWidth + 170 : 1370,
      startY: 300,
      endX: -170,
      endY: 150,
      duration: 39,
      delay: 16
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-white py-20 lg:py-32 overflow-hidden">
      {/* Flowing Mathematical Components Pattern - Behind everything */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <AnimatePresence>
          {showElements && mathComponents.map((component, index) => (
            <motion.div
              key={index}
              className="absolute opacity-15 hover:opacity-25 transition-opacity duration-500"
              initial={{ 
                x: component.startX,
                y: component.startY,
                opacity: 0,
                scale: 0.8
              }}
              animate={hasTriggered ? {
                // Scatter in random directions when scroll triggers
                x: Math.random() * 2000 - 1000,
                y: Math.random() * 1000 - 500,
                rotate: Math.random() * 720 - 360,
                scale: 0,
                opacity: 0,
                transition: { 
                  duration: 0.6, 
                  ease: "easeInOut", 
                  delay: index * 0.05 
                }
              } : {
                // Continuous flowing animation - NO ROTATION
                x: [component.startX, component.endX],
                y: [component.startY, component.endY],
                opacity: [0, 0.15, 0.15, 0],
                scale: [0.8, 1, 1, 0.8],
                transition: {
                  duration: component.duration,
                  repeat: Infinity,
                  ease: "linear",
                  delay: component.delay,
                  opacity: {
                    duration: component.duration,
                    times: [0, 0.1, 0.9, 1],
                    ease: "easeInOut"
                  },
                  scale: {
                    duration: component.duration,
                    times: [0, 0.1, 0.9, 1],
                    ease: "easeInOut"
                  }
                }
              }}
              exit={{
                x: Math.random() * 2000 - 1000,
                y: Math.random() * 1000 - 500,
                rotate: Math.random() * 720 - 360,
                scale: 0,
                opacity: 0,
                transition: { 
                  duration: 0.6, 
                  ease: "easeInOut", 
                  delay: index * 0.05 
                }
              }}
            >
              <img
                src={component.src}
                alt={component.alt}
                className={`${component.size} object-contain filter drop-shadow-sm`}
                onError={(e) => {
                  // Hide component if image fails to load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

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