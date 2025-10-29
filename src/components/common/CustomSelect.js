// ============================================================================
// FILE: src/components/common/CustomSelect.js
// ============================================================================

import React, { useState, useRef, useEffect, useCallback } from 'react';
import './CustomSelect.css';

const CustomSelect = ({ 
  value, 
  onChange, 
  options = [], 
  placeholder = 'Select an option', 
  disabled = false, 
  error = false,
  name = ''
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState('bottom');
  const MAX_DROPDOWN_HEIGHT = 270; // must match CSS max-height
  const [computedMaxHeight, setComputedMaxHeight] = useState(MAX_DROPDOWN_HEIGHT);
  const containerRef = useRef(null);
  const dropdownRef = useRef(null);

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Handle keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  // Calculate dropdown position based on available space
  useEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const spaceBelow = window.innerHeight - rect.bottom;
      const spaceAbove = rect.top;

      // estimate desired dropdown height (you can adjust itemHeight if needed)
      const ITEM_ESTIMATED_HEIGHT = 40; // px per item (rough)
      const desired = Math.min(MAX_DROPDOWN_HEIGHT, options.length * ITEM_ESTIMATED_HEIGHT);

      // choose placement by checking if desired fits below; otherwise check above; otherwise choose larger space
      let choose = 'bottom';
      if (spaceBelow >= desired) {
        choose = 'bottom';
      } else if (spaceAbove >= desired) {
        choose = 'top';
      } else {
        choose = (spaceBelow >= spaceAbove) ? 'bottom' : 'top';
      }

      // compute final clamped maxHeight leaving small margin (8px)
      const computedMax = choose === 'bottom'
        ? Math.max(48, Math.min(MAX_DROPDOWN_HEIGHT, spaceBelow - 8))
        : Math.max(48, Math.min(MAX_DROPDOWN_HEIGHT, spaceAbove - 8));

      setDropdownPosition(choose);
      setComputedMaxHeight(computedMax);
    }
  }, [isOpen, options.length]);

    // Scroll to selected option when dropdown opens
    useEffect(() => {
        if (isOpen && dropdownRef.current && value) {
          const selectedOption = dropdownRef.current.querySelector('.custom-select__option--selected');
          if (selectedOption) {
            selectedOption.scrollIntoView({ block: 'center', behavior: 'smooth' });
          }
        }
      }, [isOpen, value]);

  const handleToggle = useCallback(() => {
    if (!disabled) {
      setIsOpen(prev => !prev);
    }
  }, [disabled]);

  const handleOptionClick = useCallback((optionValue) => {
    onChange({ target: { name, value: optionValue } });
    setIsOpen(false);
  }, [onChange, name]);

  const getSelectedLabel = () => {
    const selected = options.find(opt => opt.value === value);
    return selected ? selected.label : placeholder;
  };

  return (
    <div 
      className={`custom-select ${disabled ? 'custom-select--disabled' : ''}`}
      ref={containerRef}
    >
      <div
        className={`custom-select__trigger ${isOpen ? 'custom-select__trigger--open' : ''} ${error ? 'custom-select__trigger--error' : ''}`}
        onClick={handleToggle}
        role="button"
        tabIndex={disabled ? -1 : 0}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        <span className={value ? 'custom-select__value' : 'custom-select__placeholder'}>
          {getSelectedLabel()}
        </span>
        <svg 
          className={`custom-select__arrow ${isOpen ? 'custom-select__arrow--open' : ''}`}
          width="12" 
          height="8" 
          viewBox="0 0 12 8" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path 
            d="M1 1.5L6 6.5L11 1.5" 
            stroke="currentColor" 
            strokeWidth="2" 
            strokeLinecap="round" 
            strokeLinejoin="round"
          />
        </svg>
      </div>

        {isOpen && (
          <div
            className={`custom-select__dropdown custom-select__dropdown--${dropdownPosition} ${dropdownPosition === 'bottom' ? 'animate-down' : 'animate-up'}`}
            ref={dropdownRef}
            role="listbox"
            style={{ maxHeight: `${computedMaxHeight}px` }}
          >
          {options.map((option) => (
            <div
              key={option.value}
              className={`custom-select__option ${value === option.value ? 'custom-select__option--selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
              role="option"
              aria-selected={value === option.value}
            >
              <span>{option.label}</span>
              {value === option.value && (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M13.3337 4L6.00033 11.3333L2.66699 8" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomSelect;
