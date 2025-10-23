// ============================================================================
// FILE: src/components/sections/Callout.js
// ============================================================================

import React, { useState } from 'react';
import Button from '../common/Button';
import './Callout.css';
import TestDriveModal from '../common/TestDriveModal';

const Callout = () => {
  const [showTestDrive, setShowTestDrive] = useState(false);
  return (
    <section className="cta-section">
        <div className="spacer"></div>
      <div className="container">
        <div className="cta-section__container">
          {/* Left Side - Image */}
          <div className="cta-section__image-wrapper">
            <img 
              src="/images/evall-van1.png" 
              alt="EVall Commercial Vehicle" 
              className="cta-section__image"
            />
          </div>

          {/* Right Side - Content */}
          <div className="cta-section__content">
            <h2 className="cta-section__title">
              India's Commercial Drive Now Electrified with Intelligence
            </h2>
            
            <p className="cta-section__subtitle">
              Powering every mile with innovation, reliability, and sustainability.
            </p>

            <p className="cta-section__tagline">
              Charge Ahead. Deliver More. Emit Less.
            </p>

            <div className="cta-section__buttons">
              <Button variant="primary" className="btn-callout" onClick={() => setShowTestDrive(true)}>Book a Test Ride</Button>
              <Button variant="white" className="btn-callout">Find Dealer</Button>
            </div>
            <TestDriveModal
        isOpen={showTestDrive} 
        onClose={() => setShowTestDrive(false)} 
      />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Callout;