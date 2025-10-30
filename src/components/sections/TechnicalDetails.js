// FILE: src/components/sections/TechnicalDetails.js


import React, { useState } from 'react';
import './TechnicalDetails.css';
import Logo from "../common/Logo";

// Technical Specifications Data
const technicalData = {
  modelDetails: {
    title: "Technical Specifications",
    specs: [
      { label: "Model Details", value: "EVALL T3EV UDAY" },
      { label: "Domain", value: "GVW (kg)" },
      { label: "Payload (kg)", value: "1495" },
      { label: "Length", value: "5190 Centimeter" },
      { label: "Breadth", value: "1770 Centimeter" },
      { label: "Height", value: "1995 Centimeter" }
    ]
  },
  evPowertrain: {
    title: "EV Powertrain Details",
    specs: [
      { label: "Battery Type", value: "LFP (Lithium Iron Phosphate)" },
      { label: "Battery Capacity (kwh)", value: "41.86 kwh" },
      { label: "Motor Power", value: "Permanent Magnet Synchronous Motor" },
      { label: "Peak Power (kw)", value: "60" },
      { label: "Peak Torque (Nm)", value: "220" }
    ]
  },
  performance: {
    title: "Performance",
    specs: [
      { label: "Range (km)", value: "250 km" },
      { label: "Gradeability", value: "21%" }
    ]
  },
  charging: {
    title: "Charging Details",
    specs: [
      { label: "Charger Type", value: "CCS2" },
      { label: "DC Charging", value: "60 mins fast charging" }
    ]
  }
};

// Key highlights for main view
const keyHighlights = [
  { value: "250", unit: "km", label: "Range per Charge" },
  { value: "3085", unit: "kg", label: "Gross Vehicle Weight" },
  { value: "1495", unit: "kg", label: "Payload Capacity" }
];

const TechnicalDetails = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalLeft, setModalLeft] = useState(0);
  const contentRef = React.useRef(null);
  const [isClosing, setIsClosing] = useState(false);  // ADD THIS

  const openModal = () => {
    if (contentRef.current) {
      const rect = contentRef.current.getBoundingClientRect();
      setModalLeft(rect.left);
    }
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsClosing(true);  // ADD THIS
    setTimeout(() => {
      setIsModalOpen(false);
      setIsClosing(false);
    }, 300);  // Match animation duration
  };
  return (
    <section className="technical-details">
      <div className="technical-details__container container">
        <div className="technical-details__image">
          <img 
            src="/images/evall-front.webp" 
            alt="EVall Van Front View" 
          />
        </div>
        
        <div className="technical-details__content" ref={contentRef}>
          <div className="technical-details__highlights">
            {keyHighlights.map((highlight, index) => (
              <div key={index} className="highlight-item">
                <div className="highlight-item__value">
                  {highlight.value}
                  <span className="highlight-item__unit">{highlight.unit}</span>
                </div>
                <div className="highlight-item__label">{highlight.label}</div>
              </div>
            ))}
          </div>
          
          <button 
            className="technical-details__btn"
            onClick={openModal}
          >
            View all technical details
          </button>
        </div>
      </div>

      {isModalOpen && (
        <div className="modal-overlay" onClick={closeModal} style={{ left: `${modalLeft}px` }}>
            <div 
            className={`modal-content ${isClosing ? 'modal-closing' : ''}`}  // ADD isClosing class
            onClick={(e) => e.stopPropagation()}
            >
            <button className="modal-close" onClick={closeModal}>
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" color='#5C6370'>
                <path d="M18 6L6 18M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>

            <div className="modal-header">
              <Logo size="large" />
            </div>

            <div className="modal-body">
              <div className="specs-section">
                <h3 className="specs-section__title">{technicalData.modelDetails.title}</h3>
                {technicalData.modelDetails.specs.map((spec, index) => (
                  <div key={index} className="spec-row">
                    <span className="spec-row__label">{spec.label}</span>
                    <span className="spec-row__value">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="specs-section">
                <h3 className="specs-section__title">{technicalData.evPowertrain.title}</h3>
                {technicalData.evPowertrain.specs.map((spec, index) => (
                  <div key={index} className="spec-row">
                    <span className="spec-row__label">{spec.label}</span>
                    <span className="spec-row__value">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="specs-section">
                <h3 className="specs-section__title">{technicalData.performance.title}</h3>
                {technicalData.performance.specs.map((spec, index) => (
                  <div key={index} className="spec-row">
                    <span className="spec-row__label">{spec.label}</span>
                    <span className="spec-row__value">{spec.value}</span>
                  </div>
                ))}
              </div>

              <div className="specs-section">
                <h3 className="specs-section__title">{technicalData.charging.title}</h3>
                {technicalData.charging.specs.map((spec, index) => (
                  <div key={index} className="spec-row">
                    <span className="spec-row__label">{spec.label}</span>
                    <span className="spec-row__value">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TechnicalDetails;
