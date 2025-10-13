// FILE: src/pages/VansPage.js
// ============================================================================

import React, { useState, useMemo } from 'react';
import FilterSidebar from '../components/sections/FilterSidebar';
import VanCard from '../components/common/VanCard';
import useVans from '../hooks/useVans';
import './VansPage.css';

const VansPage = () => {
  // Fetch vans from API
  const { vans: apiVans, loading, error } = useVans();
  
  const [filters, setFilters] = useState({
    categories: ['light-duty'],
    priceRange: [200000, 1200000],
    ranges: [],
    payloads: [],
    chargingTypes: []
  });

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  // Keep your existing handleWishlistToggle for now
  const handleWishlistToggle = (vanId, isWishlisted) => {
    // We'll implement API call later
    console.log('Wishlist toggle:', vanId, isWishlisted);
  };

  const handleExploreMore = (vanId) => {
    console.log('Explore van:', vanId);
  };

  // Filter vans (same as before, but use apiVans)
  const filteredVans = useMemo(() => {
    return apiVans.filter(van => {
      if (filters.categories.length > 0 && !filters.categories.includes(van.category)) {
        return false;
      }
      if (van.price < filters.priceRange[0] || van.price > filters.priceRange[1]) {
        return false;
      }
      if (filters.ranges.length > 0) {
        const range = van.specs.range;
        const rangeMatch = filters.ranges.some(r => {
          if (r === '0-150') return range >= 0 && range <= 150;
          if (r === '150-300') return range > 150 && range <= 300;
          if (r === '300+') return range > 300;
          return false;
        });
        if (!rangeMatch) return false;
      }
      if (filters.payloads.length > 0) {
        const payload = van.specs.payload || 2.5;
        const payloadMatch = filters.payloads.some(p => {
          if (p === '<1') return payload < 1;
          if (p === '1-5') return payload >= 1 && payload <= 5;
          if (p === '5+') return payload > 5;
          return false;
        });
        if (!payloadMatch) return false;
      }
      if (filters.chargingTypes.length > 0) {
        const chargingType = van.chargingType || 'fast';
        if (!filters.chargingTypes.includes(chargingType)) {
          return false;
        }
      }
      return true;
    });
  }, [apiVans, filters]);

  // Calculate counts for categories
  const vanCounts = useMemo(() => {
    return {
      lightDuty: apiVans.filter(v => v.category === 'light-duty').length,
      mediumDuty: apiVans.filter(v => v.category === 'medium-duty').length,
      heavyDuty: apiVans.filter(v => v.category === 'heavy-duty').length
    };
  }, [apiVans]);

  // Loading state
  if (loading) {
    return (
      <div className="vans-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <p>Loading vans...</p>
          </div>
        </div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="vans-page">
        <div className="container">
          <div style={{ textAlign: 'center', padding: '100px 20px' }}>
            <p style={{ color: 'red' }}>Error: {error}</p>
            <button onClick={() => window.location.reload()}>Retry</button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="vans-page">
      {/* Rest of your JSX stays the same */}
      <div className="container">
        <h1 className="vans-page__title">Explore All Models</h1>
        
        <div className="vans-page__layout">
          <FilterSidebar
            filters={filters}
            onFilterChange={handleFilterChange}
            vanCounts={vanCounts}
          />
          
          <div className="vans-page__content">
            {filteredVans.length > 0 ? (
              <div className="vans-page__grid">
                {filteredVans.map(van => (
                  <VanCard
                    key={van.id}
                    van={van}
                    onWishlistToggle={handleWishlistToggle}
                    onExploreMore={handleExploreMore}
                  />
                ))}
              </div>
            ) : (
              <div className="vans-page__empty">
                <p>No vehicles found matching your filters.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VansPage;
