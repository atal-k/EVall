// ============================================================================
// FILE: /src/components/sections/InteriorFeatures.js
// ============================================================================
import React, { useState, useEffect } from 'react';
import Tooltip from '../common/Tooltip';
import FeatureModal from '../common/FeatureModal';
import './InteriorFeatures.css';

// Feature data
const interiorFeaturesData = [
    {
      id: 1,
      title: "High-Resolution Driving Interface",
      description: "Real-time statistical visualization delivers precise metrics on velocity, battery voltage, system health, and range, empowering operators with actionable data.",
      image: "/images/interior-features/speedometer.jpg",
      position: { top: "37.6%", right: "39.4%" }
    },
    {
      id: 2,
      title: "Multifunction Steering Wheel",
      description: "Control audio, calls, and connectivity without taking your hands off the wheel.",
      image: "/images/interior-features/steering.jpg",
      position: { top: "56.5%", right: "14.9%" }
    },
    {
      id: 3,
      title: "Climate Precision Control",
      description: "Experience smart weather control system that adapts instantly, allowing you to fine-tune your ideal cabin climate.",
      image: "/images/interior-features/dashboard.jpg",
      position: { top: "48.1%", left: "23.1%" }
    }
  ];
  

const InteriorFeatures = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleTooltipClick = (index) => {
    setActiveIndex(index);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setTimeout(() => setActiveIndex(null), 300);
  };

  const handleNext = () => {
    if (activeIndex < interiorFeaturesData.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isModalOpen) return;
      
      if (e.key === 'Escape') handleCloseModal();
      if (e.key === 'ArrowRight') handleNext();
      if (e.key === 'ArrowLeft') handlePrev();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isModalOpen, activeIndex]);

  return (
    <section className="interior-features">
      <div className="interior-features__container">
        <div className="interior-features__header">
        <h2 className="interior-features__title">Commanding From Infotainment to Aesthetics</h2>
        <p className="interior-features__subtitle">
        Designed to deliver a perfect blend of comfort, functionality, and advanced technology. Inside, you’ll find
        a spacious cabin with premium-quality fabric seats, ergonomically crafted for long hours of driving.
        </p>
        </div>
      

      <div className="interior-features__image-container">
        <img 
          src="/images/interior-features/main.png"
          alt="Electric Vehicle Interior"
          className="interior-features__image"
        />
        
        {interiorFeaturesData.map((feature, index) => (
          <Tooltip
            key={feature.id}
            position={feature.position}
            index={index + 1}
            isActive={activeIndex === index}
            onClick={() => handleTooltipClick(index)}
          />
        ))}
      </div>
      </div>

      <FeatureModal
        isOpen={isModalOpen}
        feature={activeIndex !== null ? interiorFeaturesData[activeIndex] : null}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrev={handlePrev}
        canGoNext={activeIndex < interiorFeaturesData.length - 1}
        canGoPrev={activeIndex > 0}
      />
    </section>
  );
};

export default InteriorFeatures;