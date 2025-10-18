  // ============================================================================
  // FILE: src/components/sections/TCO/CostBreakdownTable.js
  // ============================================================================

  import React, { useRef, useState, useEffect } from 'react';
import { formatCurrency } from '../../../utils/tcoFormatter';
import './CostBreakdownTable.css';

const CostBreakdownTable = ({ evData, iceData }) => {
  const containerRef = useRef(null);
  const [scrollState, setScrollState] = useState({
    showLeftShadow: false,
    showRightShadow: false
  });
  const hasICE = iceData && iceData.length > 0;

  const handleScroll = () => {
    if (!containerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
    
    setScrollState({
      showLeftShadow: scrollLeft > 10,
      showRightShadow: scrollLeft < scrollWidth - clientWidth - 10
    });
  };

  useEffect(() => {
    handleScroll(); // Check initial state
  }, []);

  return (
    <div 
      className={`breakdown-table-container ${scrollState.showLeftShadow ? 'shadow-left' : ''} ${scrollState.showRightShadow ? 'shadow-right' : ''}`}
      ref={containerRef}
      onScroll={handleScroll}
    >
      <table className="breakdown-table">
        <thead>
          <tr>
            <th>Year</th>
            <th>EV Energy</th>
            <th>ICE Energy</th>
            <th>EV Maintenance</th>
            <th>ICE Maintenance</th>
            <th>EV Depreciation</th>
            <th>ICE Depreciation</th>
            <th>EV Total</th>
            <th>ICE Total</th>
          </tr>
        </thead>
        <tbody>
          {evData.map((evYear, idx) => {
            const iceYear = hasICE ? iceData[idx] : null;
            return (
              <tr key={idx}>
                <td className="breakdown-table__year">{evYear.year} Year</td>
                <td className="breakdown-table__cell breakdown-table__cell--ev">
                  {formatCurrency(evYear.energyCost)}
                </td>
                <td className="breakdown-table__cell breakdown-table__cell--ice">
                  {iceYear ? formatCurrency(iceYear.energyCost) : '—'}
                </td>
                <td className="breakdown-table__cell breakdown-table__cell--ev">
                  {formatCurrency(evYear.maintenance)}
                </td>
                <td className="breakdown-table__cell breakdown-table__cell--ice">
                  {iceYear ? formatCurrency(iceYear.maintenance) : '—'}
                </td>
                <td className="breakdown-table__cell breakdown-table__cell--ev">
                  {formatCurrency(evYear.depreciation)}
                </td>
                <td className="breakdown-table__cell breakdown-table__cell--ice">
                  {iceYear ? formatCurrency(iceYear.depreciation) : '—'}
                </td>
                <td className="breakdown-table__cell breakdown-table__cell--total breakdown-table__cell--ev">
                  {formatCurrency(206000)}
                </td>
                <td className="breakdown-table__cell breakdown-table__cell--total breakdown-table__cell--ice">
                  {iceYear ? formatCurrency(iceYear.yearlyTotal) : '—'}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default CostBreakdownTable;