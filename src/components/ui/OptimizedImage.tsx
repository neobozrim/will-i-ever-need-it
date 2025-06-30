import React, { useState, useRef, useEffect } from 'react';
import { cn } from '../../lib/utils';

interface OptimizedImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  fallbackSrc?: string;
  blurDataURL?: string;
  priority?: boolean;
  sizes?: string;
  quality?: number;
  className?: string;
}

const OptimizedImage: React.FC<OptimizedImageProps> = ({
  src,
  alt,
  fallbackSrc,
  blurDataURL,
  priority = false,
  sizes,
  quality = 75,
  className,
  onLoad,
  onError,
  ...props
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef<HTMLImageElement>(null);

  // Intersection Observer for lazy loading
  useEffect(() => {
    if (priority || isInView) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      {
        rootMargin: '50px',
        threshold: 0.1,
      }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority, isInView]);

  // Generate WebP and fallback sources
  const generateSources = (originalSrc: string) => {
    // If it's already a full URL, use as-is
    if (originalSrc.startsWith('http')) {
      return {
        webp: originalSrc,
        fallback: originalSrc,
      };
    }

    // For local images, we'd generate WebP versions
    // Since we're using external URLs, return the original
    return {
      webp: originalSrc,
      fallback: originalSrc,
    };
  };

  const sources = generateSources(src);

  const handleLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setIsLoaded(true);
    onLoad?.(e);
  };

  const handleError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    setHasError(true);
    if (fallbackSrc && imgRef.current) {
      imgRef.current.src = fallbackSrc;
    }
    onError?.(e);
  };

  // Blur placeholder while loading
  const blurStyle = blurDataURL && !isLoaded ? {
    backgroundImage: `url(${blurDataURL})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    filter: 'blur(10px)',
  } : {};

  return (
    <div className={cn('relative overflow-hidden', className)} style={blurStyle}>
      {isInView && (
        <picture>
          {/* WebP source for modern browsers */}
          <source srcSet={sources.webp} type="image/webp" sizes={sizes} />
          
          {/* Fallback for older browsers */}
          <img
            ref={imgRef}
            src={sources.fallback}
            alt={alt}
            className={cn(
              'transition-opacity duration-300',
              isLoaded ? 'opacity-100' : 'opacity-0',
              hasError && 'opacity-50'
            )}
            loading={priority ? 'eager' : 'lazy'}
            onLoad={handleLoad}
            onError={handleError}
            {...props}
          />
        </picture>
      )}
      
      {/* Loading placeholder */}
      {!isLoaded && !hasError && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
};

export default OptimizedImage;