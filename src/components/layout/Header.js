/* eslint-disable jsx-a11y/anchor-is-valid */
// Header Component
import { useState } from "react";
import Button from '../common/Button';
import './Header.css'

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const navLinks = [
      'Home',
      'Models',
      'Fleet Solutions',
      'Charging/Infrastructure',
      'Service',
      'Contact Us'
    ];
    
    return (
      <header className="header">
        <div className="header__container">
          <a href="#" className="header__logo">
            <div className="header__logo-icon">E</div>
            <span>EVall</span>
          </a>
          
          <nav className="header__nav">
            {navLinks.map((link, index) => (
              <a key={index} href="#" className="header__nav-link">
                {link}
              </a>
            ))}
          </nav>
          
          <div className="header__actions">
            <Button variant="outline" size="small">Find a Dealer</Button>
            <Button variant="primary" size="small">Explore Models</Button>
            <button 
              className="header__mobile-toggle"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              ☰
            </button>
          </div>
        </div>
      </header>
    );
  };
  
export default Header;