// src/components/layout/AlternateLayout.js
import React from 'react';
import './AlternateLayout.css';

const AlternateLayout = ({ data }) => {
  return (
    <section className="alternate-layout">
      <div className="container">
        {data.map((item, index) => {
          const isEven = index % 2 === 0;
          
          return (
            <div 
              key={item.id} 
              className={`alternate-layout__item ${isEven ? 'alternate-layout__item--even' : 'alternate-layout__item--odd'}`}
            >
              <div className="alternate-layout__image-wrapper">
                <img 
                  src={item.image} 
                  alt={item.title}
                  className="alternate-layout__image"
                />
              </div>
              
              <div className="alternate-layout__content">
                <h2 className="alternate-layout__title">{item.title}</h2>
                <p className="alternate-layout__description">{item.description}</p>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};

export default AlternateLayout;





/* ========================================================================
   ADD TO src/app.css (Global CSS Variables)
   ======================================================================== */

/*
Add these color variables to your :root in App.css:

    // AlternateLayout colors

*/


/* ========================================================================
   USAGE EXAMPLE
   ======================================================================== */

/*
// src/pages/AboutUs.js
import React from 'react';
import HeaderBanner from '../components/common/HeaderBanner';
import AlternateLayout from '../components/layout/AlternateLayout';



export default AboutUs;
*/