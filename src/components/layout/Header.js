import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logo from '../ui/Logo';
import Navigation from '../ui/Navigation';
import ThemeToggle from '../ui/ThemeToggle';
import MobileMenuToggle from '../ui/MobileMenuToggle';

const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // Cerrar menú móvil al cambiar de ruta
    setIsMobileMenuOpen(false);
  }, [location]);

  useEffect(() => {
    // Actualizar altura del header para cálculos de scroll
    const updateHeaderHeight = () => {
      const header = document.querySelector('.site-header');
      if (header) {
        const height = header.offsetHeight;
        document.documentElement.style.setProperty('--header-height', `${height}px`);
      }
    };

    updateHeaderHeight();
    window.addEventListener('resize', updateHeaderHeight);
    return () => window.removeEventListener('resize', updateHeaderHeight);
  }, []);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <header className="site-header">
      <div className="container header-inner">
        <Link to="/" className="logo-link">
          <Logo />
        </Link>

        <Navigation 
          isMobileMenuOpen={isMobileMenuOpen}
          onMenuItemClick={() => setIsMobileMenuOpen(false)}
        />

        <div className="header-controls">
          <ThemeToggle />
          <MobileMenuToggle 
            isOpen={isMobileMenuOpen} 
            onToggle={toggleMobileMenu} 
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
