import React, { useState } from 'react';
import Hero from '../components/Home/Hero';
import VideoBlock from '../components/Home/VideoBlock';
import FeaturedConcepts from '../components/Home/FeaturedConcepts';
import ConceptLibrary from '../components/Home/ConceptLibrary';
import ConceptOverlay from '../components/Home/ConceptOverlay';
import { MathConcept } from '../types';

const HomePage: React.FC = () => {
  const [selectedConcept, setSelectedConcept] = useState<MathConcept | null>(null);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);

  const handleOpenOverlay = (concept: MathConcept) => {
    setSelectedConcept(concept);
    setIsOverlayOpen(true);
  };

  const handleCloseOverlay = () => {
    setIsOverlayOpen(false);
    setSelectedConcept(null);
  };

  return (
    <div>
      <Hero />
      <VideoBlock />
      <FeaturedConcepts onOpenOverlay={handleOpenOverlay} />
      <ConceptLibrary />
      
      {/* Shared Concept Overlay */}
      <ConceptOverlay
        concept={selectedConcept}
        isOpen={isOverlayOpen}
        onClose={handleCloseOverlay}
      />
    </div>
  );
};

export default HomePage;