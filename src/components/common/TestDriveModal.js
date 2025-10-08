// ============================================================================
// FILE: src/components/common/TestDriveModal.js
// ============================================================================

import React, { useState, useRef, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { getProducts } from '../../data/vansData';
import citiesData from '../../data/cities.json';
import countryCodesData from '../../data/countryCodes.json';
import CustomSelect from './CustomSelect';
import './TestDriveModal.css';

const TestDriveModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    countryCode: '+91',
    mobile: '',
    email: '',
    state: '',
    city: '',
    pincode: '',
    product: ''
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statesData, setStatesData] = useState({});
  const [cities, setCities] = useState([]);
  const [products, setProducts] = useState([]);
  const [isCountryDropdownOpen, setIsCountryDropdownOpen] = useState(false);
  const countryDropdownRef = useRef(null);
  console.log(countryCodesData.length);
  

  // Load states and products on mount
  useEffect(() => {
    setStatesData(citiesData);
    const productsData = getProducts();
    setProducts(productsData);
  }, []);

  // Update cities when state changes
  useEffect(() => {
    if (formData.state && statesData[formData.state]) {
      setCities(statesData[formData.state]);
      if (formData.city && !statesData[formData.state].includes(formData.city)) {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    } else {
      setCities([]);
    }
  }, [formData.state, statesData, formData.city]);

  // Handle ESC key and body scroll
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      const handleEsc = (e) => {
        if (e.key === 'Escape') onClose();
      };
      document.addEventListener('keydown', handleEsc);
      return () => {
        document.body.style.overflow = 'unset';
        document.removeEventListener('keydown', handleEsc);
      };
    }
  }, [isOpen, onClose]);
  // Handle country dropdown close on outside click
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (isCountryDropdownOpen && !e.target.closest('.test-drive-modal__country-dropdown-wrapper')) {
        setIsCountryDropdownOpen(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isCountryDropdownOpen]);
  // Scroll to selected country when dropdown opens
  useEffect(() => {
    if (isCountryDropdownOpen && countryDropdownRef.current) {
      const selectedOption = countryDropdownRef.current.querySelector('.test-drive-modal__country-option.active');
      if (selectedOption) {
        selectedOption.scrollIntoView({ block: 'center', behavior: 'auto' });
      }
    }
  }, [isCountryDropdownOpen]);

  // Input sanitization patterns
  const sanitizePatterns = {
    firstName: /[^A-Za-z\s]/g,
    lastName: /[^A-Za-z\s]/g,
    mobile: /[^0-9]/g,
    email: /[^A-Za-z0-9@.\-_]/g,
    pincode: /[^0-9]/g
  };

  // Transform country codes data
  const getCountryFlag = (countryCode) => {
    // Convert country code to flag emoji
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char => 127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
  };
  
  const countryCodes = countryCodesData.map(country => ({
    value: country.dial_code,
    label: `${country.name} (${country.dial_code})`,
    flag: getCountryFlag(country.code),
    code: country.code
  }));

  // Key press validation - prevent invalid characters from being typed
  const handleKeyPress = (e, fieldType) => {
    const char = e.key;
    
    // Allow special keys
    if (char === 'Backspace' || char === 'Delete' || char === 'Tab' || 
        char === 'ArrowLeft' || char === 'ArrowRight' || char === 'ArrowUp' || 
        char === 'ArrowDown' || char === 'Enter' || char === 'Escape') {
      return;
    }

    // Prevent default if character doesn't match pattern
    switch (fieldType) {
      case 'name':
        if (!/[A-Za-z\s]/.test(char)) {
          e.preventDefault();
        }
        break;
      case 'mobile':
      case 'pincode':
        if (!/[0-9]/.test(char)) {
          e.preventDefault();
        }
        break;
      case 'email':
        if (!/[A-Za-z0-9@.\-_]/.test(char)) {
          e.preventDefault();
        }
        break;
      default:
        break;
    }
  };

  // Validation functions
  const validateField = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        if (!value.trim()) {
          error = 'This field is required';
        } else if (!/^[A-Za-z\s]{2,}$/.test(value)) {
          error = 'Must be at least 2 letters, alphabets only';
        }
        break;

      case 'mobile':
        if (!value.trim()) {
          error = 'Mobile number is required';
        } else {
          // Validate based on country code
          if (formData.countryCode === '+91' && !/^[6-9]\d{9}$/.test(value)) {
            error = 'Enter valid 10-digit mobile number';
          } else if (formData.countryCode !== '+91' && (value.length < 7 || value.length > 15)) {
            error = 'Enter valid mobile number';
          }
        }
        break;

      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/.test(value)) {
          error = 'Enter valid email address ';
        }
        break;

      case 'pincode':
        if (!value.trim()) {
          error = 'Pincode is required';
        } else if (!/^\d{6}$/.test(value)) {
          error = 'Enter valid 6-digit pincode';
        }
        break;

      case 'state':
      case 'city':
      case 'product':
        if (!value) {
          error = 'This field is required';
        }
        break;

      default:
        break;
    }

    return error;
  };

  // Handle input change with sanitization
  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Sanitize input based on field type
    let sanitizedValue = value;
    if (sanitizePatterns[name]) {
      sanitizedValue = value.replace(sanitizePatterns[name], '');
    }
    
    setFormData(prev => ({ ...prev, [name]: sanitizedValue }));
    
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  // Handle blur validation
  const handleBlur = (e) => {
    const { name, value } = e.target;
    const error = validateField(name, value);
    setErrors(prev => ({ ...prev, [name]: error }));
  };

  // Validate all fields
  const validateForm = () => {
    const newErrors = {};
    Object.keys(formData).forEach(key => {
      if (key !== 'countryCode') { // Skip country code validation
        const error = validateField(key, formData[key]);
        if (error) newErrors[key] = error;
      }
    });
    return newErrors;
  };

    // Toggle country code dropdown
    const toggleCountryDropdown = () => {
      setIsCountryDropdownOpen(prev => !prev);
    };
  
    // Select country code
    const handleCountryCodeSelect = (code) => {
      setFormData(prev => ({ ...prev, countryCode: code }));
      setIsCountryDropdownOpen(false);
    };

  // Handle form submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);

    // Get product name for logging
    const selectedProduct = products.find(p => p.id === formData.product);
    
    // Prepare submission data
    const submissionData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobile: `${formData.countryCode}${formData.mobile}`,
      email: formData.email || 'N/A',
      state: formData.state,
      city: formData.city,
      pincode: formData.pincode,
      product: selectedProduct?.name || formData.product,
      productId: formData.product,
      timestamp: new Date().toISOString()
    };

    // Log form data
    console.log('Test Drive Booking Data:', submissionData);

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Test drive booking successful! We will contact you shortly.');
      handleReset();
      onClose();
    }, 2000);
  };

  // Reset form
  const handleReset = () => {
    setFormData({
      firstName: '',
      lastName: '',
      countryCode: '+91',
      mobile: '',
      email: '',
      state: '',
      city: '',
      pincode: '',
      product: ''
    });
    setErrors({});
  };

  // Handle backdrop click
  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Prepare options for CustomSelect
  const stateOptions = Object.keys(statesData).map(state => ({
    value: state,
    label: state
  }));

  const cityOptions = cities.map(city => ({
    value: city,
    label: city
  }));

  const productOptions = products.map(product => ({
    value: product.id,
    label: product.name
  }));

  const countryCodeOptions = countryCodes.map(code => ({
    value: code.value,
    label: `${code.value}`
  }));

  if (!isOpen) return null;

  return ReactDOM.createPortal(
    <div className="test-drive-modal" onClick={handleBackdropClick}>
      <div className="test-drive-modal__backdrop"></div>
      <div className="test-drive-modal__container">
        {/* Header */}
        <div className="test-drive-modal__header">
          <div>
            <h2 className="test-drive-modal__title">Book a Test Drive</h2>
            <p className="test-drive-modal__subtitle">
              Fill in your details and schedule a test drive.
            </p>
          </div>
          <button
            className="test-drive-modal__close"
            onClick={onClose}
            aria-label="Close modal"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form className="test-drive-modal__form" onSubmit={handleSubmit}>
          {/* First Name & Last Name */}
          <div className="test-drive-modal__row">
            <div className="test-drive-modal__field">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyPress(e, 'name')}
                onBlur={handleBlur}
                placeholder="First Name*"
                className={`test-drive-modal__input ${errors.firstName ? 'test-drive-modal__input--error' : ''}`}
              />
              {errors.firstName && (
                <span className="test-drive-modal__error">{errors.firstName}</span>
              )}
            </div>

            <div className="test-drive-modal__field">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyPress(e, 'name')}
                onBlur={handleBlur}
                placeholder="Last Name*"
                className={`test-drive-modal__input ${errors.lastName ? 'test-drive-modal__input--error' : ''}`}
              />
              {errors.lastName && (
                <span className="test-drive-modal__error">{errors.lastName}</span>
              )}
            </div>
          </div>

          {/* Mobile & Email */}
          <div className="test-drive-modal__row">
            <div className="test-drive-modal__field">
              <div className="test-drive-modal__phone-input-wrapper">
                {/* Country Code Dropdown */}
                <div className="test-drive-modal__country-dropdown-wrapper">
                  <button
                    type="button"
                    className="test-drive-modal__country-button"
                    onClick={toggleCountryDropdown}
                  >
                    <span className="test-drive-modal__country-flag">
                            {countryCodes.find(c => c.value === formData.countryCode)?.flag || '🌐'}
                          </span>
                    <span className="test-drive-modal__country-value">{formData.countryCode}</span>
                    <span className="test-drive-modal__country-arrow">▾</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isCountryDropdownOpen && (
                    <div className="test-drive-modal__country-dropdown" ref={countryDropdownRef}>
                    {countryCodes.map((country) => (
                        <button
                          key={country.value}
                          type="button"
                          className={`test-drive-modal__country-option ${
                            formData.countryCode === country.value ? 'active' : ''
                          }`}
                          onClick={() => handleCountryCodeSelect(country.value)}
                        >
                          <span className="test-drive-modal__country-label">{country.label}</span>
                          <span className="test-drive-modal__country-flag">{country.flag}</span>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
                
                {/* Mobile Input */}
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  onKeyDown={(e) => handleKeyPress(e, 'mobile')}
                  onBlur={handleBlur}
                  placeholder="Mobile Number*"
                  maxLength="15"
                  className={`test-drive-modal__input test-drive-modal__input--with-country ${
                    errors.mobile ? 'test-drive-modal__input--error' : ''
                  }`}
                />
              </div>
              {errors.mobile && (
                <span className="test-drive-modal__error">{errors.mobile}</span>
              )}
            </div>

            <div className="test-drive-modal__field">
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                onKeyDown={(e) => handleKeyPress(e, 'email')}
                onBlur={handleBlur}
                placeholder="Email"
                className={`test-drive-modal__input ${errors.email ? 'test-drive-modal__input--error' : ''}`}
              />
              {errors.email && (
                <span className="test-drive-modal__error">{errors.email}</span>
              )}
            </div>
          </div>

          {/* State & City */}
          <div className="test-drive-modal__row">
            <div className="test-drive-modal__field">
              <CustomSelect
                name="state"
                value={formData.state}
                onChange={handleChange}
                options={stateOptions}
                placeholder="Select State*"
                error={!!errors.state}
              />
              {errors.state && (
                <span className="test-drive-modal__error">{errors.state}</span>
              )}
            </div>

            <div className="test-drive-modal__field">
              <CustomSelect
                name="city"
                value={formData.city}
                onChange={handleChange}
                options={cityOptions}
                placeholder="Select City*"
                disabled={!formData.state}
                error={!!errors.city}
              />
              {errors.city && (
                <span className="test-drive-modal__error">{errors.city}</span>
              )}
            </div>
          </div>

          {/* Pincode */}
          <div className="test-drive-modal__field">
            <input
              type="text"
              name="pincode"
              value={formData.pincode}
              onChange={handleChange}
              onKeyDown={(e) => handleKeyPress(e, 'pincode')}
              onBlur={handleBlur}
              placeholder="Pincode*"
              maxLength="6"
              className={`test-drive-modal__input ${errors.pincode ? 'test-drive-modal__input--error' : ''}`}
            />
            {errors.pincode && (
              <span className="test-drive-modal__error">{errors.pincode}</span>
            )}
          </div>

          {/* Product */}
          <div className="test-drive-modal__field">
            <CustomSelect
              name="product"
              value={formData.product}
              onChange={handleChange}
              options={productOptions}
              placeholder="Select a Product*"
              error={!!errors.product}
            />
            {errors.product && (
              <span className="test-drive-modal__error">{errors.product}</span>
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="test-drive-modal__submit"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="test-drive-modal__spinner"></span>
                Booking...
              </>
            ) : (
              <>
                Book a Test Ride
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M5 12h14M12 5l7 7-7 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </>
            )}
          </button>

          {/* Privacy Policy */}
          <p className="test-drive-modal__privacy">
            By clicking on "Book a Test Ride" you agree to our{' '}
            <a href="/privacy-policy" target="_blank" rel="noopener noreferrer">
              Privacy Policy
            </a>{' '}
            and allow us to contact you.
          </p>
        </form>
      </div>
    </div>,
    document.body
  );
};

export default TestDriveModal;