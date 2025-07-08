import React from 'react';
import { useTheme } from '../../hooks/useTheme';

const ThemeToggle = () => {
  const { toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle-button"
      onClick={toggleTheme}
      aria-label="Cambiar tema"
      title="Cambiar tema"
    >
      <i className="fas fa-moon" aria-hidden="true"></i>
      <i className="fas fa-sun" aria-hidden="true"></i>
    </button>
  );
};

export default ThemeToggle;
