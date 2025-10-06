// FILE: src/pages/VansPage.js
// ============================================================================

import React, { useState, useMemo } from 'react';
import FilterSidebar from '../components/sections/FilterSidebar';
import VanCard from '../components/common/VanCard';
import { vansData } from '../data/vansData';
import './VansPage.css';

const VansPage = () => {
  const [filters, setFilters] = useState({
    categories: ['light-duty'],
    priceRange: [200000, 2050000],
    ranges: [],
    payloads: [],
    chargingTypes: []
  });

  const [vans, setVans] = useState(vansData);

  const handleFilterChange = (filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  const handleWishlistToggle = (vanId, isWishlisted) => {
    setVans(prevVans =>
      prevVans.map(van =>
        van.id === vanId ? { ...van, isWishlisted } : van
      )
    );
  };

  const handleExploreMore = (vanId) => {
    console.log('Explore van:', vanId);
  };

  // Filter vans based on selected filters
  const filteredVans = useMemo(() => {
    return vans.filter(van => {
      // Category filter
      if (filters.categories.length > 0 && !filters.categories.includes(van.category)) {
        return false;
      }

      // Price filter
      if (van.price < filters.priceRange[0] || van.price > filters.priceRange[1]) {
        return false;
      }

      // Range filter
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

      // Payload filter
      if (filters.payloads.length > 0) {
        const payload = van.specs.payload || 2.5; // Default payload
        const payloadMatch = filters.payloads.some(p => {
          if (p === '<1') return payload < 1;
          if (p === '1-5') return payload >= 1 && payload <= 5;
          if (p === '5+') return payload > 5;
          return false;
        });
        if (!payloadMatch) return false;
      }

      // Charging type filter
      if (filters.chargingTypes.length > 0) {
        const chargingType = van.chargingType || 'fast'; // Default charging type
        if (!filters.chargingTypes.includes(chargingType)) {
          return false;
        }
      }

      return true;
    });
  }, [vans, filters]);

  // Calculate counts for each category
  const vanCounts = useMemo(() => {
    return {
      lightDuty: vans.filter(v => v.category === 'light-duty').length,
      mediumDuty: vans.filter(v => v.category === 'medium-duty').length,
      heavyDuty: vans.filter(v => v.category === 'heavy-duty').length
    };
  }, [vans]);

  return (
    <div className="vans-page">
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
