// ============================================================================
// FILE: /src/components/sections/ExteriorFeatures.jsx
// ============================================================================
import React, { useState, useEffect } from 'react';
import Tooltip from '../common/Tooltip';
import FeatureModal from '../common/FeatureModal';
import './ExteriorFeatures.css';

// Feature data
const exteriorFeaturesData = [
  {
    id: 1,
    title: "Signature LED Lights",
    description: "The LED Daytime Running Lights (DRL) and the high-precision headlamps not only give a bold and modern look but also provide the best visibility and safety in all weather conditions.",
    image: "/images/exterior-features/led-light.png",
    position: { top: "51.5%", right: "27.5%" }
  },
  {
    id: 2,
    title: "High-Performance Disc Brake System",
    description: "Engineered for precision and reliability, this advanced disc brake system delivers superior stopping power and heat dissipation.",
    image: "/images/exterior-features/disc-brake.png",
    position: { top: "78.4%", right: "41.3%" }
  },
  {
    id: 3,
    title: "Spacious Cargo Carrier",
    description: "The rear carrier is well-designed to handle a great deal of weight—up to 1495 kg, thereby allowing for bigger and smarter daily deliveries.",
    image: "/images/exterior-features/cargo-carrier.png",
    position: { top: "48.1%", left: "23.1%" }
  },
  {
    id: 4,
    title: "Striking Front Design",
    description: "The futuristic grille and the aerodynamic front fascia create a striking and modern look while ensuring maximum airflow, road presence, and style, and accentuating the confidence of next-generation mobility.",
    image: "/images/exterior-features/front-design.png",
    position: { top: "56.5%", right: "14.9%" }
  }
];

const ExteriorFeatures = () => {
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
    if (activeIndex < exteriorFeaturesData.length - 1) {
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
    <section className="exterior-features">
      <div className="exterior-features__container">
        <div className="exterior-features__header">
          <h2 className="exterior-features__title">The Spectrum Of Exterior Refined</h2>
          <p className="exterior-features__subtitle">
            Tune-in to the dynamic exterior successfully integrating aerodynamic efficiency with bold
            geometric styling, creating a commanding presence while ensuring durability on Indian roads.
          </p>
        </div>
      

      <div className="exterior-features__image-container">
        <img 
          src="/images/exterior-features/main.png"
          alt="Electric Vehicle Exterior"
          className="exterior-features__image"
        />
        
        {exteriorFeaturesData.map((feature, index) => (
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
        feature={activeIndex !== null ? exteriorFeaturesData[activeIndex] : null}
        onClose={handleCloseModal}
        onNext={handleNext}
        onPrev={handlePrev}
        canGoNext={activeIndex < exteriorFeaturesData.length - 1}
        canGoPrev={activeIndex > 0}
      />
    </section>
  );
};

export default ExteriorFeatures;