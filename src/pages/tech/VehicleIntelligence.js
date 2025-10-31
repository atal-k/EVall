// ============================================
// src/pages/VehicleIntelligence.js
// ============================================

import React from 'react';
import HeaderBanner from '../../components/layout/HeaderBanner';
import Callout from '../../components/sections/Callout';
import { intelligentCapabilitiesData,benefitsData } from '../../data/vehicleIntelligenceData';
import BenefitSection from '../../components/sections/BenefitSection';
import IntelligentCapabilities from '../../components/sections/IntelligentCapabilities';


const VehicleIntelligence = () => {

    return (
        <div className="vehicle-intelligence-page">
          <HeaderBanner
            variant='intelligence-banner'
            title="Advanced Vehicle Intelligence for Automotive Industry"
            heading="Building the Advanced New Age Vehicles for the future"
            subtitle="Enabling seamless and secure EV connectivity with an intelligent cloud-powered platform that keeps every EVall giant on the move smarter, safer, and stronger."
            button="Explore Now"
            backgroundImage = '../images/header-banner-van.webp' 
          />

          {/* Intelligent Capablitlies section */}
          <IntelligentCapabilities data={intelligentCapabilitiesData} />
          {/* Advance Intelligence banner */}
          <HeaderBanner
            variant='intelligence-banner adv-intelligence-banner'
            heading="Advanced Vehicle Intelligence"
            subtitle="At EVall Mobility, our electric commercial vehicles not only operate on clean energy but are also equipped with advanced and well curated vehicle intelligence systems designed to take efficiency, safety, and fleet productivity to the next level. Understanding India's unique challenges in logistics, we leverage advanced telematics and AI-based technologies to empower businesses with real-time operational oversight and actionable intelligence."
            backgroundImage='../images/header-banner-van.webp'
          />
          {/* Benefits section */}
          <BenefitSection data={benefitsData} />
          <Callout/>
        </div>
      );
    };
  export default VehicleIntelligence;