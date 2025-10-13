/* eslint-disable jsx-a11y/anchor-is-valid */
// FILE: src/components/sections/Models.js
// ============================================================================

import React, { useState, useMemo } from 'react';
import VanCard from '../common/VanCard';
import useVans from '../../hooks/useVans';
import './Models.css';

const categories = [
  { id: 'light-duty', label: 'Light Duty Trucks' },
  { id: 'medium-duty', label: 'Medium-Duty Trucks' },
  { id: 'heavy-duty', label: 'Heavy-Duty Trucks' }
];

const Models = () => {
  const [activeCategory, setActiveCategory] = useState('light-duty');
  const { vans, loading, error } = useVans();

  const handleWishlistToggle = (vanId, isWishlisted) => {
    // We'll implement API call later
    console.log('Wishlist toggle:', vanId, isWishlisted);
  };

  const handleExploreMore = (vanId) => {
    console.log('Explore van:', vanId);
    // Navigate to detail page or show modal
  };

  // Filter vans by active category and limit to 4
  const filteredVans = useMemo(() => {
    return vans
      .filter(van => van.category === activeCategory)
      .slice(0, 4);
  }, [vans, activeCategory]);

// Loading state with skeleton cards
if (loading) {
  return (
    <section className="models">
      <div className="container">
        <h2 className="models__title">Explore Our Models</h2>
        <div className="models__tabs">
          {categories.map(category => (
            <button key={category.id} className="models__tab" disabled>
              {category.label}
            </button>
          ))}
        </div>
        <div className="models__grid">
          {[1, 2, 3, 4].map(i => (
            <div key={i} className="van-card" style={{ opacity: 0.5 }}>
              <div style={{ height: '200px', background: '#f0f0f0' }} />
              <div style={{ padding: '20px' }}>
                <div style={{ height: '20px', background: '#f0f0f0', marginBottom: '10px' }} />
                <div style={{ height: '15px', background: '#f0f0f0', width: '70%' }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

  // Error state
  if (error) {
    return (
      <section className="models">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '60px 20px' }}>
            <p style={{ color: 'red' }}>Failed to load models. Please try again.</p>
          </div>
        </div>
      </section>
    );
  }

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
            
            <a href="/vans" className="models-section__view-all">
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
