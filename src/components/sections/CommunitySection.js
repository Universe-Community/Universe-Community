import React, { useState, useEffect } from 'react';
import data from '../../data/datos_web.json';

const CommunitySection = () => {
  const [contactChannels, setContactChannels] = useState([]);

  useEffect(() => {
    // Cargar canales de contacto desde los datos
    if (data.redesSociales?.contactosDirectos) {
      const channels = data.redesSociales.contactosDirectos.filter(contacto =>
        contacto.plataforma &&
        (contacto.plataforma.toLowerCase() === 'whatsapp' ||
         contacto.plataforma.toLowerCase() === 'telegram')
      );
      setContactChannels(channels);
    }
  }, []);

  const renderContactCard = (contacto) => (
    <div key={contacto.plataforma} className="contact-channel-card">
      <div className="channel-icon-wrapper">
        <span className={`channel-icon ${contacto.plataforma.toLowerCase()}-icon`}>
          <i className={contacto.icono}></i>
        </span>
      </div>
      <div className="channel-content">
        <h3 className="channel-title">{contacto.tipo || contacto.plataforma}</h3>
        <p className="channel-description">
          {contacto.textoAlternativo || `Conéctate con nosotros vía ${contacto.plataforma}.`}
        </p>
        <a
          href={contacto.url}
          target="_blank"
          rel="noopener noreferrer"
          className={`btn-join ${contacto.plataforma.toLowerCase()}`}
        >
          Unirse <span className="arrow">&rarr;</span>
        </a>
      </div>
    </div>
  );

  return (
    <section className="content-block social-connect-section bg-shaded" id="comunidad">
      <div className="container">
        <div className="social-connect-intro">
          <h2 className="social-connect-title">Conéctate con Nosotros</h2>
          <p className="social-connect-subtitle">
            Únete a nuestros canales principales para mantenerte al día con
            las últimas novedades, eventos y oportunidades de colaboración en
            nuestra comunidad.
          </p>
        </div>

        <div className="contact-channel-cards-grid">
          {contactChannels.length > 0 ? (
            contactChannels.map(renderContactCard)
          ) : (
            <p>Cargando canales de contacto...</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default CommunitySection;
