/* eslint-disable jsx-a11y/anchor-is-valid */
// Footer Component
import { useState } from "react";
import './Footer.css'
import Logo from "../common/Logo";
const Footer = () => {
    const [email, setEmail] = useState('');
    
    const handleNewsletterSubmit = (e) => {
      e.preventDefault();
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    };
    
    return (
      <footer className="footer">
        <div className="container">
          <div className="footer__main">
            <div className="footer__brand">
            <div className="footer__logo">
              <Logo size="large" className="logo--light" />
            </div>
              <p className="footer__tagline">
                Leading the electric revolution with innovative, sustainable, and high-performance 
                electric vehicles designed for the future.
              </p>
              <p className="footer__copyright">
                Copyright © Wed May 31 2023<br />
                All rights reserved
              </p>
            </div>
            
            <div className="footer__section">
              <h4 className="footer__section-title">Quick Links</h4>
              <div className="footer__links">
                <a href="#" className="footer__link">Our Vehicles</a>
                <a href="#" className="footer__link">Book Test Drive</a>
                <a href="#" className="footer__link">Find Dealer</a>
                <a href="#" className="footer__link">Finance & EMI</a>
                <a href="#" className="footer__link">About Us</a>
                <a href="#" className="footer__link">Career</a>
              </div>
            </div>
            
            <div className="footer__section">
              <h4 className="footer__section-title">Services</h4>
              <div className="footer__links">
                <a href="#" className="footer__link">Customer Support</a>
                <a href="#" className="footer__link">Warranty Service</a>
                <a href="#" className="footer__link">Charging Network</a>
                <a href="#" className="footer__link">New & Updates</a>
                <a href="#" className="footer__link">Downloads</a>
                <a href="#" className="footer__link">Become a Dealer</a>
              </div>
            </div>
            
            <div className="footer__section">
              <h4 className="footer__section-title">Stay up to date</h4>
              <p className="footer__newsletter-text">
                Get the latest news about our electric vehicles, charging infrastructure 
                updates, and exclusive offers delivered to your inbox.
              </p>
              <div className="footer__newsletter-form">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="footer__newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <button onClick={handleNewsletterSubmit} className="footer__newsletter-btn">
                  ➤
                </button>
              </div>
            </div>
          </div>
          
          <div className="footer__bottom">
            <div className="footer__social">
              <a href="#" className="footer__social-link">📷</a>
              <a href="#" className="footer__social-link">🌐</a>
              <a href="#" className="footer__social-link">🐦</a>
              <a href="#" className="footer__social-link">▶️</a>
            </div>
          </div>
        </div>
      </footer>
    );
  };
export default Footer;