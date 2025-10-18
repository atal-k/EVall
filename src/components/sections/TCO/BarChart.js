// ============================================================================
// FILE: src/components/sections/TCO/BarChart.js
// ============================================================================

import React from 'react';
import './BarChart.css';

const BarChart = ({ 
  data, 
  xAxisLabel = '', 
  yAxisLabel = '', 
  firstBarColor = '#34D100', 
  secondBarColor = '#2D76F0',
  firstBarLabel = 'EV',
  secondBarLabel = 'ICE'
}) => {
  if (!data || data.length === 0) return null;

  // Calculate max value for scaling
  const maxValue = Math.max(
    ...data.map(d => Math.max(d.firstValue || 0, d.secondValue || 0))
  );
  
  // Round up to nearest nice number for y-axis
  const getYAxisMax = (max) => {
    const magnitude = Math.pow(10, Math.floor(Math.log10(max)));
    return Math.ceil(max / magnitude) * magnitude;
  };
  
  const yAxisMax = getYAxisMax(maxValue);
  
  // Generate y-axis ticks (5 ticks including 0)
  const generateYTicks = () => {
    const ticks = [];
    const step = yAxisMax / 4;
    for (let i = 0; i <= 4; i++) {
      ticks.push(step * i);
    }
    return ticks.reverse();
  };
  
  const yTicks = generateYTicks();
  
  // Format currency for y-axis (₹6.0L format)
  const formatYAxis = (value) => {
    if (value === 0) return '₹0.0L';
    const lakh = value / 100000;
    return `₹${lakh.toFixed(1)}L`;
  };
  
  return (
    <div className="bar-chart">
      <div className="bar-chart__header">
        <div className="bar-chart__legend">
          <div className="bar-chart__legend-item">
            <span className="bar-chart__legend-color" style={{ background: firstBarColor }}></span>
            <span className="bar-chart__legend-label">{firstBarLabel}</span>
          </div>
          <div className="bar-chart__legend-item">
            <span className="bar-chart__legend-color" style={{ background: secondBarColor }}></span>
            <span className="bar-chart__legend-label">{secondBarLabel}</span>
          </div>
        </div>
      </div>
      
      <div className="bar-chart__container">
        {/* Y-axis */}
        <div className="bar-chart__y-axis">
          {yTicks.map((tick, index) => (
            <div key={index} className="bar-chart__y-tick">
              <span className="bar-chart__y-label">{formatYAxis(tick)}</span>
            </div>
          ))}
        </div>
        
        {/* Chart area */}
        <div className="bar-chart__chart-area">
          {/* Grid lines */}
          <div className="bar-chart__grid">
            {yTicks.map((_, index) => (
              <div key={index} className="bar-chart__grid-line"></div>
            ))}
          </div>
          
          {/* Bars */}
          <div className="bar-chart__bars">
            {data.map((item, index) => {
              const firstHeight = (item.firstValue / yAxisMax) * 100;
              const secondHeight = (item.secondValue / yAxisMax) * 100;
              
              return (
                <div key={index} className="bar-chart__bar-group">
                  <div className="bar-chart__bar-pair">
                    <div 
                      className="bar-chart__bar bar-chart__bar--first"
                      style={{ 
                        height: `${firstHeight}%`,
                        background: firstBarColor 
                      }}
                    ></div>
                    <div 
                      className="bar-chart__bar bar-chart__bar--second"
                      style={{ 
                        height: `${secondHeight}%`,
                        background: secondBarColor 
                      }}
                    ></div>
                  </div>
                  <div className="bar-chart__x-label">{item.label}</div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default BarChart;