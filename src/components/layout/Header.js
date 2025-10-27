import { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import Button from '../common/Button';
import './Header.css';
import Logo from "../common/Logo";

const Header = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [isHidden, setIsHidden] = useState(false);
    const [lastScrollY, setLastScrollY] = useState(0);
    
    const navLinks = [
      ['Home', '/'],
      ['About Us', '/vans'],
      ['Network'],
      ['Products', '/vehicle-showcase'],
      ['Tech & Innovation'],
      ['Resources'],
      ['Contact Us']
    ];
    
    // ADD THIS useEffect
    useEffect(() => {
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          // Scrolling down & past threshold
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY) {
          // Scrolling up
          setIsHidden(false);
        }
        
        setLastScrollY(currentScrollY);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY]);
    
    return (
      <header className={`header ${isHidden ? 'header--hidden' : ''}`}>
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