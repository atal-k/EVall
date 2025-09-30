/* eslint-disable jsx-a11y/anchor-is-valid */
// FILE: src/components/sections/Models.js
// ============================================================================

import React, { useState } from 'react';
import VanCard from '../common/VanCard';
import { vansData, categories } from '../../data/vansData';
import './Models.css';

const Models = () => {
  const [activeCategory, setActiveCategory] = useState('light-duty');
  const [vans, setVans] = useState(vansData);

  const handleWishlistToggle = (vanId, isWishlisted) => {
    setVans(prevVans =>
      prevVans.map(van =>
        van.id === vanId ? { ...van, isWishlisted } : van
      )
    );
  };

  const handleExploreMore = (vanId) => {
    console.log('Explore van:', vanId);
    // Navigate to detail page or show modal
  };

  const filteredVans = vans.filter(van => van.category === activeCategory);

  return (
    <section className="models-section">
      <div className="container">
        {/* Header */}
        <div className="models-section__header">
          <h2 className="models-section__title">Explore All Models</h2>
          
          {/* Category Tabs */}
          <div className="models-section__tabs">
            <div className="models-section__tabs-list">
              {categories.map(category => (
                <button
                  key={category.id}
                  className={`models-section__tab ${activeCategory === category.id ? 'models-section__tab--active' : ''}`}
                  onClick={() => setActiveCategory(category.id)}
                >
                  {category.label}
                </button>
              ))}
            </div>
            
            <a href="#" className="models-section__view-all">
              View All
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* Vans Grid */}
        <div className="models-section__grid">
          {filteredVans.map(van => (
            <VanCard
              key={van.id}
              van={van}
              onWishlistToggle={handleWishlistToggle}
              onExploreMore={handleExploreMore}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Models;
