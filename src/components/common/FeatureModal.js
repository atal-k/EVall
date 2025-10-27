// ============================================================================
// FILE: /src/components/common/FeatureModal.js
// ============================================================================

import React, { useState, useEffect, useRef } from 'react';
import './FeatureModal.css';

// Simple SVG Icons
const X = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <line x1="18" y1="6" x2="6" y2="18"/>
    <line x1="6" y1="6" x2="18" y2="18"/>
  </svg>
);

const LeftIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="15 18 9 12 15 6"/>
  </svg>
);

const RightIcon = () => (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
    <polyline points="9 18 15 12 9 6"/>
  </svg>
);

const FeatureModal = ({ 
  isOpen, 
  feature, 
  onClose, 
  onNext, 
  onPrev, 
  canGoNext, 
  canGoPrev 
}) => {
  const modalRef = useRef(null);
  const [isClosing, setIsClosing] = useState(false); // ADD THIS

  // UPDATE: Handle close with animation
  const handleClose = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 300); // Match slideOut duration
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (modalRef.current && !modalRef.current.contains(e.target) && isOpen) {
        handleClose(); // USE handleClose instead of onClose
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!feature) return null;


  return (
    <>
      <div className={`feature-modal-backdrop ${isOpen && !isClosing ? 'feature-modal-backdrop--visible' : ''}`} />
      
      <div 
        ref={modalRef}
        className={`feature-modal ${isOpen && !isClosing ? 'feature-modal--open' : ''} ${isClosing ? 'feature-modal--closing' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        {/* Image with overlaid controls */}
        <div className="feature-modal__image-wrapper">
          <img 
            src={feature.image} 
            alt={feature.title}
            className="feature-modal__image"
          />
          
          {/* Close button - top right */}
          <button 
            className="feature-modal__icon-btn feature-modal__icon-btn--close" 
            onClick={handleClose}
            aria-label="Close modal"
          >
            <X />
          </button>

          {/* Previous button - left side */}
          <button 
            className="feature-modal__icon-btn feature-modal__icon-btn--prev"
            onClick={onPrev}
            disabled={!canGoPrev}
            aria-label="Previous feature"
          >
            <LeftIcon />
          </button>
          
          {/* Next button - right side */}
          <button 
            className="feature-modal__icon-btn feature-modal__icon-btn--next"
            onClick={onNext}
            disabled={!canGoNext}
            aria-label="Next feature"
          >
            <RightIcon />
          </button>
        </div>

        {/* Text content with padding */}
        <div className="feature-modal__text-content">
          <h3 id="modal-title" className="feature-modal__title">
            {feature.title}
          </h3>
          <p className="feature-modal__description">
            {feature.description}
          </p>
        </div>
      </div>
    </>
  );
};

export default FeatureModal;