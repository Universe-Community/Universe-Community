import React, { useState, useEffect } from 'react';
import data from '../../data/datos_web.json';

const ProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    // Cargar todos los proyectos
    if (data.proyectosresumen) {
      setProjects(data.proyectosresumen);
    }
  }, []);

  const renderProjectCard = (project) => {
    let resumen = project.descripcionCompleta || 'Descripción no disponible.';
    if (resumen.length > 150) {
      resumen = resumen.substring(0, 150) + '...';
    }

    return (
      <article key={project.id} className="project-card">
        <div className="project-image-container">
          {project.portadaUrl ? (
            <div className="project-img-placeholder">
              <img 
                src={project.portadaUrl} 
                alt={project.altPortada || project.titulo}
                loading="lazy"
                onError={(e) => {
                  e.target.style.display = 'none';
                  e.target.parentElement.innerHTML = '<div class="project-fallback"><h3 class="project-name-fallback">' + project.titulo + '</h3></div>';
                }}
              />
              <div className="project-image-overlay">
                <h3 className="project-name-overlay">{project.titulo}</h3>
                <div className="project-tags-overlay">
                  {project.tecnologias && project.tecnologias.slice(0, 3).map((tech, index) => (
                    <span key={index} className="project-tag-overlay">{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          ) : (
            <div className="project-img-placeholder">
              <div className="project-fallback">
                <h3 className="project-name-fallback">{project.titulo}</h3>
              </div>
            </div>
          )}
        </div>
        
        <div className="project-details">
          <p className="project-summary">{resumen}</p>
          <div className="project-tags">
            {project.tecnologias && project.tecnologias.map((tech, index) => (
              <span key={index} className="project-tag">{tech}</span>
            ))}
          </div>
          <a 
            href={project.enlacePagina || '#'} 
            className="btn btn-details-project"
            target="_blank"
            rel="noopener noreferrer"
          >
            {project.enlaceDetalles || 'Ver detalles'}
          </a>
        </div>
      </article>
    );
  };

  return (
    <div className="projects-page">
      <section className="page-hero">
        <div className="container">
          <h1 className="page-title" style={{color: '#ffffff', background: 'none', WebkitTextFillColor: '#ffffff', WebkitBackgroundClip: 'unset', backgroundClip: 'unset'}}>Nuestros Proyectos</h1>
          <p className="page-subtitle" style={{color: 'rgba(255, 255, 255, 0.95)'}}>
            Descubre los proyectos innovadores que estamos desarrollando en Universe Community.
            Cada proyecto refleja nuestro compromiso con la innovación y el impacto positivo.
          </p>
        </div>
      </section>

      <section className="content-block">
        <div className="container">
          <div className="projects-grid">
            {projects.length > 0 ? (
              projects.map(renderProjectCard)
            ) : (
              <p>No hay proyectos disponibles en este momento.</p>
            )}
          </div>
        </div>
      </section>
    </div>
  );
};

export default ProjectsPage;
