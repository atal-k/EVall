// src/components/sections/IntelligentCapabilites.js
import React from 'react';
import './IntelligentCapabilities.css';

const IntelligentCapabilities = ({ data }) => {
  const { heading, items } = data;

  return (
    <div className="intelligent-capabilities">
      <div className="container">
        <h2 className="intelligent-capabilities__heading">{heading}</h2>
        <div className="intelligent-capabilities__grid">
          {items.map((item, index) => (
            <article key={index} className="intelligent-capabilities__card">
              <div className="intelligent-capabilities__image-wrapper">
                <img 
                  src={item.img.src} 
                  alt={item.img.altText}
                  className="intelligent-capabilities__image"
                />
              </div>
              <h3 className="intelligent-capabilities__title">{item.title}</h3>
              <p className="intelligent-capabilities__description">{item.description}</p>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
};

export default IntelligentCapabilities;