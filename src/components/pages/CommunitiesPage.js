import React, { useState, useEffect } from 'react';
import data from '../../data/datos_web.json';

const CommunitiesPage = () => {
  const [communities, setCommunities] = useState([]);

  useEffect(() => {
    if (data.comunidades) {
      setCommunities(data.comunidades);
    }
  }, []);

  return (
    <div className="communities-page">
      <section className="hero-section">
        <div className="container">
          <div className="hero-content">
            <h1 className="section-title" style={{color: '#ffffff', background: 'none', WebkitTextFillColor: '#ffffff', WebkitBackgroundClip: 'unset', backgroundClip: 'unset'}}>
              Nuestras Comunidades
            </h1>
            <p className="section-subtitle" style={{color: 'rgba(255, 255, 255, 0.95)'}}>
              Conoce las diferentes comunidades que forman parte de Universe Community
            </p>
          </div>
        </div>
      </section>

      <section className="communities-grid-section">
        <div className="container">
          {communities.length > 0 ? (
            <div className="communities-grid">
              {communities.map((community, index) => (
                <div key={index} className="community-card">
                  <div className="community-icon">
                    <i className={community.icono || 'fas fa-users'}></i>
                  </div>
                  <h3>{community.nombre}</h3>
                  <p>{community.descripcion}</p>
                  {community.enlace && (
                    <a 
                      href={community.enlace} 
                      className="btn btn-outline"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Visitar Comunidad
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center">
              <h3>Próximamente</h3>
              <p>Estamos trabajando en expandir nuestras comunidades. ¡Mantente atento!</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default CommunitiesPage;
