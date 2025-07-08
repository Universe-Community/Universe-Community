import React, { useState, useEffect } from 'react';
import data from '../../data/datos_web.json';

const DonationSection = () => {
  const [donationInfo, setDonationInfo] = useState(null);

  useEffect(() => {
    // Cargar información de donación desde los datos
    if (data.redesSociales?.donaciones) {
      const paypalInfo = data.redesSociales.donaciones.find(
        d => d.plataforma && d.plataforma.toLowerCase() === 'paypal'
      );
      setDonationInfo(paypalInfo);
    }
  }, []);

  return (
    <section className="content-block donation-section-wrapper" id="donaciones">
      <div className="container">
        <h2 className="block-title">Apoya Nuestra Comunidad</h2>
        <p className="donation-intro-text">
          Tu generosidad nos permite seguir creciendo, desarrollando proyectos
          innovadores y manteniendo nuestra plataforma abierta para todos.
          Cada contribución, grande o pequeña, marca una diferencia
          significativa. ¡Gracias por considerar apoyar a Universe Community!
        </p>
        
        <div className="donation-button-container">
          {donationInfo && donationInfo.url && donationInfo.textoBoton ? (
            <a
              href={donationInfo.url}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-donate-paypal"
            >
              <i className={donationInfo.icono || 'fab fa-paypal'}></i>
              {donationInfo.textoBoton}
            </a>
          ) : (
            <p>Opciones de donación no disponibles.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default DonationSection;
