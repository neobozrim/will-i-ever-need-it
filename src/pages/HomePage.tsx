import React from 'react';
import Hero from '../components/Home/Hero';
import VideoBlock from '../components/Home/VideoBlock';
import FeaturedConcepts from '../components/Home/FeaturedConcepts';
import ConceptLibrary from '../components/Home/ConceptLibrary';

const HomePage: React.FC = () => {
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