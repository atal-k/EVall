// ============================================================================
// FILE: src/components/common/FormFields.js
// Reusable form field components with validation and state management
// ============================================================================

import React, { useState, useRef, useEffect } from 'react';
import CustomSelect from './CustomSelect';
import countryCodesData from '../../data/countryCodes.json';
import citiesData from '../../data/cities.json';
import './FormFields.css';
import { getProducts } from '../../data/vansData';

// ============================================================================
// VALIDATION UTILITIES
// ============================================================================

// Input sanitization patterns for each field type
export const sanitizePatterns = {
  name: /[^A-Za-z\s]/g,
  mobile: /[^0-9]/g,
  email: /[^A-Za-z0-9@.\-_]/g,
  pincode: /[^0-9]/g,
  message: null // No sanitization for message field
};

// Key press validation - prevent invalid characters from being typed
export const handleKeyPress = (e, fieldType) => {
  const char = e.key;
  
  // Allow special keys
  if (['Backspace', 'Delete', 'Tab', 'ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Enter', 'Escape'].includes(char)) {
    return;
  }

  // Prevent default if character doesn't match pattern
  switch (fieldType) {
    case 'name':
      if (!/[A-Za-z\s]/.test(char)) e.preventDefault();
      break;
    case 'mobile':
    case 'pincode':
      if (!/[0-9]/.test(char)) e.preventDefault();
      break;
    case 'email':
      if (!/[A-Za-z0-9@.\-_]/.test(char)) e.preventDefault();
      break;
    default:
      break;
  }
};

// Validate individual field based on type and value
export const validateField = (fieldType, value, options = {}) => {
  const trimmedValue = typeof value === 'string' ? value.trim() : value;

  switch (fieldType) {
    case 'name':
      if (!trimmedValue) return 'This field is required';
      if (!/^[A-Za-z\s]{2,}$/.test(trimmedValue)) return 'Must be at least 2 letters, alphabets only';
      break;

    case 'mobile':
      if (!trimmedValue) return 'Mobile number is required';
      if (options.countryCode === 'IN' && !/^[6-9]\d{9}$/.test(trimmedValue)) {
        return 'Enter valid 10-digit mobile number';
      }
      if (options.countryCode !== 'IN' && (trimmedValue.length < 7 || trimmedValue.length > 15)) {
        return 'Enter valid mobile number';
      }
      break;

    case 'email':
      if (trimmedValue && !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(trimmedValue)) {
        return 'Enter valid email address';
      }
      break;

    case 'pincode':
      if (!trimmedValue) return 'Pincode is required';
      if (!/^\d{6}$/.test(trimmedValue)) return 'Enter valid 6-digit pincode';
      break;
    
    case 'company':
    if (options.required && !trimmedValue) {
        return 'Company name is required';
    }
    if (trimmedValue && trimmedValue.length < 2) {
        return 'Company name must be at least 2 characters';
    }
    break;

    case 'select':
      if (!value) return 'This field is required';
      break;

    case 'message':
      if (options.required && !trimmedValue) return 'This field is required';
      if (options.maxLength && trimmedValue.length > options.maxLength) {
        return `Maximum ${options.maxLength} characters allowed`;
      }
      break;

    default:
      break;
  }

  return '';
};

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

// Convert country code to flag emoji
const getCountryFlag = (countryCode) => {
  const codePoints = countryCode.toUpperCase().split('').map(char => 127397 + char.charCodeAt());
  return String.fromCodePoint(...codePoints);
};

// Transform country codes data for dropdown
const getCountryCodesOptions = () => {
  return countryCodesData.map(country => ({
    value: country.dial_code,
    label: `${country.name} (${country.dial_code})`,
    flag: getCountryFlag(country.code),
    code: country.code
  }));
};

// ============================================================================
// FIELD COMPONENTS
// ============================================================================

/**
 * NameField - Reusable name input (firstName/lastName)
 * @param {string} name - Field identifier
 * @param {string} value - Current value
 * @param {function} onChange - Change handler (name, value)
 * @param {function} onBlur - Blur handler (name, value)
 * @param {string} error - Error message
 * @param {string} placeholder - Placeholder text
 * @param {boolean} disabled - Disable field
 * @param {string} className - Additional CSS classes
 */
export const NameField = ({ 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  placeholder = 'Name*',
  disabled = false,
  className = ''
}) => {
  // Handle input change with sanitization
  const handleChange = (e) => {
    const sanitized = e.target.value.replace(sanitizePatterns.name, '');
    onChange(name, sanitized);
  };

  // Handle blur event for validation
  const handleBlurEvent = (e) => {
    if (onBlur) onBlur(name, e.target.value);
  };

  return (
    <div className={`form-field ${className}`}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyPress(e, 'name')}
        onBlur={handleBlurEvent}
        placeholder={placeholder}
        disabled={disabled}
        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
      />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
};

/**
 * EmailField - Reusable email input
 */
export const EmailField = ({ 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  placeholder = 'Email',
  disabled = false,
  required = false,
  className = ''
}) => {
  // Handle input change with sanitization
  const handleChange = (e) => {
    const sanitized = e.target.value.replace(sanitizePatterns.email, '');
    onChange(name, sanitized);
  };

  // Handle blur event for validation
  const handleBlurEvent = (e) => {
    if (onBlur) onBlur(name, e.target.value);
  };

  return (
    <div className={`form-field ${className}`}>
      <input
        type="email"
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyPress(e, 'email')}
        onBlur={handleBlurEvent}
        placeholder={required ? `${placeholder}*` : placeholder}
        disabled={disabled}
        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
      />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
};

/**
 * PhoneField - Phone input with country code dropdown
 * @param {string} countryCode - Selected country code (e.g., 'IN')
 * @param {function} onCountryChange - Country change handler (code)
 */
export const PhoneField = ({ 
  name, 
  value, 
  onChange, 
  onBlur,
  error,
  countryCode = 'IN',
  onCountryChange,
  placeholder = 'Mobile Number*',
  disabled = false,
  maxLength = 15,
  className = ''
}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);
  const countryCodes = getCountryCodesOptions();
  const selectedCountry = countryCodes.find(c => c.code === countryCode) || countryCodes[0];

  // Handle input change with sanitization
  const handleChange = (e) => {
    const sanitized = e.target.value.replace(sanitizePatterns.mobile, '');
    onChange(name, sanitized);
  };

  // Handle blur event for validation
  const handleBlurEvent = (e) => {
    if (onBlur) onBlur(name, e.target.value);
  };

  // Toggle dropdown visibility
  const toggleDropdown = () => setIsDropdownOpen(prev => !prev);

  // Select country and close dropdown
  const selectCountry = (code) => {
    if (onCountryChange) onCountryChange(code);
    setIsDropdownOpen(false);
  };

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isDropdownOpen && !e.target.closest('.form-field__phone-wrapper')) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);

  // Scroll to selected country when dropdown opens
  useEffect(() => {
    if (isDropdownOpen && dropdownRef.current) {
      const selectedOption = dropdownRef.current.querySelector('.form-field__country-option--active');
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }
  }, [isDropdownOpen]);

  return (
    <div className={`form-field ${className}`}>
      <div className="form-field__phone-wrapper">
        {/* Country Code Dropdown */}
        <div className="form-field__country-dropdown-wrapper">
          <button
            type="button"
            className="form-field__country-button"
            onClick={toggleDropdown}
            disabled={disabled}
          >
            <span className="form-field__country-flag">{selectedCountry.flag}</span>
            <span className="form-field__country-code">{selectedCountry.value}</span>
            <span className="form-field__country-arrow">▾</span>
          </button>
          
          {/* Dropdown Menu */}
          {isDropdownOpen && (
            <div className="form-field__country-dropdown" ref={dropdownRef}>
              {countryCodes.map((country) => (
                <button
                  key={country.code}
                  type="button"
                  className={`form-field__country-option ${
                    countryCode === country.code ? 'form-field__country-option--active' : ''
                  }`}
                  onClick={() => selectCountry(country.code)}
                >
                  <span className="form-field__country-label">{country.label}</span>
                  <span className="form-field__country-flag">{country.flag}</span>
                </button>
              ))}
            </div>
          )}
        </div>
        
        {/* Mobile Input */}
        <input
          type="tel"
          name={name}
          value={value}
          onChange={handleChange}
          onKeyDown={(e) => handleKeyPress(e, 'mobile')}
          onBlur={handleBlurEvent}
          placeholder={placeholder}
          maxLength={maxLength}
          disabled={disabled}
          className={`form-field__input form-field__input--with-country ${
            error ? 'form-field__input--error' : ''
          }`}
        />
      </div>
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
};

/**
 * StateCityFields - Combined state and city selection with dependency
 * @param {object} citiesDataProp - Cities data object (optional, uses default if not provided)
 */
export const StateCityFields = ({
  stateName,
  stateValue,
  onStateChange,
  stateError,
  cityName,
  cityValue,
  onCityChange,
  cityError,
  citiesDataProp = null,
  statePlaceholder = 'Select State*',
  cityPlaceholder = 'Select City*',
  disabled = false,
  className = ''
}) => {
  const [cities, setCities] = useState([]);
  const statesData = citiesDataProp || citiesData;

  // Update cities when state changes
  useEffect(() => {
    if (stateValue && statesData[stateValue]) {
      setCities(statesData[stateValue]);
      // Clear city if not in new state's cities
      if (cityValue && !statesData[stateValue].includes(cityValue)) {
        onCityChange(cityName, '');
      }
    } else {
      setCities([]);
    }
  }, [stateValue, statesData, cityValue, cityName, onCityChange]);

  // Prepare options for CustomSelect
  const stateOptions = Object.keys(statesData).map(state => ({
    value: state,
    label: state
  }));

  const cityOptions = cities.map(city => ({
    value: city,
    label: city
  }));

  // Handle state change
  const handleStateChange = (e) => {
    onStateChange(stateName, e.target.value);
  };

  // Handle city change
  const handleCityChange = (e) => {
    onCityChange(cityName, e.target.value);
  };

  return (
    <div className={`form-field__group ${className}`}>
      <div className="form-field">
        <CustomSelect
          name={stateName}
          value={stateValue}
          onChange={handleStateChange}
          options={stateOptions}
          placeholder={statePlaceholder}
          disabled={disabled}
          error={!!stateError}
        />
        {stateError && <span className="form-field__error">{stateError}</span>}
      </div>

      <div className="form-field">
        <CustomSelect
          name={cityName}
          value={cityValue}
          onChange={handleCityChange}
          options={cityOptions}
          placeholder={cityPlaceholder}
          disabled={!stateValue || disabled}
          error={!!cityError}
        />
        {cityError && <span className="form-field__error">{cityError}</span>}
      </div>
    </div>
  );
};

/**
 * PincodeField - 6-digit pincode input
 */
export const PincodeField = ({ 
  name, 
  value, 
  onChange, 
  onBlur, 
  error, 
  placeholder = 'Pincode*',
  disabled = false,
  className = ''
}) => {
  // Handle input change with sanitization
  const handleChange = (e) => {
    const sanitized = e.target.value.replace(sanitizePatterns.pincode, '');
    onChange(name, sanitized);
  };

  // Handle blur event for validation
  const handleBlurEvent = (e) => {
    if (onBlur) onBlur(name, e.target.value);
  };

  return (
    <div className={`form-field ${className}`}>
      <input
        type="text"
        name={name}
        value={value}
        onChange={handleChange}
        onKeyDown={(e) => handleKeyPress(e, 'pincode')}
        onBlur={handleBlurEvent}
        placeholder={placeholder}
        maxLength="6"
        disabled={disabled}
        className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
      />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
};

/**
 * CompanyField - Company/Organization name input (optional/required)
 * @param {boolean} required - Make field required or optional (default: false)
 */
export const CompanyField = ({ 
    name, 
    value, 
    onChange, 
    onBlur, 
    error, 
    placeholder,
    required = false,
    disabled = false,
    className = ''
  }) => {
    // Handle input change with sanitization (allow alphanumeric + common business chars)
    const handleChange = (e) => {
      const sanitized = e.target.value.replace(/[^A-Za-z0-9\s&.,'-]/g, '');
      onChange(name, sanitized);
    };
  
    // Handle blur event for validation
    const handleBlurEvent = (e) => {
      if (onBlur) onBlur(name, e.target.value);
    };
  
    // Dynamic placeholder based on required prop
    const displayPlaceholder = placeholder || (required ? 'Company Name*' : 'Company Name');
  
    return (
      <div className={`form-field ${className}`}>
        <input
          type="text"
          name={name}
          value={value}
          onChange={handleChange}
          onBlur={handleBlurEvent}
          placeholder={displayPlaceholder}
          disabled={disabled}
          className={`form-field__input ${error ? 'form-field__input--error' : ''}`}
        />
        {error && <span className="form-field__error">{error}</span>}
      </div>
    );
  };

/**
 * ProductSelectField - Product dropdown using CustomSelect
 * @param {array} products - Array of product objects with id and name
 */
export const ProductSelectField = ({ 
  name, 
  value, 
  onChange, 
  error, 
  placeholder = 'Select a Product*',
  disabled = false,
  className = ''
}) => {
  const products = getProducts();
  const productOptions = products.map(product => ({
    value: product.id,
    label: product.name
  }));

  // Handle change event
  const handleChange = (e) => {
    onChange(name, e.target.value);
  };

  return (
    <div className={`form-field ${className}`}>
      <CustomSelect
        name={name}
        value={value}
        onChange={handleChange}
        options={productOptions}
        placeholder={placeholder}
        disabled={disabled}
        error={!!error}
      />
      {error && <span className="form-field__error">{error}</span>}
    </div>
  );
};

/**
 * MessageField - Textarea with character limit
 * @param {number} maxLength - Maximum character limit (default: 200)
 */
export const MessageField = ({ 
  name, 
  value, 
  onChange, 
  onBlur,
  error, 
  placeholder = 'Message',
  required = false,
  maxLength = 200,
  disabled = false,
  rows = 4,
  className = ''
}) => {
  const [charCount, setCharCount] = useState(value.length);

  // Handle input change
  const handleChange = (e) => {
    const newValue = e.target.value;
    if (newValue.length <= maxLength) {
      onChange(name, newValue);
      setCharCount(newValue.length);
    }
  };

  // Handle blur event for validation
  const handleBlurEvent = (e) => {
    if (onBlur) onBlur(name, e.target.value);
  };

  // Update char count when value changes externally
  useEffect(() => {
    setCharCount(value.length);
  }, [value]);

  return (
    <div className={`form-field ${className}`}>
      <textarea
        name={name}
        value={value}
        onChange={handleChange}
        onBlur={handleBlurEvent}
        placeholder={required ? `${placeholder}*` : placeholder}
        rows={rows}
        maxLength={maxLength}
        disabled={disabled}
        className={`form-field__textarea ${error ? 'form-field__textarea--error' : ''}`}
      />
      <div className="form-field__textarea-footer">
        {error && <span className="form-field__error">{error}</span>}
        <span className="form-field__char-count">{charCount}/{maxLength}</span>
      </div>
    </div>
  );
};

// ============================================================================
// EXPORTS
// ============================================================================

export default {
  NameField,
  EmailField,
  PhoneField,
  StateCityFields,
  PincodeField,
  CompanyField, 
  ProductSelectField,
  MessageField,
  // Validators
  validateField,
  sanitizePatterns,
  handleKeyPress
};