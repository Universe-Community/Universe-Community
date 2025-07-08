import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data/datos_web.json';

const Navigation = ({ isMobileMenuOpen, onMenuItemClick }) => {
  const [donationUrl, setDonationUrl] = useState('#');
  const [activeSubmenu, setActiveSubmenu] = useState(null);
  const [isDesktop, setIsDesktop] = useState(window.innerWidth > 991);

  useEffect(() => {
    const handleResize = () => {
      setIsDesktop(window.innerWidth > 991);
      if (window.innerWidth > 991) {
        setActiveSubmenu(null);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    // Cargar URL de donación desde datos
    if (data.redesSociales?.donaciones) {
      const paypalInfo = data.redesSociales.donaciones.find(
        d => d.plataforma && d.plataforma.toLowerCase() === 'paypal'
      );
      if (paypalInfo?.url) {
        setDonationUrl(paypalInfo.url);
      }
    }

    // Cerrar submenús al hacer click fuera
    const handleClickOutside = (event) => {
      if (isDesktop && !event.target.closest('.has-submenu')) {
        setActiveSubmenu(null);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [isDesktop]);

  const toggleSubmenu = (menuId) => {
    setActiveSubmenu(activeSubmenu === menuId ? null : menuId);
  };

  const handleMouseEnter = (menuId) => {
    if (isDesktop) {
      setActiveSubmenu(menuId);
    }
  };

  const handleMouseLeave = () => {
    if (isDesktop) {
      setActiveSubmenu(null);
    }
  };

  const handleSubmenuClick = (menuId) => {
    if (!isDesktop) {
      toggleSubmenu(menuId);
    }
  };

  const handleMenuItemClick = () => {
    setActiveSubmenu(null);
    onMenuItemClick();
  };

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
      const offset = headerHeight + 20;
      const elementPosition = element.offsetTop - offset;
      
      window.scrollTo({
        top: elementPosition,
        behavior: 'smooth'
      });
    }
    handleMenuItemClick();
  };

  const menuItems = [
    {
      id: 'universe-community',
      label: 'Universe Community',
      hasSubmenu: true,
      submenu: [
        { label: 'Inicio', path: '/' },
        { label: 'Proyectos', action: () => scrollToSection('proyectos-destacados') },
        { label: 'Donar', action: () => scrollToSection('donaciones') },
        { label: 'Contacto', action: () => scrollToSection('comunidad') },
        { label: 'Soporte', action: () => scrollToSection('soporte-contacto') }
      ]
    },
    { label: 'Proyectos', path: '/proyectos' },
    { label: 'Avisos', path: '/avisos' },
    { label: 'Donación', href: donationUrl, external: true }
  ];

  return (
    <nav className={`main-menu ${isMobileMenuOpen ? 'menu-visible' : ''}`}>
      <ul>
        {menuItems.map((item) => (
          <li 
            key={item.id || item.label} 
            className={item.hasSubmenu ? 'has-submenu' : ''}
            onMouseEnter={() => item.hasSubmenu && handleMouseEnter(item.id)}
            onMouseLeave={item.hasSubmenu ? handleMouseLeave : undefined}
          >
            {item.hasSubmenu ? (
              <>
                <button
                  className="submenu-trigger"
                  onClick={() => handleSubmenuClick(item.id)}
                  aria-haspopup="true"
                  aria-expanded={activeSubmenu === item.id}
                >
                  {item.label}
                  <span className="submenu-toggle-icon">
                    <i className="fas fa-chevron-down"></i>
                  </span>
                </button>
                <ul className={`submenu level-2 ${activeSubmenu === item.id ? 'open' : ''}`}>
                  {item.submenu.map((subItem, index) => (
                    <li key={index}>
                      {subItem.path ? (
                        <Link to={subItem.path} onClick={handleMenuItemClick}>
                          {subItem.label}
                        </Link>
                      ) : (
                        <button
                          onClick={() => {
                            subItem.action();
                            handleMenuItemClick();
                          }}
                          className="submenu-action-button"
                        >
                          {subItem.label}
                        </button>
                      )}
                    </li>
                  ))}
                </ul>
              </>
            ) : item.external ? (
              <a
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleMenuItemClick}
              >
                {item.label}
              </a>
            ) : (
              <Link to={item.path} onClick={handleMenuItemClick}>
                {item.label}
              </Link>
            )}
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default Navigation;
