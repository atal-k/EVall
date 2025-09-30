// Hero Component
import Button from "../common/Button";
import './Hero.css'
const Hero = () => {
    return (
      <section className="hero">
        <video 
          className="hero__video" 
          autoPlay 
          loop 
          muted 
          playsInline
          poster="https://images.unsplash.com/photo-1593941707882-a5bba14938c7?w=1920&h=1080&fit=crop"
        >
          <source src="https://assets.mixkit.co/videos/preview/mixkit-truck-driving-on-a-highway-4613-large.mp4" type="video/mp4" />
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
            <Button variant="primary">
              <span>🚗</span>
              Test Drive
            </Button>
          </div>
          
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