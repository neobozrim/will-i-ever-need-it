import React from 'react';
import { useSEO } from '../hooks/useSEO';
import Hero from '../components/Home/Hero';
import VideoBlock from '../components/Home/VideoBlock';
import FeaturedConcepts from '../components/Home/FeaturedConcepts';
import ConceptLibrary from '../components/Home/ConceptLibrary';

const HomePage: React.FC = () => {
  // SEO optimization for home page
  useSEO({
    title: 'Bored? Opposite! - Real World Math That Actually Matters',
    description: 'Transform boring math into empire-building adventures! Learn quadratic equations, Pythagorean theorem, probability, and more through real-world applications that help you crush rivals and become legendary.',
    keywords: 'math education, real world math, quadratic equations, pythagorean theorem, probability, math applications, interactive learning, math games, Maya AI tutor',
    image: 'https://boredoppo.site/og-image.png',
    url: 'https://boredoppo.site/',
    type: 'website'
  });

  return (
    <div>
      <Hero />
      <VideoBlock />
      <FeaturedConcepts />
      <ConceptLibrary />
    </div>
  );
};

export default HomePage;