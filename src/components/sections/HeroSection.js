import React from 'react';
import { Link } from 'react-router-dom';

const HeroSection = () => {
  return (
    <section className="hero">
      <div className="container">
        <div className="hero-content-wrapper">
          <h1 className="hero-main-title animate-slide-in-up">
            Bienvenido a<br />
            <span className="highlight-text">Universe Community</span>
          </h1>
          <p className="hero-sub-title animate-slide-in-up">
            Una comunidad global dedicada a crear, innovar y conectar personas
            a través de proyectos colaborativos que impactan positivamente en
            el mundo.
          </p>
          <div className="hero-button-group animate-slide-in-up">
            <Link to="/avisos" className="btn btn-filled-gradient hover-lift">
              Anuncios y Avisos
            </Link>
            <button 
              className="btn btn-bordered hover-scale"
              onClick={() => {
                const element = document.getElementById('comunidad');
                if (element) {
                  const headerHeight = document.querySelector('.site-header')?.offsetHeight || 70;
                  const offset = headerHeight + 20;
                  const elementPosition = element.offsetTop - offset;
                  
                  window.scrollTo({
                    top: elementPosition,
                    behavior: 'smooth'
                  });
                }
              }}
            >
              Únete a Nosotros
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
