import React from "react";

const Support = () => (
  <section className="content-block" id="soporte-contacto">
    <div className="container">
      <h2 className="block-title">Soporte y Contacto</h2>
      <div className="support-main-container">
        <div className="faq-and-info-column">
          <div className="faq-container card" id="faqContainer">
            <h3 className="section-subtitle">Preguntas Frecuentes</h3>
            <p>Cargando preguntas frecuentes...</p>
          </div>
          <div className="contact-info-container card">
            <h3 className="section-subtitle">Información de contacto</h3>
            <ul className="contact-info-list" id="contactInfoListContainer">
              <p>Cargando información de contacto...</p>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </section>
);

export default Support;
