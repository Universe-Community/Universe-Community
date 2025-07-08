import React from "react";

const Header = () => (
  <header className="site-header">
    <div className="container header-inner">
      <a href="/" className="logo-link">
        <div className="logo-icon-box"><span className="logo-abbr">UC</span></div>
        <span className="logo-full-text">Universe Community</span>
      </a>
      {/* Botones y navegación se migrarán aquí como componentes hijos */}
    </div>
  </header>
);

export default Header;
