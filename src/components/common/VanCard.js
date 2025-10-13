// FILE: src/components/common/VanCard.js
// ============================================================================

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './VanCard.css';

const VanCard = ({ van, onBookmarkToggle, onExploreMore }) => {
  const [isBookmarked, setIsBookmarked] = useState(van.isBookmarked || false);
  const navigate = useNavigate();

  const handleBookmarkClick = (e) => {
    e.stopPropagation();
    setIsBookmarked(!isBookmarked);
    if (onBookmarkToggle) {
      onBookmarkToggle(van.id, !isBookmarked);
    }
  };

  const handleExploreClick = () => {
    navigate(`/vans/${van.id}`);
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat('en-IN').format(price);
  };
  const imageSrc = van.images[0];


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
        
{/* Bookmark Icon */}
<button 
  className={`van-card__bookmark ${isBookmarked ? 'van-card__bookmark--active' : ''}`}
  onClick={handleBookmarkClick}
  aria-label="Add to bookmark"
>
  {isBookmarked ? (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" 
        fill="#050B20"
      />
    </svg>
  ) : (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path 
        d="M19 21l-7-5-7 5V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2z" 
        stroke="#050B20" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      />
    </svg>
  )}
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
    <div className="van-card__spec-icon">
      <img src="/icons/distance.svg" alt="" width="30" height="30" />
    </div>
    <div className="van-card__spec-details">
      <div className="van-card__spec-value">{van.specs.range}{van.specs.rangeUnit}</div>
      <div className="van-card__spec-label">Range</div>
    </div>
  </div>

  <div className="van-card__spec">
    <div className="van-card__spec-icon">
      <img src="/icons/meter.svg" alt="" width="30" height="30" />
    </div>
    <div className="van-card__spec-details">
      <div className="van-card__spec-value">{van.specs.power} {van.specs.powerUnit}</div>
      <div className="van-card__spec-label">Power</div>
    </div>
  </div>

  <div className="van-card__spec">
    <div className="van-card__spec-icon">
      <img src="/icons/battery.svg" alt="" width="30" height="30" />
    </div>
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