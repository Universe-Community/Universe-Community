import React from "react";

const Projects = () => (
  <section className="content-block" id="proyectos-destacados">
    <div className="container">
      <h2 className="block-title">Proyectos Destacados</h2>
      <div className="projects-slider-controls">
        <button className="slider-btn prev-btn" aria-label="Proyecto anterior">
          <i className="fas fa-chevron-left"></i>
        </button>
        <button className="slider-btn next-btn" aria-label="Siguiente proyecto">
          <i className="fas fa-chevron-right"></i>
        </button>
      </div>
      <div className="info-cards-wrapper grid-three-cols" id="projectListContainer">
        <p>Cargando proyectos destacados...</p>
      </div>
      <div className="all-projects-link-container">
        <a href="/proyectos.html" className="view-all-projects-link">
          Ver todos los proyectos <span className="arrow-icon">&rarr;</span>
        </a>
      </div>
    </div>
  </section>
);

export default Projects;
