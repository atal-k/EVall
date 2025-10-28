// File /src/components/sections/FeaturesCarousel.js */

import React from 'react';
import './FeaturesCarousel.css';

const featuresData = [
  {
    title: "Sports/Economy Mode",
    subtitle: "Effortlessly switch between powerful performance and eco efficiency for the perfect balance every time you drive.",
    image: "/images/evall-economy.png"
  },
  {
    title: "Ready for Any Challenge",
    subtitle: "EVall Uday is engineered to thrive in the toughest terrains and remote locations, delivering unparalleled reliability where others hesitate.",
    image: "/images/evall-challenge.png"
  },
  {
    title: "Rugged Payload Strength",
    subtitle: "Designed with robust build quality and superior ground clearance, it conquers rugged paths with ease.",
    image: "/images/evall-payload.png"
  },
  {
    title: "Driver Comfort Engineering",
    subtitle: "Experience the perfect blend of ergonomic design, spacious legroom, and intelligent climate control for fatigue-free, focused driving on every journey.",
    image: "/images/evall-comfort.png"
  }
];

const FeaturesCarousel = () => {
  return (
    <section className="features-carousel">
      <div className="features-carousel__container">
        <div className="features-carousel__track">
          {featuresData.map((feature, index) => (
            <div 
              key={index} 
              className="features-carousel__card"
              style={{ backgroundImage: `url(${feature.image})` }}
            >
              <div className="features-carousel__overlay"></div>
              <div className="features-carousel__content">
                <h3 className="features-carousel__title">{feature.title}</h3>
                <p className="features-carousel__subtitle">{feature.subtitle}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturesCarousel;