import React, { useState, useEffect } from 'react';
import data from '../../data/datos_web.json';

const NoticesPage = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    // Cargar todos los anuncios
    if (data.anuncios) {
      setNotices(data.anuncios);
    }
  }, []);

  const renderNoticeCard = (notice) => (
    <article key={notice.id} className="notice-card">
      <div className="notice-header">
        <span className="notice-tag">{notice.etiqueta}</span>
        <span className="notice-date">{notice.fecha}</span>
      </div>
      
      <div className="notice-image-container">
        {notice.flyerUrl ? (
          <div className="notice-image">
            <img 
              src={notice.flyerUrl} 
              alt={notice.altFlyer || notice.titulo}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
              }}
            />
            <div className="notice-image-overlay">
              <h3 className="notice-title-overlay">{notice.titulo}</h3>
            </div>
          </div>
        ) : (
          <div className="notice-image-placeholder">
            <h3 className="notice-title-placeholder">{notice.titulo}</h3>
          </div>
        )}
      </div>

      <div className="notice-content">
        <p className="notice-description">{notice.contenido}</p>
        
        {notice.enlaceUrl && notice.enlaceTexto && (
          <a 
            href={notice.enlaceUrl} 
            className="btn btn-primary"
            target="_blank"
            rel="noopener noreferrer"
          >
            {notice.enlaceTexto}
          </a>
        )}
      </div>
    </article>
  );

  return (
    <div className="notices-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title" style={{color: '#ffffff', background: 'none', WebkitTextFillColor: '#ffffff', WebkitBackgroundClip: 'unset', backgroundClip: 'unset'}}>Anuncios y Avisos</h1>
          <p className="page-subtitle" style={{color: 'rgba(255, 255, 255, 0.95)'}}>
            Mantente al día con las últimas novedades, eventos y actualizaciones 
            de Universe Community.
          </p>
        </div>
      </section>

      <section className="content-block">
        <div className="container">
          <div className="notices-grid">
            {notices.length > 0 ? (
              notices.map(renderNoticeCard)
            ) : (
              <p>No hay anuncios disponibles en este momento.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default NoticesPage;
