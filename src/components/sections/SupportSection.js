import React, { useState, useEffect } from 'react';
import FAQAccordion from '../ui/FAQAccordion';
import ContactInfo from '../ui/ContactInfo';
import data from '../../data/datos_web.json';

const SupportSection = () => {
  const [faqs, setFaqs] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);

  useEffect(() => {
    // Cargar preguntas frecuentes
    if (data.preguntasFrecuentes) {
      setFaqs(data.preguntasFrecuentes);
    }

    // Cargar información de contacto
    if (data.redesSociales?.contactosDirectos) {
      setContactInfo(data.redesSociales.contactosDirectos);
    }
  }, []);

  return (
    <section className="content-block" id="soporte-contacto">
      <div className="container">
        <h2 className="block-title">Soporte y Contacto</h2>
        
        <div className="support-main-container">
          <div className="faq-and-info-column">
            <div className="faq-container card">
              <h3 className="section-subtitle">Preguntas Frecuentes</h3>
              <FAQAccordion faqs={faqs} />
            </div>
            
            <div className="contact-info-container card">
              <h3 className="section-subtitle">Información de contacto</h3>
              <ContactInfo contacts={contactInfo} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SupportSection;
