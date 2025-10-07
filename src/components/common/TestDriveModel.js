// ============================================================================
// FILE: src/components/common/TestDriveModal.js
// ============================================================================

import React, { useState, useEffect } from 'react';
import { getProducts } from '../../data/vansData';
import citiesData from '../../data/cities.json';
import './TestDriveModel.css'

const TestDriveModal = ({ isOpen, onClose }) => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
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

  // Load states and products on mount
  useEffect(() => {
  // Set cities data from import
  setStatesData(citiesData);

  // Load products
  const productsData = getProducts();
  console.log(productsData);
  
  setProducts(productsData);
  }, []);

  // Update cities when state changes
  useEffect(() => {
    if (formData.state && statesData[formData.state]) {
      setCities(statesData[formData.state]);
      // Reset city if previously selected city is not in new list
      if (formData.city && !statesData[formData.state].includes(formData.city)) {
        setFormData(prev => ({ ...prev, city: '' }));
      }
    } else {
      setCities([]);
    }
  }, [formData.state, statesData]);

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
        } else if (!/^[6-9]\d{9}$/.test(value)) {
          error = 'Enter valid 10-digit mobile number';
        }
        break;

      case 'email':
        if (value.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
          error = 'Enter valid email address';
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

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error on change
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
      const error = validateField(key, formData[key]);
      if (error) newErrors[key] = error;
    });
    return newErrors;
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

    // Simulate API call with 2 second delay
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

  if (!isOpen) return null;

  return (
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
              <input
                type="tel"
                name="mobile"
                value={formData.mobile}
                onChange={handleChange}
                onBlur={handleBlur}
                placeholder="Mobile Number*"
                maxLength="10"
                className={`test-drive-modal__input ${errors.mobile ? 'test-drive-modal__input--error' : ''}`}
              />
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
              <select
                name="state"
                value={formData.state}
                onChange={handleChange}
                onBlur={handleBlur}
                className={`test-drive-modal__select ${errors.state ? 'test-drive-modal__input--error' : ''}`}
              >
                <option value="">Select State*</option>
                {Object.keys(statesData).map(state => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
              {errors.state && (
                <span className="test-drive-modal__error">{errors.state}</span>
              )}
            </div>

            <div className="test-drive-modal__field">
              <select
                name="city"
                value={formData.city}
                onChange={handleChange}
                onBlur={handleBlur}
                disabled={!formData.state}
                className={`test-drive-modal__select ${errors.city ? 'test-drive-modal__input--error' : ''}`}
              >
                <option value="">Select City*</option>
                {cities.map(city => (
                  <option key={city} value={city}>{city}</option>
                ))}
              </select>
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
            <select
              name="product"
              value={formData.product}
              onChange={handleChange}
              onBlur={handleBlur}
              className={`test-drive-modal__select ${errors.product ? 'test-drive-modal__input--error' : ''}`}
            >
              <option value="">Select a Product*</option>
              {products.map(product => (
                <option key={product.id} value={product.id}>
                  {product.name}
                </option>
              ))}
            </select>
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
    </div>
  );
};

export default TestDriveModal;