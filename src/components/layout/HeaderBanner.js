// src/components/common/HeaderBanner.js
import React from 'react';
import './HeaderBanner.css';

const HeaderBanner = ({ 
  heading, 
  subtitle, 
  backgroundImage = 'images/header-banner-van.webp' 
}) => {
  return (
    <section 
      className="header-banner"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="header-banner__overlay">
        <div className="container">
          <div className="header-banner__content">
            <h1 className="header-banner__heading">{heading}</h1>
            {subtitle && (
              <p className="header-banner__subtitle">{subtitle}</p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderBanner;