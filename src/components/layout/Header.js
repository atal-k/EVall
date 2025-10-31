// filepath: src/components/layout/Header.jsx
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from 'react-router-dom';
import Button from '../common/Button';
import './Header.css';
import Logo from "../common/Logo";
import NavDropdown from '../common/NavDropdown';
import { navMenuData } from '../../data/navMenuData';

const Header = ({ variant = "white" }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [activeDropdown, setActiveDropdown] = useState(null);
  const location = useLocation();
  const navRefs = useRef({});
    
    // Scroll handling only for glass variant
    useEffect(() => {
      if (variant !== 'glass') return;
      
      const handleScroll = () => {
        const currentScrollY = window.scrollY;
        
        if (currentScrollY > lastScrollY && currentScrollY > 100) {
          setIsHidden(true);
        } else if (currentScrollY < lastScrollY) {
          setIsHidden(false);
        }
        
        setLastScrollY(currentScrollY);
      };
      
      window.addEventListener('scroll', handleScroll, { passive: true });
      
      return () => window.removeEventListener('scroll', handleScroll);
    }, [lastScrollY, variant]);
    // Close dropdown on route change
    useEffect(() => {
      setActiveDropdown(null);
    }, [location.pathname]);
    
    // Check if nav link is active
    const isActiveLink = (path) => {
      if (path === '#') return false;
      if (path === '/') return location.pathname === '/';
      return location.pathname.startsWith(path);
    };
    
    // Handle nav click
    const handleNavClick = (e, navItem) => {
      if (navItem.hasDropdown) {
        e.preventDefault();
        if (activeDropdown === navItem.id) {
          // Already open, trigger close animation
          handleCloseDropdown();
        } else {
          // Close any open dropdown first, then open new one
          if (activeDropdown && !activeDropdown.startsWith('closing-')) {
            setActiveDropdown(null);
          }
          setActiveDropdown(navItem.id);
        }
      } else {
        setActiveDropdown(null);
      }
    };
    
    const handleCloseDropdown = () => {
      if (!activeDropdown || activeDropdown.startsWith('closing-')) return;
      
      const currentDropdown = activeDropdown;
      setActiveDropdown(`closing-${currentDropdown}`);
      
      // Remove after animation completes
      setTimeout(() => {
        setActiveDropdown((prev) => {
          // Only clear if still in closing state
          if (prev === `closing-${currentDropdown}`) {
            return null;
          }
          return prev;
        });
      }, 350);
    };
    
    return (
      <header className={`header header--${variant} ${isHidden ? 'header--hidden' : ''}`}>
        <div className="header__container">
          <Link to="/" className="header__logo-link">
            <Logo size="medium"/>
          </Link>
          
          <nav className="header__nav">
            {navMenuData.map((navItem) => (
              <div 
                key={navItem.id}
                className="header__nav-item"
                ref={(el) => (navRefs.current[navItem.id] = el)}
              >
                <Link
                  to={navItem.path || '#'}
                  className={`header__nav-link ${isActiveLink(navItem.path) ? 'header__nav-link--active' : ''} ${activeDropdown === navItem.id ? 'header__nav-link--dropdown-open' : ''}`}
                  onClick={(e) => handleNavClick(e, navItem)}
                >
                  {navItem.label}
                </Link>
                
                {navItem.hasDropdown && (activeDropdown === navItem.id || activeDropdown === `closing-${navItem.id}`) && (
                  <NavDropdown
                    menuData={navItem.menu}
                    isOpen={activeDropdown === navItem.id}
                    onClose={handleCloseDropdown}
                    triggerRef={navRefs.current[navItem.id]}
                  />
                )}
              </div>
            ))}
          </nav>
          
          <div className="header__actions">
            <Button variant={location.pathname === '/' ? "white" : "outline"} size="small">Find a Dealer</Button>
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