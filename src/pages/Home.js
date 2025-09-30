// ============================================
// 📁 src/pages/Home.js
// ============================================
import React from 'react';
import Hero from '../components/sections/Hero';
import Testimonials from '../components/sections/Testimonials'
import Models from '../components/sections/Models';

const Home = () => {

    return (
        <>
          <div className="app">
            <main>
              <Hero />
              <Models/>
              <Testimonials />
            </main>
          </div>
        </>
      );
};

export default Home;
