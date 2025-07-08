import React from "react";

const Hero = () => (
  <section className="hero">
    <div className="container">
      <div className="hero-content-wrapper">
        <h1 className="hero-main-title">
          Bienvenido a<br />
          <span className="highlight-text">Universe Community</span>
        </h1>
        <p className="hero-sub-title">
          Una comunidad global dedicada a crear, innovar y conectar personas a través de proyectos colaborativos que impactan positivamente en el mundo.
        </p>
        <div className="hero-button-group">
          <a href="/avisos.html" className="btn btn-filled-gradient">Anuncios y Avisos</a>
          <a href="#comunidad" className="btn btn-bordered">Únete a Nosotros</a>
        </div>
      </div>
    </div>
  </section>
);

export default Hero;
