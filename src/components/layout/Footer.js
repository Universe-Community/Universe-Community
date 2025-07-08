import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data/datos_web.json';

const Footer = () => {
  const [contactos, setContactos] = useState([]);
  const [perfilesSociales, setPerfilesSociales] = useState([]);
  const currentYear = new Date().getFullYear();

  useEffect(() => {
    if (data.redesSociales) {
      if (data.redesSociales.contactosDirectos) {
        setContactos(data.redesSociales.contactosDirectos);
      }
      if (data.redesSociales.perfilesSociales) {
        setPerfilesSociales(data.redesSociales.perfilesSociales);
      }
    }
  }, []);

  return (
    <footer className="site-footer-detailed">
      <div className="container">
        <div className="footer-grid">
          {/* Sección de marca */}
          <div className="footer-column footer-column-brand">
            <Link to="/" className="footer-logo-link" aria-label="Universe Community Home">
              <div className="footer-logo-icon-box">
                <span className="footer-logo-abbr">UC</span>
              </div>
              <span className="footer-logo-full-text">Universe Community</span>
            </Link>
            <p className="footer-description">
              Una comunidad global dedicada a crear, innovar y conectar personas
              a través de proyectos colaborativos que transforman ideas en
              realidad.
            </p>
          </div>

          {/* Sección de contacto directo */}
          <div className="footer-column footer-column-contact">
            <h4 className="footer-heading">Contacto Directo</h4>
            <div className="footer-direct-contact">
              {contactos.length > 0 ? (
                contactos.map((contacto, index) => (
                  <a
                    key={index}
                    href={contacto.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={contacto.textoAlternativo || `Contactar por ${contacto.plataforma}`}
                  >
                    <i className={contacto.icono} aria-hidden="true"></i>
                    {contacto.plataforma} {contacto.tipo ? `(${contacto.tipo})` : ''}
                  </a>
                ))
              ) : (
                <p>Información de contacto no disponible.</p>
              )}
            </div>
          </div>

          {/* Sección de redes sociales */}
          <div className="footer-column footer-column-social">
            <h4 className="footer-heading">Síguenos</h4>
            <div className="footer-social-icons">
              {perfilesSociales.length > 0 ? (
                perfilesSociales.map((perfil, index) => (
                  <a
                    key={index}
                    href={perfil.url || '#'}
                    target="_blank"
                    rel="noopener noreferrer"
                    title={perfil.titulo}
                    aria-label={`Visita nuestro perfil de ${perfil.titulo}`}
                  >
                    <i className={perfil.icono} aria-hidden="true"></i>
                  </a>
                ))
              ) : (
                <p>Redes sociales no disponibles.</p>
              )}
            </div>
          </div>
        </div>

        {/* Barra inferior */}
        <div className="footer-bottom-bar">
          <p>
            &copy; {currentYear} Universe Community. Todos los
            derechos reservados. Diseñado con{' '}
            <i className="fas fa-heart" style={{ color: '#e25555' }}></i>.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
