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

const Home = () => {

    return (
        <>
          <div className="app">
            <main>
              <Hero />
              <Models/>
              <Intelligence/>
              <Features/>
              <Comparison/>
              <Testimonials />
            </main>
          </div>
        </>
      );
};

export default Home;
