// ============================================================================
// FILE: /src/components/common/FeatureSection.js
// ============================================================================
import React, { useState, useEffect } from 'react';
import Tooltip from '../common/Tooltip';
import FeatureModal from '../common/FeatureModal';
import './FeatureSection.css';

const FeatureSection = ({ data }) => {
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
    if (activeIndex < data.features.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  const handlePrev = () => {
    if (activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    }
  };

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
    <section className="feature-section">
      <div className="feature-section__container">
        <div className="feature-section__header">
          <h2 className="feature-section__title">{data.title}</h2>
          <p className="feature-section__subtitle">{data.subtitle}</p>
        </div>

        <div className="feature-section__image-container">
          <img 
            src={data.image}
            alt='feature-main'
            className="feature-section__image"
          />
          
          {data.features.map((feature, index) => (
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
        feature={activeIndex !== null ? data.features[activeIndex] : null}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrev={handlePrev}
        canGoNext={activeIndex < data.features.length - 1}
        canGoPrev={activeIndex > 0}
      />
    </section>
  );
};

export default FeatureSection;