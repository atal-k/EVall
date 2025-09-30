// FILE: src/components/common/VanCard.js
// ============================================================================

import React, { useState } from 'react';
import './VanCard.css';

const VanCard = ({ van, onWishlistToggle, onExploreMore }) => {
  const [isWishlisted, setIsWishlisted] = useState(van.isWishlisted || false);

  const handleWishlistClick = (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    if (onWishlistToggle) {
      onWishlistToggle(van.id, !isWishlisted);
    }
  };

  const handleExploreClick = () => {
    if (onExploreMore) {
      onExploreMore(van.id);
    }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  const imageSrc = `/images/${van.image}`;


  return (
    <div className="van-card">
      {/* Image Container */}
      <div className="van-card__image-container">
        <img 
          src={imageSrc}
          alt={van.name} 
          className="van-card__image"
        />
        
        {/* Status Badge */}
        <div className={`van-card__badge van-card__badge--${van.badgeColor}`}>
          {van.badge}
        </div>
        
        {/* Wishlist Icon */}
        <button 
          className={`van-card__wishlist ${isWishlisted ? 'van-card__wishlist--active' : ''}`}
          onClick={handleWishlistClick}
          aria-label="Add to wishlist"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path 
              d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" 
              stroke="currentColor" 
              strokeWidth="2" 
              strokeLinecap="round" 
              strokeLinejoin="round"
              fill={isWishlisted ? 'currentColor' : 'none'}
            />
          </svg>
        </button>
      </div>

      {/* Content */}
      <div className="van-card__content">
        {/* Title */}
        <h3 className="van-card__title">{van.name}</h3>
        <p className="van-card__tagline">{van.tagline}</p>

        {/* Specs Grid */}
        <div className="van-card__specs">
          <div className="van-card__spec">
            <svg className="van-card__spec-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M12 22s-8-4.5-8-11.8A8 8 0 0 1 12 2a8 8 0 0 1 8 8.2c0 7.3-8 11.8-8 11.8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <circle cx="12" cy="10" r="3" stroke="currentColor" strokeWidth="2"/>
            </svg>
            <div className="van-card__spec-details">
              <div className="van-card__spec-value">{van.specs.range}{van.specs.rangeUnit}</div>
              <div className="van-card__spec-label">Range</div>
            </div>
          </div>

          <div className="van-card__spec">
            <svg className="van-card__spec-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            <div className="van-card__spec-details">
              <div className="van-card__spec-value">{van.specs.power} {van.specs.powerUnit}</div>
              <div className="van-card__spec-label">Power</div>
            </div>
          </div>

          <div className="van-card__spec">
            <svg className="van-card__spec-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="7" width="20" height="14" rx="2" stroke="currentColor" strokeWidth="2"/>
              <path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2" stroke="currentColor" strokeWidth="2"/>
              <line x1="6" y1="11" x2="6" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              <line x1="10" y1="11" x2="10" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
            </svg>
            <div className="van-card__spec-details">
              <div className="van-card__spec-value">{van.specs.batteryCapacity} {van.specs.batteryUnit}</div>
              <div className="van-card__spec-label">Battery Capacity</div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="van-card__footer">
          <div className="van-card__price">
            <span className="van-card__currency">{van.currency}</span>
            <span className="van-card__amount">{formatPrice(van.price)}</span>
          </div>
          <button 
            className="van-card__cta"
            onClick={handleExploreClick}
          >
            Explore More
          </button>
        </div>
      </div>
    </div>
  );
};

export default VanCard;