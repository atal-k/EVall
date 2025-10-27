// ============================================
// 📁 src/pages/VehicleShowcase.js
// ============================================

import React from 'react';
import TechnicalDetails from '../components/sections/TechnicalDetails';
import Callout from '../components/sections/Callout';
import ExteriorFeatures from '../components/sections/ExteriorFeatures';
import InteriorFeatures from '../components/sections/InteriorFeatures';

const VehicleShowcase = () => {

    return (
        <>
          <div className="app">
            <main>
              <TechnicalDetails/>
              <ExteriorFeatures/>
              <InteriorFeatures/>
              <Callout/>
            </main>
          </div>
        </>
      );
};

export default VehicleShowcase;

