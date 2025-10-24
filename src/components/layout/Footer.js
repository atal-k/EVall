/* eslint-disable jsx-a11y/anchor-is-valid */
import { useState } from "react";
import './Footer.css'
import Logo from "../common/Logo";

const Footer = () => {
  const [email, setEmail] = useState('');
  
  const handleNewsletterSubmit = (e) => {
    e.preventDefault();
    if (email) {
      alert(`Subscribed with email: ${email}`);
      setEmail('');
    }
  };
  
  return (      
      <footer className="footer">
        <div className="container">
          <div className="footer__main">
            {/* Brand Section */}
            <div className="footer__brand">
            <div className="footer__logo">
              <Logo size="large" className="logo--light" color="white" />
            </div>
              <p className="footer__tagline">
                Leading the electric revolution with innovative, sustainable, and high-performance 
                electric vehicles designed for the future.
              </p>
              
              <div className="footer__certifications">
                <h4 className="footer__cert-title">Certifications & Partners</h4>
                <div className="footer__cert-icons">
                  <div className="footer__cert-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 20 20">
                      <path fill="currentColor" d="M4.46 5.16L5 7.46l-.54 2.29l2.01 1.24L7.7 13l2.3-.54l2.3.54l1.23-2.01l2.01-1.24L15 7.46l.54-2.3l-2-1.24l-1.24-2.01l-2.3.55l-2.29-.54l-1.25 2zm5.55 6.34a3.999 3.999 0 1 1 0-8c2.2 0 3.99 1.79 3.99 3.99c0 2.22-1.79 4.01-3.99 4.01m-.02-1C8.33 10.5 7 9.16 7 7.5c0-1.65 1.33-3 2.99-3S13 5.85 13 7.5c0 1.66-1.35 3-3.01 3m3.84 1.1l-1.28 2.24l-2.08-.47L13 19.2l1.4-2.2h2.5zm-7.7.07l1.25 2.25l2.13-.51L7 19.2L5.6 17H3.1z" />
                    </svg>
                  </div>
                  <div className="footer__cert-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 48 48">
                      <g fill="none" stroke="currentColor" strokeWidth="3">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M26 36H6a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h36a2 2 0 0 1 2 2v26a2 2 0 0 1-2 2h-8M12 14h24m-24 7h6m-6 7h4" />
                        <path d="M30 33a6 6 0 1 0 0-12a6 6 0 0 0 0 12Z" />
                        <path strokeLinecap="round" strokeLinejoin="round" d="m30 40l4 2V31.472S32.86 33 30 33s-4-1.5-4-1.5V42z" />
                      </g>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Quick Links Section */}
            <div className="footer__section">
              <h4 className="footer__section-title">Quick Links</h4>
              <div className="footer__links">
                <a href="#" className="footer__link">Home</a>
                <a href="#" className="footer__link">About Us</a>
                <a href="#" className="footer__link">Products</a>
                <a href="#" className="footer__link">Technology</a>
                <a href="#" className="footer__link">Services</a>
                <a href="#" className="footer__link">Resources</a>
                <a href="#" className="footer__link">Contact</a>
              </div>
            </div>
            
            {/* Contact Information Section */}
            <div className="footer__section">
              <h4 className="footer__section-title">Contact Information</h4>
              <div className="footer__contact">
                <div className="footer__contact-item">
                  <div className="footer__contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M12 12q.825 0 1.413-.587T14 10t-.587-1.412T12 8t-1.412.588T10 10t.588 1.413T12 12m0 7.35q3.05-2.8 4.525-5.087T18 10.2q0-2.725-1.737-4.462T12 4T7.738 5.738T6 10.2q0 1.775 1.475 4.063T12 19.35M12 22q-4.025-3.425-6.012-6.362T4 10.2q0-3.75 2.413-5.975T12 2t5.588 2.225T20 10.2q0 2.5-1.987 5.438T12 22m0-12" />
                    </svg>
                  </div>
                  <div className="footer__contact-text">
                    <p>D218, Phase 8B,</p>
                    <p>Industrial Area, Sector 74, Sahibzada Ajit Singh Nagar, Punjab -160055</p>
                    <p>Phone: (0172) 4509386</p>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <div className="footer__contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M6.54 5c.06.89.21 1.76.45 2.59l-1.2 1.2c-.41-1.2-.67-2.47-.76-3.79zm9.86 12.02c.85.24 1.72.39 2.6.45v1.49c-1.32-.09-2.59-.35-3.8-.75zM7.5 3H4c-.55 0-1 .45-1 1c0 9.39 7.61 17 17 17c.55 0 1-.45 1-1v-3.49c0-.55-.45-1-1-1c-1.24 0-2.45-.2-3.57-.57a.8.8 0 0 0-.31-.05c-.26 0-.51.1-.71.29l-2.2 2.2a15.15 15.15 0 0 1-6.59-6.59l2.2-2.2c.28-.28.36-.67.25-1.02A11.4 11.4 0 0 1 8.5 4c0-.55-.45-1-1-1" />
                    </svg>
                  </div>
                  <div className="footer__contact-text">
                    <p>+91 0172 450 9386</p>
                  </div>
                </div>
                
                <div className="footer__contact-item">
                  <div className="footer__contact-icon">
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                      <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z" />
                    </svg>
                  </div>
                  <div className="footer__contact-text">
                    <p>info@evall.co.in</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Newsletter Section */}
            <div className="footer__section">
              <h4 className="footer__section-title">Stay updated</h4>
              <p className="footer__newsletter-text">
                Get the latest news and launches
              </p>
              <form className="footer__newsletter-form" onSubmit={handleNewsletterSubmit}>
              <div className="footer__newsletter-input-wrapper">
                <input 
                  type="email" 
                  placeholder="Your email address"
                  className="footer__newsletter-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
                <svg className="footer__newsletter-input-icon" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                  <path fill="currentColor" d="M4 20q-.825 0-1.412-.587T2 18V6q0-.825.588-1.412T4 4h16q.825 0 1.413.588T22 6v12q0 .825-.587 1.413T20 20zm8-7L4 8v10h16V8zm0-2l8-5H4zM4 8V6v12z" />
                </svg>
              </div>
            <button type="submit" className="footer__newsletter-btn">
              Subscribe
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"></svg>
                </button>
              </form>
            </div>
          </div>
          
          {/* Bottom Bar */}
          <div className="footer__divider"></div>
          <div className="footer__bottom">
            <p className="footer__copyright">
              Copyright © 2025 EVall Mobility. All rights reserved
            </p>
            <div className="footer__social">
              <a href="#" className="footer__social-link" aria-label="LinkedIn">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
                <g fill="none">
                  <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                  <path fill="currentColor" d="M18 3a3 3 0 0 1 3 3v12a3 3 0 0 1-3 3H6a3 3 0 0 1-3-3V6a3 3 0 0 1 3-3zm0 2H6a1 1 0 0 0-1 1v12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6a1 1 0 0 0-1-1M8 10a1 1 0 0 1 .993.883L9 11v5a1 1 0 0 1-1.993.117L7 16v-5a1 1 0 0 1 1-1m3-1a1 1 0 0 1 .984.821a6 6 0 0 1 .623-.313c.667-.285 1.666-.442 2.568-.159c.473.15.948.43 1.3.907c.315.425.485.942.519 1.523L17 12v4a1 1 0 0 1-1.993.117L15 16v-4c0-.33-.08-.484-.132-.555a.55.55 0 0 0-.293-.188c-.348-.11-.849-.052-1.182.09c-.5.214-.958.55-1.27.861L12 12.34V16a1 1 0 0 1-1.993.117L10 16v-6a1 1 0 0 1 1-1M8 7a1 1 0 1 1 0 2a1 1 0 0 1 0-2" />
                </g>
              </svg>
              </a>
              
              <a href="#" className="footer__social-link" aria-label="Facebook">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M9 8h-3v4h3v12h5v-12h3.642l.358-4h-4v-1.667c0-.955.192-1.333 1.115-1.333h2.885v-5h-3.808c-3.596 0-5.192 1.583-5.192 4.615v3.385z"/>
                </svg>
              </a>
              
              <a href="#" className="footer__social-link" aria-label="Instagram">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="2" width="20" height="20" rx="5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="2"/>
                  <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor"/>
                </svg>
              </a>
              
              <a href="#" className="footer__social-link" aria-label="YouTube">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33A2.78 2.78 0 0 0 3.4 19c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.25 29 29 0 0 0-.46-5.33z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                  <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" fill="currentColor"/>
                </svg>
              </a>
              
              <a href="#" className="footer__social-link" aria-label="Twitter">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
  );
};

export default Footer;