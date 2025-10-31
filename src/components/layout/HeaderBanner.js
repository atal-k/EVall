// src/components/common/HeaderBanner.js
import React from 'react';
import './HeaderBanner.css';
import Button from '../common/Button';

const HeaderBanner = ({
  variant = "default",
  title,
  heading, 
  subtitle,
  button,
  backgroundImage = 'images/header-banner-van.webp' 
}) => {
  return (
    <section 
      className={`header-banner ${variant !== "default" ? `header-banner--${variant}` : ""}`}
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="header-banner__overlay">
        <div className="container">
          <div className="header-banner__content">
            {title && (
              <p className="header-banner__title">{title}</p>
            )}
            <h1 className="header-banner__heading">{heading}</h1>
            {subtitle && (
              <p className="header-banner__subtitle">{subtitle}</p>
            )}
            {button && (
              <Button variant="primary">
                {button}
              </Button>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeaderBanner;