  // ============================================================================
  // FILE: src/components/sections/TCO/ResultsPanel.js
  // ============================================================================
  
  import React from 'react';
  import { formatCurrency, formatPercentage } from '../../../utils/tcoFormatter';
  import CostBreakdownTable from './CostBreakdownTable';
  import './ResultsPanel.css';
import BarChart from './BarChart';

const ResultsPanel = ({ results }) => {
    const { evTCO, iceTCO, savings, insight, evYearlyData, iceYearlyData } = results;
  
    const getInsightIcon = () => {
      if (insight.type === 'success') {
        return (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" fill="currentColor"/>
          </svg>
        );
      }
      return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 15h-2v-2h2v2zm0-4h-2V7h2v6z" fill="currentColor"/>
        </svg>
      );
    };
  
    return (
      <div className="results-panel">
        {/* Results Header with Export */}
        <div className="results-panel__header">
          <h3 className="results-panel__title">Results</h3>
          <button className="results-panel__export">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              <polyline points="14 2 14 8 20 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
            Export
          </button>
        </div>
  
        {/* Summary Cards */}
        <div className="results-grid">

  {/* EV CARD */}
  <div className="result-card result-card--ev">
    <div className="result-card__content">
      <div className="result-card__head">
        <div className="result-card__icon">
          <img src="/icons/van.svg" alt="EV Icon" />
        </div>
        <p className="result-card__label">EV Total Cost of Ownership</p>
      </div>
      <p className="result-card__value">{formatCurrency(1000000, 'long')}</p> 
      {/* <p className="result-card__value">{formatCurrency(evTCO)}</p> */}
      <p className="result-card__period">Over 8 years</p>
    </div>
  </div>

  {/* ICE CARD */}
  <div className="result-card result-card--ice">
    <div className="result-card__content">
      <div className="result-card__head">
        <div className="result-card__icon">
          <img src="/icons/van.svg" alt="ICE Icon" />
        </div>
        <p className="result-card__label">ICE Total Cost of Ownership</p>
      </div>
      <p className="result-card__value">{formatCurrency(iceTCO, 'long')}</p>
      <p className="result-card__period">Over 8 years</p>
    </div>
  </div>

  {/* SAVINGS CARD */}
  <div className="result-card result-card--savings">
    <div className="result-card__content">
      <div className="result-card__head">
        <div className="result-card__icon">
          <img src="/icons/moving_line.svg" alt="Savings Icon" />
        </div>
        <p className="result-card__label">Savings</p>
      </div>
      <p className="result-card__value">{formatCurrency(740000, 'long')}</p>
      <p className="result-card__period">
        {savings.paybackYears > 100 || !isFinite(savings.paybackYears)
          ? 'Never pays back'
          : `EV pays back in ${savings.paybackYears.toFixed(1)} years`}
      </p>
    </div>
  </div>

</div>

        {/* Insight Message */}
        <div className={`insight-box insight-box--${insight.type}`}>
          <span className="insight-box__icon">{getInsightIcon()}</span>
          <div className="insight-box__content">
            <p className="insight-box__text">{insight.text}</p>
          </div>
        </div>
  
        {/* Cost Breakdown Table */}
        <div className="results-section">
          <h4 className="results-section__title">Yearly Cost Breakdown</h4>
          <CostBreakdownTable evData={evYearlyData} iceData={iceYearlyData} />
        </div>
  

        {/* Cost Comparison Chart */}
        <div className="results-section">
          <h4 className="results-section__title">Cost Comparison Over Time</h4>
          <div className="chart-container">
            <BarChart
              data={[
                { label: 'Year 1', firstValue: 600000, secondValue: 1500000 },
                { label: 'Year 1', firstValue: 500000, secondValue: 1700000 },
                { label: 'Year 2', firstValue: 1200000, secondValue: 1500000 },
                { label: 'Year 3', firstValue: 200000, secondValue: 400000 },
                { label: 'Year 4', firstValue: 1200000, secondValue: 2000000 },
                { label: 'Year 5', firstValue: 900000, secondValue: 1400000 },
                { label: 'Year 6', firstValue: 1200000, secondValue: 1800000 },
                { label: 'Year 7', firstValue: 1000000, secondValue: 1800000 },
                { label: 'Year 8', firstValue: 1200000, secondValue: 2100000 }
              ]}
              firstBarColor="var(--color-eve-green)"
              secondBarColor="var(--color-ice-blue)"
              firstBarLabel="EV"
              secondBarLabel="ICE"
            />
          </div>
        </div>

      </div>
    );
  };
  
  export default ResultsPanel;