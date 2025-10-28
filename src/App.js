// ============================================
// 📁 src/App.js - Main Application Component
// ============================================
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Home from './pages/Home';
import VansPage from './pages/VansPage';
import './styles/App.css';
import './styles/utils.css'
import VanDetail from './pages/VanDetail';
import VehicleShowcase from './pages/VehicleShowcase';
import AboutUs from './pages/AboutUs';

function App() {
  return (
    <Router>
      <div className="App">
        <Header />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/vans" element={<VansPage />} />
            <Route path="/vans/:id" element={<VanDetail />} />
            <Route path="/vehicle-showcase" element={<VehicleShowcase/>}/>
            <Route path="/about-us" element={<AboutUs />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;