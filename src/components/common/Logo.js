// FILE: src/components/common/Logo.js
// ============================================================================

import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`logo logo--${size} ${className}`}>
      <div className="logo__icon">
        <img src="/icons/EVall-icon.svg" alt="EVall" />
      </div>
      <span className="logo__text">EVall</span>
    </div>
  );
};

export default Logo;