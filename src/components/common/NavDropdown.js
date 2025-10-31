// ============================================
// filepath: src/components/common/NavDropdown.jsx
// ============================================

import { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './NavDropdown.css';

const NavDropdown = ({ menuData, isOpen, onClose, triggerRef }) => {
  const dropdownRef = useRef(null);
  const [isMounted, setIsMounted] = useState(false);

  // Trigger animation after mount
  useEffect(() => {
    if (isOpen) {
      // Delay to allow CSS transition to work
      const timer = requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setIsMounted(true);
        });
      });
      return () => cancelAnimationFrame(timer);
    } else {
      setIsMounted(false);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!menuData) return null;

  const handleLinkClick = () => {
    onClose();
  };

  return (
    <div 
      ref={dropdownRef}
      className={`nav-dropdown ${isMounted ? 'nav-dropdown--open' : ''}`}
    >
      <div className="nav-dropdown__triangle" />
      <div className="nav-dropdown__content">
        {menuData.groups.map((group, groupIndex) => (
          <div key={groupIndex} className="nav-dropdown__group">
            {group.title && (
              <h3 className="nav-dropdown__group-title">{group.title}</h3>
            )}
            <ul className="nav-dropdown__links">
              {group.links.map((link) => (
                <li key={link.id} className="nav-dropdown__link-item">
                  <Link
                    to={link.path}
                    className="nav-dropdown__link"
                    onClick={handleLinkClick}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavDropdown;
// /

// // ============================================
// // filepath: src/components/layout/Header.jsx
// // ============================================
// // MODIFY: Add these imports at the top

// import { useState, useEffect, useRef } from "react";
// import { Link, useLocation } from 'react-router-dom';
// import Button from '../common/Button';
// import './Header.css';
// import Logo from "../common/Logo";
// import NavDropdown from '../common/NavDropdown';
// import { navMenuData } from '../../data/navMenuData';

// // MODIFY: Inside Header component, after existing state declarations

// const Header = ({ variant = "white" }) => {
//     const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
//     const [isHidden, setIsHidden] = useState(false);
//     const [lastScrollY, setLastScrollY] = useState(0);
//     const [activeDropdown, setActiveDropdown] = useState(null);
//     const location = useLocation();
//     const navRefs = useRef({});
    
//     // ... existing scroll useEffect code ...
    
//     // Close dropdown on route change
//     useEffect(() => {
//       setActiveDropdown(null);
//     }, [location.pathname]);
    
//     // Check if nav link is active
//     const isActiveLink = (path) => {
//       if (path === '#') return false;
//       if (path === '/') return location.pathname === '/';
//       return location.pathname.startsWith(path);
//     };
    
//     // Handle nav click
//     const handleNavClick = (e, navItem) => {
//       if (navItem.hasDropdown) {
//         e.preventDefault();
//         setActiveDropdown(activeDropdown === navItem.id ? null : navItem.id);
//       } else {
//         setActiveDropdown(null);
//       }
//     };
    
//     // Close dropdown
//     const handleCloseDropdown = () => {
//       setActiveDropdown(null);
//     };
    
//     return (
//       <header className={`header header--${variant} ${isHidden ? 'header--hidden' : ''}`}>
//         <div className="header__container">
//           <Link to="/" className="header__logo-link">
//             <Logo size="medium"/>
//           </Link>
          
//           <nav className="header__nav">
//             {navMenuData.map((navItem) => (
//               <div 
//                 key={navItem.id}
//                 className="header__nav-item"
//                 ref={(el) => (navRefs.current[navItem.id] = el)}
//               >
//                 <Link
//                   to={navItem.path || '#'}
//                   className={`header__nav-link ${isActiveLink(navItem.path) ? 'header__nav-link--active' : ''} ${activeDropdown === navItem.id ? 'header__nav-link--dropdown-open' : ''}`}
//                   onClick={(e) => handleNavClick(e, navItem)}
//                 >
//                   {navItem.label}
//                 </Link>
                
//                 {navItem.hasDropdown && activeDropdown === navItem.id && (
//                   <NavDropdown
//                     menuData={navItem.menu}
//                     isOpen={activeDropdown === navItem.id}
//                     onClose={handleCloseDropdown}
//                     triggerRef={navRefs.current[navItem.id]}
//                   />
//                 )}
//               </div>
//             ))}
//           </nav>
          
//           <div className="header__actions">
//             <Button variant="white" size="small">Find a Dealer</Button>
//             <Button variant="primary" size="small">Explore Models</Button>
//             <button 
//               className="header__mobile-toggle"
//               onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
//             >
//               ☰
//             </button>
//           </div>
//         </div>
//       </header>
//     );
// };

// export default Header;

// // ============================================
// // filepath: src/components/layout/Header.css
// // ============================================
// // ADD: These new styles after existing header styles

// .header__nav-item {
//   position: relative;
//   display: inline-block;
// }

// .header__nav-link--dropdown-open {
//   background-color: #d5d4d4;
// }

// /* Ensure dropdown positioning works correctly */
// .header__nav {
//   position: relative;
// }