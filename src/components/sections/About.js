import React from 'react';
import './About.css';
import VideoPlayer from '../common/VideoPlayer';

const About = () => {
  const features = [
    {
      title: 'Reliable by Design',
      description: 'Engineered for maximum uptime and long service life to keep your operations running smoothly.'
    },
    {
      title: 'Efficient & Productive',
      description: 'Higher productivity and meaningful cost savings for businesses across every sector.'
    },
    {
      title: 'Sustainable Impact',
      description: 'Purpose-built electric vehicles that cut emissions and move India closer to a greener tomorrow.'
    },
    {
      title: 'Technology-Driven',
      description: 'Smart features, connected architecture, and relentless innovation that evolve with your needs.'
    }
  ];

  return (
    <section className="about-section">
      <div className="container">
        <h2 className="about-section__title">About Us</h2>
        
        <div className="about-section__content">
          {/* Left Content */}
          <div className="about-section__left">
            <h3 className="about-section__subtitle">Driving India's Green Mobility Revolution</h3>
            
            <p className="about-section__intro">
              At EVall Mobility, we don't just build vehicles—we set the benchmark in 
              sustainable transportation. Backed by over 40 years of automotive 
              expertise, we have grown from mobility pioneers to the leaders 
              powering India's clean energy movement.
            </p>

            <div className="about-section__features">
              {features.map((feature, index) => (
                <div key={index} className="about-section__feature">
                  <div className="about-section__feature-header">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24">
                    <path fill="currentColor" d="m16.172 11l-5.364-5.364l1.414-1.414L20 12l-7.778 7.778l-1.414-1.414L16.172 13H4v-2z" />
                  </svg>
                    <h4 className="about-section__feature-title">{feature.title}</h4>
                  </div>
                  <p className="about-section__feature-description">{feature.description}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right Video Player */}
          <div className="about-section__right">
            <VideoPlayer 
              src="/video/about-us.mp4" 
              title="About Us"
              showControlsAlways={true}
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;