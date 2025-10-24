// ============================================================================
// FILE: src/components/sections/CoreValuesSection.js
// ============================================================================

import React, { useState } from 'react';
import './CoreValues.css';

const CoreValues = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const values = [
    {
      id: 'innovation',
      title: 'Innovation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M4 11a1 1 0 0 1 .117 1.993L4 13H3a1 1 0 0 1-.117-1.993L3 11zm8-9a1 1 0 0 1 .993.883L13 3v1a1 1 0 0 1-1.993.117L11 4V3a1 1 0 0 1 1-1m9 9a1 1 0 0 1 .117 1.993L21 13h-1a1 1 0 0 1-.117-1.993L20 11zM4.893 4.893a1 1 0 0 1 1.32-.083l.094.083l.7.7a1 1 0 0 1-1.32 1.497l-.094-.083l-.7-.7a1 1 0 0 1 0-1.414m12.8 0a1 1 0 0 1 1.497 1.32l-.083.094l-.7.7a1 1 0 0 1-1.497-1.32l.083-.094zM14 18a1 1 0 0 1 1 1a3 3 0 0 1-6 0a1 1 0 0 1 .883-.993L10 18zM12 6a6 6 0 0 1 3.6 10.8a1 1 0 0 1-.471.192L15 17H9a1 1 0 0 1-.6-.2A6 6 0 0 1 12 6" />
        </svg>
      ),
      description: 'Pioneering the future of commercial transport, where cutting-edge technology meets reliability. We innovate to redefine electric mobility, driving every mile with smarter solutions.'
    },
    {
      id: 'sustainability',
      title: 'Sustainability',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M2 22v-2s5-2 10-2s10 2 10 2v2zm9.3-12.9c-1.2-3.9-7.3-3-7.3-3s.2 7.8 5.9 6.6C9.5 9.8 8 9 8 9c2.8 0 3 3.4 3 3.4V17h2v-4.2s0-3.9 3-4.9c0 0-2 3-2 5c7 .7 7-8.9 7-8.9s-8.9-1-9.7 5.1" />
        </svg>
      ),
      description: 'Commitment to a greener tomorrow, reducing emissions while boosting efficiency. Sustainable solutions power our commercial fleet, making every journey cleaner and smarter.'
    },
    {
      id: 'performance',
      title: 'Performance',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="40px" height="40px" viewBox="0 0 24 24">
          <path fill="currentColor" d="M12 16a3 3 0 0 1-3-3c0-1.12.61-2.1 1.5-2.61l9.71-5.62l-5.53 9.58c-.5.98-1.51 1.65-2.68 1.65m0-13c1.81 0 3.5.5 4.97 1.32l-2.1 1.21C14 5.19 13 5 12 5a8 8 0 0 0-8 8c0 2.21.89 4.21 2.34 5.65h.01c.39.39.39 1.02 0 1.41s-1.03.39-1.42.01A9.97 9.97 0 0 1 2 13A10 10 0 0 1 12 3m10 10c0 2.76-1.12 5.26-2.93 7.07c-.39.38-1.02.38-1.41-.01a.996.996 0 0 1 0-1.41A7.95 7.95 0 0 0 20 13c0-1-.19-2-.54-2.9L20.67 8C21.5 9.5 22 11.18 22 13" />
        </svg>
      ),
      description: 'Commitment to a greener tomorrow, reducing emissions while boosting efficiency. Sustainable solutions power our commercial fleet, making every journey cleaner and smarter.'
    }
  ];

  return (
    <section className="core-values-section">
      <div className="container">
        <div className="core-values-section__wrapper">
        {/* Top Section - Full Width Image */}
        <div className="core-values-section__image-wrapper">
          <img 
            src="/images/charging-van.png" 
            alt="EV Charging Station" 
            className="core-values-section__image"
          />
        </div>
  
        {/* Bottom Section - Two Columns (Text + Cards) */}
        <div className="core-values-section__content">
          {/* Left Column - Text Content */}
          <div className="core-values-section__text">
            <h2 className="core-values-section__title">
              <span className="core-values-section__title-highlight">EV's</span> core brand values
            </h2>
            <p className="core-values-section__description">
              Our electric vehicles embody innovation, with cutting-edge technology and smart connectivity. They deliver sustainability, reducing emissions and supporting a cleaner planet. And they ensure performance and reliability, offering instant torque, smooth rides, and low running costs.
            </p>
          </div>
  
          {/* Right Column - Value Cards */}
          <div className="core-values-section__cards">
            <div className="core-values-cards">
              {values.map((value, index) => (
                <div
                  key={value.id}
                  className={`value-card ${hoveredCard === value.id ? 'value-card--active' : ''} ${hoveredCard && hoveredCard !== value.id ? 'value-card--inactive' : ''}`}
                  onMouseEnter={() => setHoveredCard(value.id)}
                  onMouseLeave={() => setHoveredCard(null)}
                  style={{
                    zIndex: hoveredCard === value.id ? 10 : 3 - index
                  }}
                >
                  <div className="value-card__header">
                    <div className="value-card__icon">
                      {value.icon}
                    </div>
                    <h3 className="value-card__title">{value.title}</h3>
                  </div>
                  <div className="value-card__content">
                    <p className="value-card__description">{value.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CoreValues;



// ============================================================================
// USAGE INSTRUCTIONS
// ============================================================================

/*
TO INTEGRATE:

1. Add image to public/images/:
   - charging-car.png (white EV truck with charging station)

2. Import in your Home page:
   import CoreValuesSection from './components/sections/CoreValuesSection';
   
   <CoreValuesSection />

FEATURES IMPLEMENTED:
✓ Two-column layout (50% image/text, 50% cards)
✓ 3 interactive value cards (Innovation, Sustainability, Performance)
✓ Card overlap effect (negative margin -20px)
✓ Smooth expand/shrink on hover (0.4s cubic-bezier)
✓ Active card expands to 340px, shows description with fade-in
✓ Inactive cards shrink to 140px, hide description
✓ Z-index management (active card on top)
✓ Icon background changes to green when active
✓ Mobile: Cards stack vertically, all expanded
✓ Responsive design with proper breakpoints
✓ All styling uses root CSS variables

CARD BEHAVIOR:
- Default: 3 cards overlapping, 160px width each
- Hover Card 1: Expands to 340px, cards 2&3 shift right
- Hover Card 2: Expands to 340px, card 1 shrinks, card 3 shifts
- Hover Card 3: Expands to 340px, cards 1&2 shift left
- Smooth transitions on all properties
- Description text fades in only on active card
*/