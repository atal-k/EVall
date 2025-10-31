// ============================================
// src/pages/AboutUs.js
// ============================================

import React from 'react';
import Callout from '../components/sections/Callout';
import HeaderBanner from '../components/layout/HeaderBanner';
import AlternateLayout from '../components/common/AlternateLayout';
import TabView from '../components/common/TabView';
import LeadershipSection from '../components/sections/LeadershipSection';
import GreenSolutionBanner from '../components/layout/GreenSolutionBanner';
import { aboutData, tabViewData, leadershipData } from '../data/aboutData';

const AboutUs = () => {

  
    return (
      <div className="about-us-page">
        <HeaderBanner 
          heading="About Us"
          subtitle="The shift to electric mobility is inevitable, and essential."
        />
        <AlternateLayout data={aboutData} />
        <TabView data={tabViewData}/>
        <LeadershipSection data={leadershipData}/>
        <GreenSolutionBanner/>
        <Callout/>
      </div>
    );
  };
export default AboutUs;


