// ============================================================================
  // FILE: src/components/sections/TCO/CalculatorForm.js
  // ============================================================================
  
  import React, { useEffect } from 'react';
  import { MODELS } from '../../../data/vanModels';
  import RangeSlider from '../../common/RangeSlider';
  import Checkbox from '../../common/Checkbox';
  import { formatCurrency } from '../../../utils/tcoFormatter';
  import './CalculatorForm.css';


  
  const CalculatorForm = ({
    formData,
    errors,
    onInputChange,
    onResaleChange,
    onCalculate
  }) => {
    const handleModelChange = (field, value) => {
      onInputChange(field, value);
      
      // Auto-fill efficiency and maintenance from model
      if (field === 'evModelId' && value) {
        const model = MODELS.ev.find(m => m.id === value);
        if (model) {
          onInputChange('evEfficiency', Number(model.ev_eff_100) || '');
          onInputChange('evMaintenance', Number(model.maintenance) || '');
        }
      } else if (field === 'iceModelId' && value) {
        const model = MODELS.ice.find(m => m.id === value);
        if (model) {
          onInputChange('iceEfficiency', Number(model.fuel_eff_100) || '');
          onInputChange('iceMaintenance', Number(model.maintenance_estimate_per_year) || '');
        }
      }
    };
    useEffect(() => {
      onCalculate(); // ✅ auto-run once on mount
    }, []); // runs only once
  
    return (
      <form className="calculator-form">
        {/* Vehicle Selection */}
        <div className="form-section">
          <h3 className="form-section__title">Vehicle Selection</h3>
          
          <div className="form-group-double">
            <div className="form-group">
            <label className="form-label">EV Model</label>
              <select
                value={formData.evModelId}
                onChange={(e) => handleModelChange('evModelId', e.target.value)}
                className={`form-input form-select ${errors.evModelId ? 'form-input--error' : ''}`}
              >
                <option value="">Select Model</option>
                {MODELS.ev.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              {errors.evModelId && <span className="form-error">{errors.evModelId}</span>}
            </div>
  
            <div className="form-group">
              <label className="form-label">ICE Model</label>
              <select
                value={formData.iceModelId}
                onChange={(e) => handleModelChange('iceModelId', e.target.value)}
                disabled={!formData.compareICE}
                className={`form-input form-select ${!formData.compareICE ? 'form-input--disabled' : ''} ${errors.iceModelId ? 'form-input--error' : ''}`}
              >
                <option value="">Select Model</option>
                {MODELS.ice.map(model => (
                  <option key={model.id} value={model.id}>{model.name}</option>
                ))}
              </select>
              {errors.iceModelId && <span className="form-error">{errors.iceModelId}</span>}
            </div>
          </div>
  
          <div className="form-group">
            <Checkbox
              id="compare-ice"
              label="Compare with a similar ICE vehicle"
              checked={formData.compareICE}
              onChange={() => onInputChange('compareICE', !formData.compareICE)}
            />
          </div>
        </div>
  
        {/* Purchase Details */}
        <div className="form-section">
          <h3 className="form-section__title">Purchase Details</h3>
  
          <div className="form-group-double">
            <div className="form-group">
              <label className="form-label">Purchase Price (<span className="currency-sign">₹</span>)</label>
              <input
                type="number"
                value={formData.purchasePrice}
                onChange={(e) => onInputChange('purchasePrice', e.target.value)}
                placeholder="Enter Amount"
                className={`form-input ${errors.purchasePrice ? 'form-input--error' : ''}`}
                min="100000"
                max="50000000"
                step="10000"
              />
              {errors.purchasePrice && <span className="form-error">{errors.purchasePrice}</span>}
            </div>
  
            <div className="form-group">
              <label className="form-label">Incentive / Rebate (<span className="currency-sign">₹</span>)</label>
              <input
                type="number"
                value={formData.incentive}
                onChange={(e) => onInputChange('incentive', e.target.value)}
                placeholder="Enter Amount"
                className="form-input"
                min="0"
                max="5000000"
                step="10000"
              />
            </div>
          </div>
  
          <div className="form-group">
            <label className="form-label">Resale Value (%)</label>
            <RangeSlider
              min={0}
              max={100}
              step={5}
              value={[0, formData.resalePercent]}
              onChange={onResaleChange}
            />
            <div className="form-range-display">
              <span>0%</span>
              <span className="form-range-value">
                {formatCurrency((Number(formData.purchasePrice) || 0) * formData.resalePercent / 100)}
              </span>
              <span>100%</span>
            </div>
          </div>
        </div>
  
        {/* Usage & Energy */}
        <div className="form-section">
          <h3 className="form-section__title">Usage & Energy</h3>
  
          <div className="form-group">
            <label className="form-label">Annual Mileage (km)</label>
            <input
              type="number"
              value={formData.annualKm}
              onChange={(e) => onInputChange('annualKm', e.target.value)}
              placeholder="Enter Amount"
              className={`form-input ${errors.annualKm ? 'form-input--error' : ''}`}
              min="5000"
              max="100000"
              step="1000"
            />
            {errors.annualKm && <span className="form-error">{errors.annualKm}</span>}
          </div>
  
          <div className="form-group-double">
            <div className="form-group">
              <label className="form-label">Electricity Cost (<span className="currency-sign">₹</span>/kWh)</label>
              <input
                type="number"
                value={formData.electricityRate}
                onChange={(e) => onInputChange('electricityRate', e.target.value)}
                placeholder="Enter Amount"
                className={`form-input ${errors.electricityRate ? 'form-input--error' : ''}`}
                min="1"
                max="30"
                step="0.5"
              />
              {errors.electricityRate && <span className="form-error">{errors.electricityRate}</span>}
            </div>
  
            <div className="form-group">
              <label className="form-label">Fuel Price (<span className="currency-sign">₹</span>/L)</label>
              <input
                type="number"
                value={formData.fuelRate}
                onChange={(e) => onInputChange('fuelRate', e.target.value)}
                placeholder="Enter Amount"
                disabled={!formData.compareICE}
                className={`form-input ${!formData.compareICE ? 'form-input--disabled' : ''} ${errors.fuelRate ? 'form-input--error' : ''}`}
                min="80"
                max="150"
                step="1"
              />
              {errors.fuelRate && <span className="form-error">{errors.fuelRate}</span>}
            </div>
          </div>
  
          <div className="form-group-double">
            <div className="form-group">
              <label className="form-label">EV Efficiency (kWh/100km)</label>
              <input
                type="number"
                value={formData.evEfficiency}
                onChange={(e) => onInputChange('evEfficiency', e.target.value)}
                placeholder="Enter Amount"
                className={`form-input ${errors.evEfficiency ? 'form-input--error' : ''}`}
                min="10"
                max="40"
                step="0.5"
              />
              {errors.evEfficiency && <span className="form-error">{errors.evEfficiency}</span>}
            </div>
  
            <div className="form-group">
              <label className="form-label">ICE Efficiency (L/100km)</label>
              <input
                type="number"
                value={formData.iceEfficiency}
                onChange={(e) => onInputChange('iceEfficiency', e.target.value)}
                placeholder="Enter Amount"
                disabled={!formData.compareICE}
                className={`form-input ${!formData.compareICE ? 'form-input--disabled' : ''} ${errors.iceEfficiency ? 'form-input--error' : ''}`}
                min="5"
                max="25"
                step="0.5"
              />
              {errors.iceEfficiency && <span className="form-error">{errors.iceEfficiency}</span>}
            </div>
          </div>
  
          <div className="form-savings-display">
            <span>Annual Energy Savings:</span>
            <span className="form-savings-value">
              {(() => {
                const evCost =
                  ((Number(formData.annualKm) || 0) / 100) *
                  (Number(formData.evEfficiency) || 0) *
                  (Number(formData.electricityRate) || 0);

                const iceCost =
                  ((Number(formData.annualKm) || 0) / 100) *
                  (Number(formData.iceEfficiency) || 0) *
                  (Number(formData.fuelRate) || 0);

                const savings = iceCost - evCost;

                return savings >= 0 ? (
                  <>
                    +{formatCurrency(savings)}
                  </>
                ) : (
                  formatCurrency(savings)
                );
              })()}
            </span>
          </div>
        </div>
  
        {/* Maintenance & Insurance */}
        <div className="form-section">
          <h3 className="form-section__title">Maintenance & Insurance</h3>
  
          <div className="form-group-double">
            <div className="form-group">
              <label className="form-label">EV Maintenance (<span className="currency-sign">₹</span>/Year)</label>
              <input
                type="number"
                value={formData.evMaintenance}
                onChange={(e) => onInputChange('evMaintenance', e.target.value)}
                placeholder="Enter Amount"
                className={`form-input ${errors.evMaintenance ? 'form-input--error' : ''}`}
                min="0"
                max="100000"
                step="1000"
              />
              {errors.evMaintenance && <span className="form-error">{errors.evMaintenance}</span>}
            </div>
  
            <div className="form-group">
              <label className="form-label">ICE Maintenance (<span className="currency-sign">₹</span>/Year)</label>
              <input
                type="number"
                value={formData.iceMaintenance}
                onChange={(e) => onInputChange('iceMaintenance', e.target.value)}
                placeholder="Enter Amount"
                disabled={!formData.compareICE}
                className={`form-input ${!formData.compareICE ? 'form-input--disabled' : ''} ${errors.iceMaintenance ? 'form-input--error' : ''}`}
                min="0"
                max="150000"
                step="1000"
              />
              {errors.iceMaintenance && <span className="form-error">{errors.iceMaintenance}</span>}
            </div>
          </div>
  
          <div className="form-group">
            <label className="form-label">Insurance (% of Price/Year)</label>
            <input
              type="number"
              value={formData.insurance}
              onChange={(e) => onInputChange('insurance', e.target.value)}
              placeholder="Enter Percentage"
              className={`form-input ${errors.insurance ? 'form-input--error' : ''}`}
              min="0"
              max="10"
              step="0.1"
            />
            {errors.insurance && <span className="form-error">{errors.insurance}</span>}
          </div>
  
          <div className="form-savings-display">
          <span>Annual Maintenance Savings:</span>
          <span className="form-savings-value">
          {(() => {
            const savings = (Number(formData.iceMaintenance) || 0) - (Number(formData.evMaintenance) || 0);
            return savings >= 0 ? (
              <>
                +{formatCurrency(savings)}
              </>
            ) : (
              formatCurrency(savings)
            );
          })()}
        </span>
        </div>
        </div>
  
        {/* Calculate Button */}
        <button type="button" className="btn btn--primary form-button" onClick={onCalculate}>
          Calculate TCO
        </button>
      </form>
    );
  };
  
  export default CalculatorForm;