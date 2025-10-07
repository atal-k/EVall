/* eslint-disable jsx-a11y/anchor-is-valid */
// Header Component
import { useState } from "react";
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import './Header.css';
import Logo from "../common/Logo";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    
    const navLinks = [
      ['Home', '/'],
      ['Models', '/vans'],
      ['Fleet Solutions'],
      ['Charging/Infrastructure'],
      ['Service'],
      ['Contact Us']
    ];
    
    return (
      <header className="header">
        <div className="header__container">
        <a href="/" className="header__logo-link">
        <Logo size="medium"/>
      </a>
          
        <nav className="header__nav">
        {navLinks.map(([label, path], index) => (
          <Link
            key={index}
            to={path || '#'}
            className="header__nav-link"
          >
            {label}
          </Link>
        ))}
      </nav>
          
          <div className="header__actions">
            <Button variant="white" size="small">Find a Dealer</Button>
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