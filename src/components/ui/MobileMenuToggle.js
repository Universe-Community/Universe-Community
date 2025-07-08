import React from 'react';

const MobileMenuToggle = ({ isOpen, onToggle }) => {
  return (
    <button
      className="nav-toggle"
      onClick={onToggle}
      aria-label="Abrir menú"
      aria-expanded={isOpen}
    >
      <i className={`fas ${isOpen ? 'fa-times' : 'fa-bars'}`}></i>
    </button>
  );
};

export default MobileMenuToggle;
