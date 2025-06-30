import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

interface SEOProps {
  title?: string;
  description?: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

export const useSEO = ({
  title,
  description,
  keywords,
  image,
  url,
  type = 'website'
}: SEOProps = {}) => {
  const location = useLocation();

  useEffect(() => {
    // Enhanced default values with new description
    const defaultTitle = 'Bored? Opposite! - Turn Boring Math Into Fun, Relatable Stories';
    const defaultDescription = 'At Bored?Opposite! we turn boring math into fun, relatable stories — from treehouses to slime factories. In the AI era, math is your edge. Is math boring? Opposite. It unlocks the future.';
    const defaultImage = 'https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//BoredOppoAndMaya.png';
    const baseUrl = 'https://boredoppo.site';
    
    // Enhanced keywords including all math concepts
    const defaultKeywords = 'math education, real world math, quadratic equations, pythagorean theorem, probability, area calculations, volume calculations, proportional scaling, prime numbers, percentages, outliers, coordinate systems, unit rates, math applications, interactive learning, math games, AI era math, math stories, treehouse math, slime factory math, Maya AI tutor, math superpowers, boring math opposite';

    // Set document title
    document.title = title ? `${title} | Bored? Opposite!` : defaultTitle;

    // Update meta tags
    const updateMetaTag = (name: string, content: string, property = false) => {
      const attribute = property ? 'property' : 'name';
      let element = document.querySelector(`meta[${attribute}="${name}"]`) as HTMLMetaElement;
      
      if (!element) {
        element = document.createElement('meta');
        element.setAttribute(attribute, name);
        document.head.appendChild(element);
      }
      
      element.setAttribute('content', content);
    };

    // Basic meta tags
    updateMetaTag('description', description || defaultDescription);
    updateMetaTag('keywords', keywords ? `${keywords}, ${defaultKeywords}` : defaultKeywords);

    // Open Graph tags
    updateMetaTag('og:title', title || defaultTitle, true);
    updateMetaTag('og:description', description || defaultDescription, true);
    updateMetaTag('og:image', image || defaultImage, true);
    updateMetaTag('og:url', url || `${baseUrl}${location.pathname}`, true);
    updateMetaTag('og:type', type, true);
    updateMetaTag('og:image:alt', 'BoredOppo and Maya - Math learning characters from Bored? Opposite!', true);

    // Twitter tags
    updateMetaTag('twitter:title', title || defaultTitle, true);
    updateMetaTag('twitter:description', description || defaultDescription, true);
    updateMetaTag('twitter:image', image || defaultImage, true);
    updateMetaTag('twitter:image:alt', 'BoredOppo and Maya - Math learning characters from Bored? Opposite!', true);

    // Canonical URL
    let canonicalLink = document.querySelector('link[rel="canonical"]') as HTMLLinkElement;
    if (!canonicalLink) {
      canonicalLink = document.createElement('link');
      canonicalLink.rel = 'canonical';
      document.head.appendChild(canonicalLink);
    }
    canonicalLink.href = url || `${baseUrl}${location.pathname}`;

  }, [title, description, keywords, image, url, type, location.pathname]);
};