// FILE: src/components/common/RangeSlider.js
// ============================================================================

import React, { useState, useEffect } from 'react';
import './RangeSlider.css';

const RangeSlider = ({ min, max, step = 1000, value, onChange }) => {
  const [minValue, setMinValue] = useState(value[0]);
  const [maxValue, setMaxValue] = useState(value[1]);

  useEffect(() => {
    setMinValue(value[0]);
    setMaxValue(value[1]);
  }, [value]);

  const handleMinChange = (e) => {
    const newMin = Math.min(Number(e.target.value), maxValue - step);
    setMinValue(newMin);
    onChange([newMin, maxValue]);
  };

  const handleMaxChange = (e) => {
    const newMax = Math.max(Number(e.target.value), minValue + step);
    setMaxValue(newMax);
    onChange([minValue, newMax]);
  };

  const minPercent = ((minValue - min) / (max - min)) * 100;
  const maxPercent = ((maxValue - min) / (max - min)) * 100;

  const formatPrice = price => `${price.toLocaleString('en-IN')}`;


  return (
    <div className="range-slider">
      <div className="range-slider__track">
        <div 
          className="range-slider__range" 
          style={{ left: `${minPercent}%`, width: `${maxPercent - minPercent}%` }}
        />
      </div>
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={minValue}
        onChange={handleMinChange}
        className="range-slider__input range-slider__input--min"
      />
      
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={maxValue}
        onChange={handleMaxChange}
        className="range-slider__input range-slider__input--max"
      />
      
      <div className="range-slider__values">
        <span className="range-slider__value">Price : <span className="range-slider__value-price"><span className="range-slider__value-price-currency">₹</span>{formatPrice(minValue)} - <span className="range-slider__value-price-currency">₹</span>{formatPrice(maxValue)}</span></span>
      </div>
    </div>
  );
};

export default RangeSlider;
