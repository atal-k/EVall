// ============================================
// 📁 src/pages/Home.js
// ============================================
import React from 'react';
import Hero from '../components/sections/Hero';
import Testimonials from '../components/sections/Testimonials'
import Models from '../components/sections/Models';
import Comparison from '../components/sections/Comparison';

const Home = () => {

    return (
        <>
          <div className="app">
            <main>
              <Hero />
              <Models/>
              <Comparison/>
              <Testimonials />
            </main>
          </div>
        </>
      );
};

export default Home;
