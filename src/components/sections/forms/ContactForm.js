// ContactForm.js
import React, { useState } from 'react';
import {
  NameField,
  EmailField,
  PhoneField,
  StateCityFields,
  ProductSelectField,
  MessageField,
  CompanyField,
  validateField
} from '../../common/FormFields';
import { getProducts } from '../../../data/vansData';
import Checkbox from '../../common/Checkbox';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    countryCode: 'IN',
    mobile: '',
    company: '',
    state: '',
    city: '',
    vehicleType: '',
    message: '',
    consent1: false,
    consent2: false
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFieldChange = (name, value) => {
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const handleCountryChange = (code) => {
    setFormData(prev => ({ ...prev, countryCode: code }));
    if (errors.mobile) setErrors(prev => ({ ...prev, mobile: '' }));
  };

  const handleCheckboxChange = (id, valueOrEvent) => {
    const checked =
      typeof valueOrEvent === 'boolean'
        ? valueOrEvent
        : valueOrEvent?.target?.checked ?? false;
  
    setFormData(prev => ({ ...prev, [id]: checked }));
  
    if (errors[id]) {
      setErrors(prev => ({ ...prev, [id]: '' }));
    }
  };
  const handleFieldBlur = (name, value) => {
    let error = '';

    switch (name) {
      case 'firstName':
      case 'lastName':
        error = validateField ? validateField('name', value) : '';
        break;
      case 'email':
        error = validateField ? validateField('email', value) : '';
        break;
      case 'mobile':
        error = validateField ? validateField('mobile', value, { countryCode: formData.countryCode }) : '';
        break;
      case 'message':
        error = validateField ? validateField('message', value, { required: true, maxLength: 1000 }) : '';
        break;
      case 'vehicleType':
        if (!value) error = 'Vehicle Type is required';
        break;
      case 'state':
        if (!value) error = 'State is required';
        break;
      case 'city':
        if (!value) error = 'City is required';
        break;
      default:
        break;
    }

    if (error) setErrors(prev => ({ ...prev, [name]: error }));
  };

  const validateForm = () => {
    const newErrors = {};

    const firstNameError = validateField ? validateField('name', formData.firstName) : '';
    if (firstNameError) newErrors.firstName = firstNameError;

    const lastNameError = validateField ? validateField('name', formData.lastName) : '';
    if (lastNameError) newErrors.lastName = lastNameError;

    const emailError = validateField ? validateField('email', formData.email) : '';
    if (emailError) newErrors.email = emailError;

    const mobileError = validateField ? validateField('mobile', formData.mobile, { countryCode: formData.countryCode }) : '';
    if (mobileError) newErrors.mobile = mobileError;

    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.vehicleType) newErrors.vehicleType = 'Vehicle Type is required';

    const messageError = validateField ? validateField('message', formData.message, { required: true, maxLength: 1000 }) : '';
    if (messageError) newErrors.message = messageError;

    if (!formData.consent1) newErrors.consent1 = 'Consent is required';
    if (!formData.consent2) newErrors.consent2 = 'Consent is required';

    return newErrors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }

    setIsSubmitting(true);
    const payload = { ...formData };
    console.log('Submitting Contact Form:', payload);

    setTimeout(() => {
      setIsSubmitting(false);
      alert('Form submitted successfully!');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        countryCode: 'IN',
        mobile: '',
        company: '',
        state: '',
        city: '',
        vehicleType: '',
        message: '',
        consent1: false,
        consent2: false
      });
      setErrors({});
    }, 1500);
  };

  const products = getProducts ? getProducts() : [];

  return (
    <div className="contact-form">
      <h2 className="contact-form__heading">Let's Get Started</h2>
      <p className="contact-form__subtitle">
        Team EVall Mobility is happy to assist. Contact us and we will discuss how we can help you with EV technology. You'll hear back from us within 24 hours.
      </p>

      <form onSubmit={handleSubmit} noValidate>
        <div className="contact-form__grid">
          {/* First / Last Name */}
          <NameField
            name="firstName"
            value={formData.firstName}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={errors.firstName}
            placeholder="First Name*"
          />
          <NameField
            name="lastName"
            value={formData.lastName}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={errors.lastName}
            placeholder="Last Name*"
          />

          {/* Mobile / Email */}
          <PhoneField
            name="mobile"
            value={formData.mobile}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={errors.mobile}
            countryCode={formData.countryCode}
            onCountryChange={handleCountryChange}
          />
          <EmailField
            name="email"
            value={formData.email}
            onChange={handleFieldChange}
            onBlur={handleFieldBlur}
            error={errors.email}
            required
          />

          {/* State / City */}
          <div className="contact-form__full">
          <StateCityFields
            stateName="state"
            stateValue={formData.state}
            onStateChange={handleFieldChange}
            stateError={errors.state}
            cityName="city"
            cityValue={formData.city}
            onCityChange={handleFieldChange}
            cityError={errors.city}
            statePlaceholder="Select State*"
            cityPlaceholder="Select City*"
          />
          </div>

          {/* Company (full width) */}
          <div className="contact-form__full">
            <CompanyField
              name="company"
              value={formData.company}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              error={errors.company}
              required={false}
              placeholder="Company (Optional)"
            />
          </div>

          {/* Vehicle Type */}
          <div className="contact-form__full">
            <ProductSelectField
              name="vehicleType"
              value={formData.vehicleType}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              error={errors.vehicleType}
              options={products}
              placeholder="Select a Product*"
            />
          </div>

          {/* Message */}
          <div className="contact-form__full">
            <MessageField
              name="message"
              value={formData.message}
              onChange={handleFieldChange}
              onBlur={handleFieldBlur}
              error={errors.message}
              placeholder="Message"
              required
              maxLength={1000}
            />
          </div>

          {/* Checkboxes */}
          <div className="contact-form__full contact-form__checkboxes">
            <Checkbox
              id="consent1"
              label="By submitting, you consent to receive a call back from EVall Mobility and its authorized partners regarding your interest in EVall products, adhering to the communication guidelines provided."
              checked={formData.consent1}
              onChange={(checked) => handleCheckboxChange('consent1', checked)}
            />
            {errors.consent1 && <div className="contact-form__error">{errors.consent1}</div>}

            <Checkbox
              id="consent2"
              label="You also agree to our Terms of Use and Privacy Policy as listed on the website."
              checked={formData.consent2}
              onChange={(checked) => handleCheckboxChange('consent2', checked)}
            />
            {errors.consent2 && <div className="contact-form__error">{errors.consent2}</div>}
          </div>

          {/* Submit */}
          <div className="contact-form__full contact-form__actions">
            <button
              type="submit"
              className="contact-form__submit"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ContactForm;