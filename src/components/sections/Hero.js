// Hero Component
import { useState } from 'react';
import Button from "../common/Button";
import './Hero.css'
import TestDriveModal from '../common/TestDriveModal';
const Hero = () => {
  const [showTestDrive, setShowTestDrive] = useState(false);
    return (
      <section className="hero">
        <video 
          className="hero__video" 
          autoPlay 
          loop 
          muted 
          playsInline
          poster=""
        >
          <source src="/video/promo.mp4" type="video/mp4" />
        </video>
        <div className="hero__overlay"></div>
        
        <div className="hero__content">
          <h1 className="hero__title">
            Reliable Performance Meets Zero Emissions
          </h1>
          <p className="hero__subtitle">
            Designed for commercial success — efficient, durable, and sustainable.
          </p>
          
          <div className="hero__cta">
            <Button variant="primary" className="cta" onClick={() => setShowTestDrive(true)}>
              <span className="cta_icon" aria-hidden="true"><img src="./icons/handle.svg" alt="handle icon" /></span>
              <span className="cta__label">Test Drive</span>
            </Button>
          </div>
          <TestDriveModal 
        isOpen={showTestDrive} 
        onClose={() => setShowTestDrive(false)} 
      />
          <div className="hero__specs">
            <div className="hero__spec">
              <div className="hero__spec-value">300<span style={{fontSize: 'var(--font-size-xl)'}}>km</span></div>
              <div className="hero__spec-label">Range</div>
            </div>
            <div className="hero__spec">
              <div className="hero__spec-value">2.5<span style={{fontSize: 'var(--font-size-xl)'}}>tons</span></div>
              <div className="hero__spec-label">Payload</div>
            </div>
            <div className="hero__spec">
              <div className="hero__spec-value">120<span style={{fontSize: 'var(--font-size-xl)'}}>kWh</span></div>
              <div className="hero__spec-label">Battery</div>
            </div>
          </div>
        </div>
      </section>
    );
  };
  export default Hero;