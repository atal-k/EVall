// FILE: src/components/common/Logo.js
// ============================================================================

import React from 'react';
import './Logo.css';

const Logo = ({ size = 'medium', color='black', className = '' }) => {
  let iconSrc = color === 'white' ? 'EVall-icon' : 'EVall-icon-black'
  return (
    <div className={`logo logo--${size} ${className}`}>
      <div className="logo__icon">
      <img src={`/icons/${iconSrc}.svg`} alt="EVall" />
      </div>
      <span className="logo__text">EVall</span>
    </div>
  );
};

export default Logo;