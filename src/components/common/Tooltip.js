// ============================================================================
// FILE: /src/components/common/Tooltip.jsx
// ============================================================================

import React from 'react';
import './Tooltip.css';

const Tooltip = ({ position, index, isActive, onClick }) => {
  return (
    <button
      className={`tooltip ${isActive ? 'tooltip--active' : ''}`}
      style={{
        top: position.top,
        left: position.left,
        right: position.right,
        bottom: position.bottom
      }}
      onClick={onClick}
      aria-label={`View feature ${index}`}
    >
      <span className="tooltip__spot"></span>
      <span className="tooltip__pulse"></span>
    </button>
  );
};

export default Tooltip;