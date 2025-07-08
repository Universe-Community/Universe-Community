import React, { useState, useEffect } from 'react';
import data from '../../data/datos_web.json';

const FloatingWhatsApp = () => {
  const [whatsappUrl, setWhatsappUrl] = useState('#');

  useEffect(() => {
    // Cargar URL de WhatsApp desde los datos
    if (data.redesSociales?.contactosDirectos) {
      const whatsappInfo = data.redesSociales.contactosDirectos.find(
        c => c.plataforma &&
             c.plataforma.toLowerCase() === 'whatsapp' &&
             c.tipo === 'Contacto Directo'
      );
      
      if (whatsappInfo?.url) {
        setWhatsappUrl(whatsappInfo.url);
      }
    }
  }, []);

  if (whatsappUrl === '#') {
    return null; // No mostrar el botón si no hay URL válida
  }

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="floating-action-button animate-scale-in animate-pulse hover-scale"
      title="Contactar por WhatsApp"
      aria-label="Contactar por WhatsApp"
    >
      <i className="fab fa-whatsapp animate-float" aria-hidden="true"></i>
      <span className="floating-tooltip">¡Contáctanos!</span>
    </a>
  );
};

export default FloatingWhatsApp;
