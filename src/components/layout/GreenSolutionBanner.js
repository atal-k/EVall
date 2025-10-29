// src/components/layout/GreenSolutionBanner.js
import React from 'react';
import './GreenSolutionBanner.css';

const GreenSolutionBanner = () => {
    const greenBannerData = {
        title: "Advancing Green Solutions Every Day",
        description:
          "We are dedicated to creating low-impact mobility through responsible sourcing, adopting renewable energy, and empowering communities with affordable EV technology, making a measurable difference every mile we cover.",
        img: {
          src: "/images/charging-station.webp",
          alt: "EV charging station",
        },
      };
      
  return (
    <section className="green-solution-banner">
        <div className="green-solution-banner__wrapper">
          <div className="green-solution-banner__image-container">
            <img 
              src={greenBannerData.img.src} 
              alt={greenBannerData.img.alt}
              className="green-solution-banner__image"
            />
          </div>

          <div className="green-solution-banner__content">
            <h2 className="green-solution-banner__title">{greenBannerData.title}</h2>
            <p className="green-solution-banner__description">{greenBannerData.description}</p>
          </div>
        </div>
    </section>
  );
};

export default GreenSolutionBanner;





/* ========================================================================
   ADD TO src/app.css (Global CSS Variables)
   ======================================================================== */

/*
Add this color variable to your :root in App.css:

    // GreenSolutionBanner color
    --color-green-banner: #066F29;
*/


/* ========================================================================
   USAGE EXAMPLE
   ======================================================================== */

/*
// src/pages/AboutUs.js
import React from 'react';
import GreenSolutionBanner from '../components/common/GreenSolutionBanner';

const AboutUs = () => {
  return (
    <div className="about-us-page">
      <GreenSolutionBanner 
        }
      />
    </div>
  );
};

export default AboutUs;
*/