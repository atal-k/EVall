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
            <div className="footer__social">
              {/* Instagram */}
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>

              {/* Dribbble */}
              <a href="#" className="footer__social-link" aria-label="Dribbble">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <path d="M8.56 2.75c4.37 6.03 6.02 9.42 8.03 17.5m2.54-15.38c-3.72 4.35-8.94 5.66-16.88 5.85m19.5 1.9c-3.5-.93-6.63-.82-8.94 0-2.58.92-5.01 2.86-7.44 6.32" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* Twitter/X */}
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>

              {/* YouTube */}
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                </svg>
              </a>
            </div>

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
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M14.536 21.686a.5.5 0 0 0 .937-.024l6.5-19a.496.496 0 0 0-.635-.635l-19 6.5a.5.5 0 0 0-.024.937l7.93 3.18a2 2 0 0 1 1.112 1.11zm7.318-19.539l-10.94 10.939" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" fill="none"/>
                </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
      </footer>
    );
  };
export default Footer;