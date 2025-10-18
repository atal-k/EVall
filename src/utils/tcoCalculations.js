// ============================================================================
  // FILE: src/utils/tcoCalculations.js
  // ============================================================================
  
  /**
   * Calculate annual energy consumption and cost
   */
  export const calculateAnnualEnergyCost = (
    annualKm,
    efficiency,
    rate,
    type = 'EV'
  ) => {
    if (!annualKm || !efficiency || !rate) return 0;
    const consumption = (annualKm * efficiency) / 100;
    return consumption * rate;
  };
  
  /**
   * Calculate annual depreciation (straight-line)
   */
  export const calculateAnnualDepreciation = (
    purchasePrice,
    resalePercent,
    yearsOfOwnership
  ) => {
    if (!purchasePrice || !yearsOfOwnership) return 0;
    const resaleValue = (purchasePrice * resalePercent) / 100;
    return (purchasePrice - resaleValue) / yearsOfOwnership;
  };
  
  /**
   * Calculate annual insurance
   */
  export const calculateAnnualInsurance = (purchasePrice, insurancePercent) => {
    if (!purchasePrice) return 0;
    return (purchasePrice * insurancePercent) / 100;
  };
  
  /**
   * Calculate yearly cost breakdown for a single vehicle
   */
  export const calculateYearlyBreakdown = (params) => {
    const {
      purchasePrice,
    //   incentive = 0,
      annualKm = 0,
      efficiency = 0,
      energyRate = 0,
      maintenancePerYear = 0,
      insurancePercent = 0,
      resalePercent = 40,
      yearsOfOwnership = 8,
      type = 'EV'
    } = params;
  
    const yearlyData = [];
    const annualEnergyCost = calculateAnnualEnergyCost(annualKm, efficiency, energyRate, type);
    const annualDepreciation = calculateAnnualDepreciation(purchasePrice, resalePercent, yearsOfOwnership);
    const annualInsurance = calculateAnnualInsurance(purchasePrice, insurancePercent);
  
    for (let year = 1; year <= yearsOfOwnership; year++) {
      const energyCost = annualEnergyCost;
      const maintenance = maintenancePerYear;
      const depreciation = annualDepreciation;
      const insurance = annualInsurance;
      const yearlyTotal = energyCost + maintenance + depreciation + insurance;
  
      yearlyData.push({
        year,
        energyCost,
        maintenance,
        depreciation,
        insurance,
        yearlyTotal
      });
    }
  
    return yearlyData;
  };
  
  /**
   * Calculate total cost of ownership
   */
  export const calculateTCO = (params) => {
    const {
      purchasePrice,
      incentive = 0,
      resalePercent = 40,
    //   yearsOfOwnership = 8,
      yearlyBreakdown = []
    } = params;
  
    const netPurchasePrice = purchasePrice - incentive;
    const resaleValue = (purchasePrice * resalePercent) / 100;
    const totalOperatingCosts = yearlyBreakdown.reduce(
      (sum, year) => sum + year.yearlyTotal,
      0
    );
  
    const tco = netPurchasePrice + totalOperatingCosts - resaleValue;
    return Math.max(0, tco);
  };
  
  /**
   * Calculate savings and payback period
   */
  export const calculateSavings = (evTCO, iceTCO, evPurchase, icePurchase, incentive, yearsOfOwnership) => {
    const savings = iceTCO - evTCO;
    const savingsPercent = iceTCO > 0 ? (savings / iceTCO) * 100 : 0;
  
    // Payback period: (initial cost difference) / (annual operating cost difference)
    const initialCostDiff = (evPurchase - incentive) - icePurchase;
    
    // Calculate annual operating costs (excluding depreciation from initial purchase)
    // This is simplified - typically done year by year
    const paybackYears = initialCostDiff > 0 && yearsOfOwnership > 0 
      ? Math.min(initialCostDiff / ((iceTCO - evTCO) / yearsOfOwnership), yearsOfOwnership)
      : yearsOfOwnership;
  
    return {
      savings: Math.max(0, savings),
      savingsPercent: Math.max(0, savingsPercent),
      paybackYears: Math.max(0, paybackYears)
    };
  };
  
  /**
   * Generate dynamic insight message
   */
  export const getInsightMessage = (savings, savingsPercent, paybackYears, hasICE) => {
    if (!hasICE) {
      return {
        text: 'Select an ICE model and check "Compare with similar ICE vehicle" to see comparison and savings.',
        type: 'info'
      };
    }
  
    if (savings <= 0) {
      return {
        text: 'Based on your usage, ICE may be more cost-effective. However, consider environmental benefits of EV.',
        type: 'neutral'
      };
    }
  
    if (paybackYears <= 1) {
      return {
        text: `Great choice! Switching to EV will save you ₹${(savings / 100000).toFixed(1)}L and break even in just 1 year!`,
        type: 'success'
      };
    }
  
    if (paybackYears <= 3) {
      return {
        text: `Excellent! EV saves ₹${(savings / 100000).toFixed(1)}L over 8 years with break-even in ${paybackYears.toFixed(1)} years.`,
        type: 'success'
      };
    }
  
    return {
      text: `Good savings potential! EV saves ₹${(savings / 100000).toFixed(1)}L with payback in ${paybackYears.toFixed(1)} years.`,
      type: 'info'
    };
  };