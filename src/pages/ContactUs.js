// ============================================
// src/pages/ContactUs.js
// ============================================

import React from 'react';
import HeaderBanner from '../components/layout/HeaderBanner';
import ContactSection from '../components/sections/ContactSection';
import Callout from '../components/sections/Callout';

const ContactUs = () => {

    return (
        <div className="contact-us-page">
          <HeaderBanner 
            heading="Contact Us"
            subtitle="The shift to electric mobility is inevitable, and essential."
          />
          <ContactSection/>
          <Callout/>
        </div>
      );
    };
  export default ContactUs;