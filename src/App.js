// ============================================
// 📁 src/App.js - Main Application Component
// ============================================
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import VansPage from './pages/VansPage';
import './styles/App.css';
import './styles/utils.css'
import VanDetail from './pages/VanDetail';
import VehicleShowcase from './pages/VehicleShowcase';
import AboutUs from './pages/AboutUs';
import ContactUs from './pages/ContactUs';

function AppContent() {
  const location = useLocation();
  const isHomePage = location.pathname === '/';
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return (
    <div className="App">
      <Header variant={isHomePage ? 'glass' : 'white'} />
      <main className="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/vans" element={<VansPage />} />
          <Route path="/vans/:id" element={<VanDetail />} />
          <Route path="/vehicle-showcase" element={<VehicleShowcase/>}/>
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/contact-us" element={<ContactUs />} />
        </Routes>
      </main>
      <Footer />
    </div>
  );
}

function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

export default App;