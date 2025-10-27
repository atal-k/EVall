// ============================================================================
// FILE: src/components/sections/Comparison.js
// ============================================================================

import React, { useState } from 'react';
import './Comparison.css';

const Comparison = () => {
  const [activeVehicle, setActiveVehicle] = useState('ice'); // 'ice' or 'electric'
  const cardColors = {
    colors: ['#4E09A9', '#2DB700', '#9D0A0A', '#D37C25'],
    bgColors: ['#ede9fe', '#d6fec9', '#fee2e2', '#ffedd5']
  }
  const cardIcons = [(
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="-240 0 1408 1408">
        <path fill={cardColors.colors[0]} d="M898 342v102q0 14-9 23t-23 9H698q-23 144-129 234T293 820q167 178 459 536q14 16 4 34q-8 18-29 18H532q-16 0-25-12Q201 1029 9 825q-9-9-9-22V676q0-13 9.5-22.5T32 644h112q132 0 212.5-43T459 476H32q-14 0-23-9t-9-23V342q0-14 9-23t23-9h413q-57-113-268-113H32q-13 0-22.5-9.5T0 165V32Q0 18 9 9t23-9h832q14 0 23 9t9 23v102q0 14-9 23t-23 9H631q47 61 64 144h171q14 0 23 9t9 23" />
    </svg>
),
    (<svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24">
	<g fill="none" stroke={cardColors.colors[1]} strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
		<path d="M5 21c.5-4.5 2.5-8 7-10" />
		<path d="M9 18c6.218 0 10.5-3.288 11-12V4h-4.014c-9 0-11.986 4-12 9c0 1 0 3 2 5h3z" />
	</g>
</svg>),
(
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke={cardColors.colors[2]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  ),
  (
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" stroke={cardColors.colors[3]} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
  ]


  const comparisonData = {
    ice: [
      {
        id: 1,
        icon: cardIcons[0],
        title: 'Higher Operating Costs',
        description: 'Fuel and service costs are higher with frequent refueling. Efficiency depends on traffic and driving style.',
        metric: '0.12',
        currency: '₹',
        unit: '/mile',
      },
      {
        id: 2,
        icon: cardIcons[1],
        title: 'Tailpipe Emissions',
        description: 'Produces CO₂, NOₓ, and other pollutants at the tailpipe. Contributes more to urban air pollution.',
        metric: '350g CO₂',
        unit: '/mile',
      },
      {
        id: 3,
        icon: cardIcons[2],
        title: 'Complex Maintenance',
        description: 'Complex engine with many moving parts. Regular oil changes and servicing needed.',
        metric: '1200',
        currency: '₹',
        unit: '/year',
      },
      {
        id: 4,
        icon: cardIcons[3],
        title: 'Linear Performance',
        description: 'Power builds gradually with gear changes. Engine noise and vibration present.',
        metric: '0-60',
        unit: ' in 12.2s',
      }
    ],
    electric: [
      {
        id: 1,
        icon: cardIcons[0],
        title: 'Lower Operating Costs',
        description: 'Fuel and service costs are higher with frequent refueling. Efficiency depends on traffic and driving style.',
        metric: '0.04',
        currency: '₹',
        unit: '/mile',
      },
      {
        id: 2,
        icon: cardIcons[1],
        title: 'Zero Emissions',
        description: 'Zero tailpipe emissions on the road. Indirect emissions depend on power source.',
        metric: '0g CO₂',
        unit: '/mile',
      },
      {
        id: 3,
        icon: cardIcons[2],
        title: 'Minimal Maintenance',
        description: 'Few moving parts and no engine oil. Mostly tyres, brakes, and battery checks.',
        metric: '400',
        currency: '₹',
        unit: '/year',
      },
      {
        id: 4,
        icon: cardIcons[3],
        title: 'Instant Performance',
        description: 'Delivers instant torque for quick, responsive acceleration. Provides smooth and seamless driving experience.',
        metric: '0-60',
        unit: ' in 6.2s',
      }
    ]
  };

  const costBreakdownData = [
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24">
	<path fill="currentColor" d="M18 10a1 1 0 0 1-1-1a1 1 0 0 1 1-1a1 1 0 0 1 1 1a1 1 0 0 1-1 1m-6 0H6V5h6m7.77 2.23l.01-.01l-3.72-3.72L15 4.56l2.11 2.11C16.17 7 15.5 7.93 15.5 9a2.5 2.5 0 0 0 2.5 2.5c.36 0 .69-.08 1-.21v7.21a1 1 0 0 1-1 1a1 1 0 0 1-1-1V14a2 2 0 0 0-2-2h-1V5a2 2 0 0 0-2-2H6c-1.11 0-2 .89-2 2v16h10v-7.5h1.5v5A2.5 2.5 0 0 0 18 21a2.5 2.5 0 0 0 2.5-2.5V9c0-.69-.28-1.32-.73-1.77" />
</svg>
      ),
      label: 'Fuel Cost',
      value: '₹6,00,000'
    },
    {
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      ),
      label: 'Maintenance',
      value: '₹1,50,000'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 14 14">
	<g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1">
		<path d="M8.315 1.031a.5.5 0 0 0-.5.5v1.407H6.409a.5.5 0 0 0-.5.5v1.625a.5.5 0 0 0 .5.5h1.406v1.406a.5.5 0 0 0 .5.5H9.94a.5.5 0 0 0 .5-.5V5.563h1.406a.5.5 0 0 0 .5-.5V3.438a.5.5 0 0 0-.5-.5H10.44V1.53a.5.5 0 0 0-.5-.5zm-7.732 9.75l2.444 2.037a2 2 0 0 0 1.28.463h6.443c.46 0 .833-.373.833-.833c0-.92-.746-1.667-1.667-1.667H5.437" />
		<path d="m3.583 9.781l.75.75a1.06 1.06 0 1 0 1.5-1.5L4.669 7.867a2 2 0 0 0-1.414-.586H.583" />
	</g>
</svg>
      ),
      label: 'Insurance',
      value: '₹75,000'
    },
    {
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 56 56">
	<path fill="currentColor" d="M15.555 53.125h24.89c4.852 0 7.266-2.461 7.266-7.336V24.508c0-3.024-.328-4.336-2.203-6.258L32.57 5.102c-1.78-1.829-3.234-2.227-5.882-2.227H15.555c-4.828 0-7.266 2.484-7.266 7.36v35.554c0 4.898 2.438 7.336 7.266 7.336m.187-3.773c-2.414 0-3.68-1.29-3.68-3.633V10.305c0-2.32 1.266-3.657 3.704-3.657h10.406v13.618c0 2.953 1.5 4.406 4.406 4.406h13.36v21.047c0 2.343-1.243 3.633-3.68 3.633ZM31 21.132c-.914 0-1.29-.374-1.29-1.312V7.375l13.5 13.758Zm5.625 9.985h-17.79c-.843 0-1.452.633-1.452 1.43c0 .82.61 1.453 1.453 1.453h17.789a1.43 1.43 0 0 0 1.453-1.453c0-.797-.633-1.43-1.453-1.43m0 8.18h-17.79c-.843 0-1.452.656-1.452 1.476c0 .797.61 1.407 1.453 1.407h17.789c.82 0 1.453-.61 1.453-1.407c0-.82-.633-1.476-1.453-1.476" />
</svg>
      ),
      label: 'Registration',
      value: '₹25,000'
    },
  ];

  const emissionsData = [
    { year: 'Year 1', ice: 15000, electric: 2000 },
    { year: 'Year 2', ice: 14000, electric: 5000 },
    { year: 'Year 3', ice: 16500, electric: 11000 },
    { year: 'Year 4', ice: 5000, electric: 19000 },
    { year: 'Year 5', ice: 11500, electric: 21500 }
  ];

  const handleToggle = (type) => {
    setActiveVehicle(type);
  };

  return (
    <section className="comparison-section">
      <div className="container">
        {/* Header */}
        <div className="comparison-section__header">
          <h2 className="comparison-section__title">
            Why Choose Electric Over Traditional?
          </h2>
          <p className="comparison-section__subtitle">
            Electric vehicles offer numerous advantages over internal combustion engine (ICE)
            vehicles, from cost savings to environmental benefits and superior performance.
          </p>
        </div>

        {/* Toggle */}
        <div className="comparison-section__toggle">
          <button
            className={`comparison-section__toggle-btn ${activeVehicle === 'ice' ? 'comparison-section__toggle-btn--active' : ''}`}
            onClick={() => handleToggle('ice')}
          >
            ICE Vehicle
          </button>
          <button
            className={`comparison-section__toggle-btn ${activeVehicle === 'electric' ? 'comparison-section__toggle-btn--active' : ''}`}
            onClick={() => handleToggle('electric')}
          >
            Electric Vehicle
          </button>
        </div>

        {/* Comparison Cards */}
        <div className="comparison-section__cards">
          {comparisonData[activeVehicle].map((card, index) => (
            <div
              key={card.id}
              className={`comparison-card ${activeVehicle === 'electric' ? 'comparison-card--flipped' : ''}`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="comparison-card__inner">
                {/* Front (ICE) */}
                <div className="comparison-card__face comparison-card__face--front">
                  <div className="comparison-card__icon" style={{ background: cardColors.bgColors[index] }}>
                    {card.icon}
                  </div>
                  <h3 className="comparison-card__title">{comparisonData.ice[index].title}</h3>
                  <p className="comparison-card__description">
                    {comparisonData.ice[index].description}
                  </p>
                  <div className="comparison-card__metric" style={{ color: cardColors.colors[index] }}> 
                    <span className="comparison-card__metric-value">
                      {comparisonData.ice[index].currency && (
                        <span className="currency-sign">{comparisonData.ice[index].currency}</span>
                      )}
                      {comparisonData.ice[index].metric}
                    </span> 
                    <span className="comparison-card__metric-unit"> 
                      {comparisonData.ice[index].unit} 
                    </span> 
                  </div>
                </div>

                {/* Back (Electric) */}
                <div className="comparison-card__face comparison-card__face--back">
                  <div className="comparison-card__icon" style={{ background: cardColors.bgColors[index] }}>
                    {card.icon}
                  </div>
                  <h3 className="comparison-card__title">{comparisonData.electric[index].title}</h3>
                  <p className="comparison-card__description">
                    {comparisonData.electric[index].description}
                  </p>
                  <div className="comparison-card__metric" style={{ color: cardColors.colors[index] }}>
                    <span className="comparison-card__metric-value">
                      {comparisonData.electric[index].currency && (
                        <span className="currency-sign">{comparisonData.electric[index].currency}</span>
                      )}
                      {comparisonData.electric[index].metric}
                    </span>
                    <span className="comparison-card__metric-unit">
                      {comparisonData.electric[index].unit}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Section */}
        <div className="comparison-section__bottom">
          {/* Cost Breakdown */}
          <div
            className={`comparison-bottom-card ${activeVehicle === 'electric' ? 'comparison-bottom-card--flipped' : ''}`}
            style={{ animationDelay: '0.4s' }}
          >
            <div className="comparison-bottom-card__inner">
              <div className="comparison-bottom-card__face comparison-bottom-card__face--front">
                <h3 className="comparison-bottom-card__title">ICE Vehicle (5 years)</h3>
                <div className="cost-breakdown">
                  {costBreakdownData.map((item, index) => (
                    <div key={index} className="cost-breakdown__row">
                      <div className="cost-breakdown__label">
                        <span className="cost-breakdown__icon">{item.icon}</span>
                        {item.label}
                      </div>
                      <span className="cost-breakdown__value">{item.value}</span>
                    </div>
                  ))}
                  <div className="cost-breakdown__total">
                    <span className="cost-breakdown__total-label">Total Cost</span>
                    <span className="cost-breakdown__total-value">₹8,50,000</span>
                  </div>
                </div>
              </div>
              <div className="comparison-bottom-card__face comparison-bottom-card__face--back">
                <h3 className="comparison-bottom-card__title">ICE Vehicle (5 years)</h3>
                <div className="cost-breakdown">
                  {costBreakdownData.map((item, index) => (
                    <div key={index} className="cost-breakdown__row">
                      <div className="cost-breakdown__label">
                        <span className="cost-breakdown__icon">{item.icon}</span>
                        {item.label}
                      </div>
                      <span className="cost-breakdown__value">{item.value}</span>
                    </div>
                  ))}
                  <div className="cost-breakdown__total">
                    <span className="cost-breakdown__total-label">Total Cost</span>
                    <span className="cost-breakdown__total-value">₹8,50,000</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Emissions Chart */}
          <div
            className={`comparison-bottom-card ${activeVehicle === 'electric' ? 'comparison-bottom-card--flipped' : ''}`}
            style={{ animationDelay: '0.5s' }}
          >
            <div className="comparison-bottom-card__inner">
              <div className="comparison-bottom-card__face comparison-bottom-card__face--front">
                <h3 className="comparison-bottom-card__title">
                  Cumulative CO<sub>2</sub> Emissions (kg)
                </h3>
                <div className="emissions-chart">
                  <div className="emissions-chart__grid">
                    <div className="emissions-chart__y-axis">
                      <span>22K</span>
                      <span>16.5K</span>
                      <span>11K</span>
                      <span>5.5K</span>
                      <span>0K</span>
                    </div>
                    <div className="emissions-chart__bars">
                      {emissionsData.map((data, index) => (
                        <div key={index} className="emissions-chart__bar-group">
                          <div className="emissions-chart__bars-container">
                            <div
                              className="emissions-chart__bar emissions-chart__bar--electric"
                              style={{ height: `${(data.electric / 22000) * 100}%` }}
                            ></div>
                            <div
                              className="emissions-chart__bar emissions-chart__bar--ice"
                              style={{ height: `${(data.ice / 22000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="emissions-chart__label">{data.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="comparison-bottom-card__face comparison-bottom-card__face--back">
                <h3 className="comparison-bottom-card__title">
                  Cumulative CO<sub>2</sub> Emissions (kg)
                </h3>
                <div className="emissions-chart">
                  <div className="emissions-chart__grid">
                    <div className="emissions-chart__y-axis">
                      <span>22K</span>
                      <span>16.5K</span>
                      <span>11K</span>
                      <span>5.5K</span>
                      <span>0K</span>
                    </div>
                    <div className="emissions-chart__bars">
                      {emissionsData.map((data, index) => (
                        <div key={index} className="emissions-chart__bar-group">
                          <div className="emissions-chart__bars-container">
                            <div
                              className="emissions-chart__bar emissions-chart__bar--electric"
                              style={{ height: `${(data.electric / 22000) * 100}%` }}
                            ></div>
                            <div
                              className="emissions-chart__bar emissions-chart__bar--ice"
                              style={{ height: `${(data.ice / 22000) * 100}%` }}
                            ></div>
                          </div>
                          <span className="emissions-chart__label">{data.year}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Comparison;