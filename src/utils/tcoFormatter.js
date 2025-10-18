// ============================================================================
  // FILE: src/utils/tcoFormatter.js
  // ============================================================================
  
  /**
   * Format number as Indian currency
   */
  // export const formatCurrency = (value) => {
  //   if (!value && value !== 0) return '₹0';
    
  //   const num = Math.abs(Math.round(value));
    
  //   if (num >= 10000000) {
  //     return `₹${(num / 10000000).toFixed(1)}Cr`;
  //   }
  //   if (num >= 100000) {
  //     return `₹${(num / 100000).toFixed(1)}L`;
  //   }
  //   if (num >= 1000) {
  //     return `₹${(num / 1000).toFixed(1)}K`;
  //   }
    
  //   return `₹${num}`;
  // };
  
  /**
   * Format percentage
   */
  export const formatPercentage = (value) => {
    if (!value && value !== 0) return '0%';
    return `${Math.round(value)}%`;
  };
  
  /**
   * Format large numbers for display
   */
  export const formatNumber = (value) => {
    if (!value && value !== 0) return '0';
    return Math.round(value).toLocaleString('en-IN');
  };
/**
 * Format currency with max 4 digits using fractions
 */

// ResultsPanel / utils file where you use React

export const formatCurrency = (value, format = 'full') => {
  const rupeeSign = <span className="currency-sign">₹</span>;

  if (value == null || isNaN(value)) {
    return <>{rupeeSign}0</>;
  }

  const num = Math.abs(Math.round(value));

  // Format with Indian numbering system commas (default)
  if (format === 'full') {
    const formatted = num.toLocaleString('en-IN');
    return <>{rupeeSign}{formatted}</>;
  }

  // Determine unit and divisor
  let divisor, unit, fullUnit;
  
  if (num >= 10000000) {
    divisor = 10000000;
    unit = 'Cr';
    fullUnit = 'Crore';
  } else if (num >= 100000) {
    divisor = 100000;
    unit = 'L';
    fullUnit = 'Lakh';
  } else if (num >= 1000) {
    divisor = 1000;
    unit = 'K';
    fullUnit = 'Thousand';
  } else {
    return <>{rupeeSign}{num}</>;
  }

  const val = num / divisor;
  const rounded = val >= 100 ? Math.round(val) : val.toFixed(1);
  const suffix = format === 'long' ? ` ${fullUnit}` : unit;

  return <>{rupeeSign}{rounded}{suffix}</>;
};