import React from "react";

const WhatWeDo = () => (
  <section className="content-block bg-shaded" id="que-hacemos">
    <div className="container">
      <h2 className="block-title">Qué Hacemos</h2>
      <div className="info-cards-wrapper grid-three-cols">
        <div className="card what-we-do-card">
          <div className="card-icon-top">
            <i className="fas fa-project-diagram"></i>
          </div>
          <h3 className="card-title">Proyectos Colaborativos</h3>
          <p className="card-description">
            Impulsamos iniciativas donde la inteligencia colectiva y la cooperación son clave para alcanzar metas ambiciosas.
          </p>
        </div>
        <div className="card what-we-do-card">
          <div className="card-icon-top">
            <i className="fas fa-chalkboard-teacher"></i>
          </div>
          <h3 className="card-title">Aprendizaje Continuo</h3>
          <p className="card-description">
            Fomentamos un ambiente de curiosidad y desarrollo constante, compartiendo conocimientos y experiencias.
          </p>
        </div>
        <div className="card what-we-do-card">
          <div className="card-icon-top">
            <i className="fas fa-globe-americas"></i>
          </div>
          <h3 className="card-title">Conexiones Globales</h3>
          <p className="card-description">
            Conectamos personas de diversas culturas y disciplinas, creando una red rica en perspectivas y talentos.
          </p>
        </div>
        <div className="card what-we-do-card">
          <div className="card-icon-top"><i className="fas fa-lightbulb"></i></div>
          <h3 className="card-title">Innovación Abierta</h3>
          <p className="card-description">
            Promovemos un ecosistema donde las ideas fluyen libremente y se transforman en soluciones con impacto real.
          </p>
        </div>
      </div>
    </div>
  </section>
);

export default WhatWeDo;
