// ============================================
// 📁 src/pages/Home.js
// ============================================
import React from 'react';
import Header from '../components/layout/Header'
import Hero from '../components/sections/Hero';
import Testimonials from '../components/sections/Testimonials'
import Footer from '../components/layout/Footer'

const Home = () => {

    return (
        <>
          <div className="app">
            <main>
              <Hero />
              <Testimonials />
            </main>
          </div>
        </>
      );
};

export default Home;
