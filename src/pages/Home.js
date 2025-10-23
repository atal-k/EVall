// ============================================
// 📁 src/pages/Home.js
// ============================================
import React from 'react';
import Hero from '../components/sections/Hero';
import Testimonials from '../components/sections/Testimonials'
import Models from '../components/sections/Models';
import Comparison from '../components/sections/Comparison';
import Intelligence from '../components/sections/Intelligence';
import Features from '../components/sections/Features';
import TCOCalculator from '../components/sections/TCO/TCOCalculator';
import About from '../components/sections/About';
import Callout from '../components/sections/Callout';

const Home = () => {

    return (
        <>
          <div className="app">
            <main>
              <Hero />
              <About/>
              <Models/>
              <Intelligence/>
              <Features/>
              <TCOCalculator/>
              <Comparison/>
              <Testimonials />
              <Callout/>
            </main>
          </div>
        </>
      );
};

export default Home;
