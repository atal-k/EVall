  // ============================================================================
  // FILE: src/components/sections/TCO/TCO_Calculator.js
  // ============================================================================
  
  import React, { useState } from 'react';
  import { MODELS } from '../../../data/vanModels';
  import CalculatorForm from './CalculatorForm';
  import ResultsPanel from './ResultsPanel';
  import './TCOCalculator.css';
  
  const TCO_Calculator = () => {
    const [formData, setFormData] = useState({
      evModelId: MODELS.ev[0].id,
      iceModelId: MODELS.ice[0].id,
      compareICE: true,
      purchasePrice: 960000,
      incentive: 30000,
      ownershipPeriod: 8,
      resalePercent: 45,
      annualKm: 15000,
      electricityRate: 6.5,
      fuelRate: 110,
      evEfficiency: 18,
      iceEfficiency: 6.5,
      evMaintenance: 2000,
      iceMaintenance: 10000,
      insurance: 1
    });
  
    const [results, setResults] = useState(null);
    const [errors, setErrors] = useState({});
  
    const handleInputChange = (field, value) => {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
      // Clear error on field change
      if (errors[field]) {
        setErrors(prev => ({ ...prev, [field]: '' }));
      }
    };
  
    const handleResaleChange = (value) => {
      setFormData(prev => ({
        ...prev,
        resalePercent: value[1]
      }));
    };
  
    const handleCalculate = () => {
      const newErrors = validateInputs();
      
      if (Object.keys(newErrors).length > 0) {
        setErrors(newErrors);
        return;
      }
  
      const {
        calculateYearlyBreakdown,
        calculateTCO,
        calculateSavings,
        getInsightMessage
      } = require('../../../utils/tcoCalculations');
  
      const evModel = MODELS.ev.find(m => m.id === formData.evModelId);
      const iceModel = formData.compareICE ? MODELS.ice.find(m => m.id === formData.iceModelId) : null;
  
      // Calculate EV
      const evYearlyData = calculateYearlyBreakdown({
        purchasePrice: formData.purchasePrice,
        incentive: formData.incentive,
        annualKm: formData.annualKm,
        efficiency: formData.evEfficiency,
        energyRate: formData.electricityRate,
        maintenancePerYear: formData.evMaintenance,
        insurancePercent: formData.insurance,
        resalePercent: formData.resalePercent,
        yearsOfOwnership: 8,
        type: 'EV'
      });
  
      const evTCO = calculateTCO({
        purchasePrice: formData.purchasePrice,
        incentive: formData.incentive,
        resalePercent: formData.resalePercent,
        yearsOfOwnership: 8,
        yearlyBreakdown: evYearlyData
      });
  
      let iceYearlyData = [];
      let iceTCO = 0;
  
      if (iceModel && formData.compareICE) {
        iceYearlyData = calculateYearlyBreakdown({
          purchasePrice: iceModel.price,
          incentive: 0,
          annualKm: formData.annualKm,
          efficiency: formData.iceEfficiency,
          energyRate: formData.fuelRate,
          maintenancePerYear: formData.iceMaintenance,
          insurancePercent: formData.insurance,
          resalePercent: formData.resalePercent,
          yearsOfOwnership: 8,
          type: 'ICE'
        });
  
        iceTCO = calculateTCO({
          purchasePrice: iceModel.price,
          incentive: 0,
          resalePercent: formData.resalePercent,
          yearsOfOwnership: 8,
          yearlyBreakdown: iceYearlyData
        });
      }
  
      const savings = calculateSavings(
        evTCO,
        iceTCO,
        formData.purchasePrice,
        iceModel?.price || 0,
        formData.incentive,
        8
      );
  
      const insight = getInsightMessage(savings.savings, savings.savingsPercent, savings.paybackYears, formData.compareICE && iceModel);
  
      setResults({
        evTCO,
        iceTCO,
        evYearlyData,
        iceYearlyData,
        savings,
        insight,
        evModel,
        iceModel
      });
    };
  
    const validateInputs = () => {
      const newErrors = {};
  
      if (!formData.evModelId) newErrors.evModelId = 'Select EV model';
      if (!formData.purchasePrice || formData.purchasePrice <= 0) newErrors.purchasePrice = 'Enter valid price';
      if (formData.annualKm <= 0) newErrors.annualKm = 'Enter valid mileage';
      if (formData.electricityRate <= 0) newErrors.electricityRate = 'Enter valid rate';
      if (formData.evEfficiency <= 0) newErrors.evEfficiency = 'Enter valid efficiency';
      if (formData.evMaintenance < 0) newErrors.evMaintenance = 'Enter valid maintenance';
      if (formData.insurance < 0 || formData.insurance > 10) newErrors.insurance = 'Enter valid percentage (0-10)';
  
      if (formData.compareICE) {
        if (!formData.iceModelId) newErrors.iceModelId = 'Select ICE model';
        if (formData.fuelRate <= 0) newErrors.fuelRate = 'Enter valid fuel rate';
        if (formData.iceEfficiency <= 0) newErrors.iceEfficiency = 'Enter valid efficiency';
        if (formData.iceMaintenance < 0) newErrors.iceMaintenance = 'Enter valid maintenance';
      }
  
      return newErrors;
    };
  
    return (
      <section className="tco-calculator">
        <div className="container">
          <h2 className="tco-calculator__title">TCO Calculator</h2>
          <p className="tco-calculator__subtitle">
            Compare the Total Cost of Ownership between Electric and Traditional vehicles
          </p>
  
          <div className="tco-calculator__layout">
            <CalculatorForm
              formData={formData}
              errors={errors}
              onInputChange={handleInputChange}
              onResaleChange={handleResaleChange}
              onCalculate={handleCalculate}
            />
            {results && <ResultsPanel results={results} />}
          </div>
        </div>
      </section>
    );
  };
  
  export default TCO_Calculator;