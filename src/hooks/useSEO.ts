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
    // Default values
    const defaultTitle = 'Bored? Opposite! - Real World Math That Actually Matters';
    const defaultDescription = 'Transform boring math into empire-building adventures! Learn quadratic equations, Pythagorean theorem, probability, and more through real-world applications.';
    const defaultImage = 'https://boredoppo.site/og-image.png';
    const baseUrl = 'https://boredoppo.site';

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
    if (keywords) updateMetaTag('keywords', keywords);

    // Open Graph tags
    updateMetaTag('og:title', title || defaultTitle, true);
    updateMetaTag('og:description', description || defaultDescription, true);
    updateMetaTag('og:image', image || defaultImage, true);
    updateMetaTag('og:url', url || `${baseUrl}${location.pathname}`, true);
    updateMetaTag('og:type', type, true);

    // Twitter tags
    updateMetaTag('twitter:title', title || defaultTitle, true);
    updateMetaTag('twitter:description', description || defaultDescription, true);
    updateMetaTag('twitter:image', image || defaultImage, true);

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