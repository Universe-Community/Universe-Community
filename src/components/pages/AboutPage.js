import React from 'react';

const AboutPage = () => {
  return (
    <div className="about-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="section-title" style={{color: '#ffffff', background: 'none', WebkitTextFillColor: '#ffffff', WebkitBackgroundClip: 'unset', backgroundClip: 'unset'}}>
              Sobre Universe Community
            </h1>
            <p className="section-subtitle" style={{color: 'rgba(255, 255, 255, 0.95)'}}>
              Conoce más sobre nuestra misión, visión y el equipo detrás de Universe Community
            </p>
          </div>
        </div>
      </section>

      <section className="about-content-section">
        <div className="container">
          <div className="about-grid">
            <div className="about-text">
              <h2>Nuestra Historia</h2>
              <p>
                Universe Community nació de la idea de crear un espacio donde las personas 
                puedan conectarse, colaborar y crecer juntas. Creemos en el poder de la 
                comunidad para generar un impacto positivo en el mundo.
              </p>
              
              <h3>Nuestros Valores</h3>
              <ul className="values-list">
                <li><strong>Inclusión:</strong> Creamos un espacio donde todas las personas son bienvenidas</li>
                <li><strong>Colaboración:</strong> Trabajamos juntos para alcanzar objetivos comunes</li>
                <li><strong>Innovación:</strong> Buscamos constantemente nuevas formas de hacer las cosas</li>
                <li><strong>Impacto:</strong> Nos enfocamos en generar cambios positivos reales</li>
              </ul>
            </div>
            
            <div className="about-stats">
              <div className="stat-card">
                <h3>500+</h3>
                <p>Miembros Activos</p>
              </div>
              <div className="stat-card">
                <h3>50+</h3>
                <p>Proyectos Completados</p>
              </div>
              <div className="stat-card">
                <h3>25+</h3>
                <p>Países Representados</p>
              </div>
              <div className="stat-card">
                <h3>5+</h3>
                <p>Años de Experiencia</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="team-section">
        <div className="container">
          <h2 className="section-title">Nuestro Equipo</h2>
          <p className="section-subtitle">
            Las personas que hacen posible Universe Community
          </p>
          
          <div className="team-grid">
            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-user"></i>
              </div>
              <h4>Equipo de Fundadores</h4>
              <p>Líderes visionarios comprometidos con el crecimiento de la comunidad</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-users"></i>
              </div>
              <h4>Colaboradores</h4>
              <p>Miembros activos que contribuyen diariamente al desarrollo de proyectos</p>
            </div>
            <div className="team-member">
              <div className="member-avatar">
                <i className="fas fa-heart"></i>
              </div>
              <h4>Voluntarios</h4>
              <p>Personas dedicadas que apoyan nuestras iniciativas y eventos</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;
