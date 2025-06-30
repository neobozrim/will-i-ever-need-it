import React from 'react';
import { useSEO } from '../hooks/useSEO';
import Hero from '../components/Home/Hero';
import VideoBlock from '../components/Home/VideoBlock';
import FeaturedConcepts from '../components/Home/FeaturedConcepts';
import ConceptLibrary from '../components/Home/ConceptLibrary';

const HomePage: React.FC = () => {
  // Enhanced SEO optimization for home page with new description and keywords
  useSEO({
    title: 'Bored? Opposite! - Turn Boring Math Into Fun, Relatable Stories',
    description: 'At Bored?Opposite! we turn boring math into fun, relatable stories — from treehouses to slime factories. In the AI era, math is your edge. Is math boring? Opposite. It unlocks the future.',
    keywords: 'math education, real world math, quadratic equations, pythagorean theorem, probability, area calculations, volume calculations, proportional scaling, prime numbers, percentages, outliers, coordinate systems, unit rates, math applications, interactive learning, math games, AI era math, math stories, treehouse math, slime factory math, Maya AI tutor, math superpowers, boring math opposite',
    image: 'https://xjmktjcflmjrqbtofdjq.supabase.co/storage/v1/object/public/thumbnails//BoredOppoAndMaya.png',
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