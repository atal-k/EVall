// FILE: src/components/sections/FilterSidebar.js
// ============================================================================

import React from 'react';
import Checkbox from '../common/Checkbox';
import RangeSlider from '../common/RangeSlider';
import './FilterSidebar.css';

const FilterSidebar = ({ filters, onFilterChange, vanCounts }) => {
  const handleCheckboxChange = (filterType, value) => {
    const currentValues = filters[filterType] || [];
    const newValues = currentValues.includes(value)
      ? currentValues.filter(v => v !== value)
      : [...currentValues, value];
    onFilterChange(filterType, newValues);
  };

  const handlePriceChange = (priceRange) => {
    onFilterChange('priceRange', priceRange);
  };

  return (
    <aside className="filter-sidebar">
      {/* Vehicle Category */}
      <div className="filter-sidebar__section">
        <h3 className="filter-sidebar__title">Vehicle Category</h3>
        <div className="filter-sidebar__options">
          <Checkbox
            id="light-duty"
            label="Light Duty Trucks"
            checked={filters.categories?.includes('light-duty')}
            onChange={() => handleCheckboxChange('categories', 'light-duty')}
            count={vanCounts.lightDuty}
          />
          <Checkbox
            id="medium-duty"
            label="Medium-Duty Trucks"
            checked={filters.categories?.includes('medium-duty')}
            onChange={() => handleCheckboxChange('categories', 'medium-duty')}
            count={vanCounts.mediumDuty}
          />
          <Checkbox
            id="heavy-duty"
            label="Heavy-Duty Trucks"
            checked={filters.categories?.includes('heavy-duty')}
            onChange={() => handleCheckboxChange('categories', 'heavy-duty')}
            count={vanCounts.heavyDuty}
          />
        </div>
      </div>

      {/* Price Range */}
      <div className="filter-sidebar__section">
        <h3 className="filter-sidebar__title">Filter By Price</h3>
        <RangeSlider
          min={200000}
          max={2050000}
          step={10000}
          value={filters.priceRange || [200000, 2050000]}
          onChange={handlePriceChange}
        />
      </div>

      {/* Range (Km) */}
      <div className="filter-sidebar__section">
        <h3 className="filter-sidebar__title">Range (Km)</h3>
        <div className="filter-sidebar__options">
          <Checkbox
            id="range-0-150"
            label="0-150 Km"
            checked={filters.ranges?.includes('0-150')}
            onChange={() => handleCheckboxChange('ranges', '0-150')}
          />
          <Checkbox
            id="range-150-300"
            label="150-300 Km"
            checked={filters.ranges?.includes('150-300')}
            onChange={() => handleCheckboxChange('ranges', '150-300')}
          />
          <Checkbox
            id="range-300-plus"
            label="300+ Km"
            checked={filters.ranges?.includes('300+')}
            onChange={() => handleCheckboxChange('ranges', '300+')}
          />
        </div>
      </div>

      {/* Payload Capacity */}
      <div className="filter-sidebar__section">
        <h3 className="filter-sidebar__title">Payload Capacity</h3>
        <div className="filter-sidebar__options">
          <Checkbox
            id="payload-1"
            label="< 1 Ton"
            checked={filters.payloads?.includes('<1')}
            onChange={() => handleCheckboxChange('payloads', '<1')}
          />
          <Checkbox
            id="payload-1-5"
            label="1-5 Tons"
            checked={filters.payloads?.includes('1-5')}
            onChange={() => handleCheckboxChange('payloads', '1-5')}
          />
          <Checkbox
            id="payload-5-plus"
            label="5+ Tons"
            checked={filters.payloads?.includes('5+')}
            onChange={() => handleCheckboxChange('payloads', '5+')}
          />
        </div>
      </div>

      {/* Charging Type */}
      <div className="filter-sidebar__section">
        <h3 className="filter-sidebar__title">Charging Type</h3>
        <div className="filter-sidebar__options">
          <Checkbox
            id="fast-charging"
            label="Fast Charging"
            checked={filters.chargingTypes?.includes('fast')}
            onChange={() => handleCheckboxChange('chargingTypes', 'fast')}
          />
          <Checkbox
            id="standard-charging"
            label="Standard Charging"
            checked={filters.chargingTypes?.includes('standard')}
            onChange={() => handleCheckboxChange('chargingTypes', 'standard')}
          />
        </div>
      </div>
    </aside>
  );
};

export default FilterSidebar;
