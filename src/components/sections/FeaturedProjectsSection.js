import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import data from '../../data/datos_web.json';

const FeaturedProjectsSection = () => {
  const [projects, setProjects] = useState([]);
  const sliderRef = useRef(null);

  useEffect(() => {
    // Cargar proyectos destacados
    if (data.proyectosresumen) {
      setProjects(data.proyectosresumen.slice(0, 5));
    }
  }, []);

  const getScrollAmount = () => {
    const slider = sliderRef.current;
    if (slider) {
      const firstCard = slider.querySelector('.project-card');
      if (firstCard) {
        const cardStyle = window.getComputedStyle(firstCard);
        const cardWidth = firstCard.offsetWidth;
        const containerStyle = window.getComputedStyle(slider);
        let gapValue = parseFloat(containerStyle.gap);
        if (isNaN(gapValue)) {
          gapValue = parseFloat(cardStyle.marginRight) || 24;
        }
        return cardWidth + gapValue;
      }
    }
    return 320;
  };

  const handlePrevious = () => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = getScrollAmount();
      slider.scrollTo({
        left: slider.scrollLeft - scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    const slider = sliderRef.current;
    if (slider) {
      const scrollAmount = getScrollAmount();
      slider.scrollTo({
        left: slider.scrollLeft + scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  const canScrollLeft = () => {
    const slider = sliderRef.current;
    return slider ? slider.scrollLeft > 5 : false;
  };

  const canScrollRight = () => {
    const slider = sliderRef.current;
    if (!slider) return false;
    const maxScrollLeft = slider.scrollWidth - slider.clientWidth;
    return slider.scrollLeft < maxScrollLeft - 5;
  };

  const renderProjectCard = (project) => {
    let resumen = project.descripcionCompleta || 'Descripción no disponible.';
    if (resumen.length > 100) {
      resumen = resumen.substring(0, 100) + '...';
    }

    return (
      <article key={project.id} className="project-card">
        <div className="project-img-placeholder">
          {project.portadaUrl ? (
            <img 
              src={project.portadaUrl} 
              alt={project.altPortada || project.titulo}
              loading="lazy"
              onError={(e) => {
                e.target.style.display = 'none';
                e.target.parentElement.innerHTML = '<span>[Imagen no disponible]</span>';
              }}
            />
          ) : (
            <span>[Imagen no disponible]</span>
          )}
        </div>
        <div className="project-details">
          <h3 className="project-name">{project.titulo}</h3>
          <p className="project-summary">{resumen}</p>
          <a 
            href={project.enlacePagina || '#'} 
            className="btn btn-details-project"
          >
            {project.enlaceDetalles || 'Ver detalles'}
          </a>
        </div>
      </article>
    );
  };

  return (
    <section className="content-block" id="proyectos-destacados">
      <div className="container">
        <h2 className="block-title">Proyectos Destacados</h2>
        
        <div className="projects-slider-controls">
          <button 
            className="slider-btn prev-btn" 
            onClick={handlePrevious}
            disabled={!canScrollLeft()}
            aria-label="Proyecto anterior"
          >
            <i className="fas fa-chevron-left"></i>
          </button>
          <button 
            className="slider-btn next-btn" 
            onClick={handleNext}
            disabled={!canScrollRight()}
            aria-label="Siguiente proyecto"
          >
            <i className="fas fa-chevron-right"></i>
          </button>
        </div>

        <div 
          className="info-cards-wrapper grid-three-cols projects-slider"
          ref={sliderRef}
        >
          {projects.length > 0 ? (
            projects.map(renderProjectCard)
          ) : (
            <p>Cargando proyectos destacados...</p>
          )}
        </div>

        <div className="all-projects-link-container">
          <Link to="/proyectos" className="view-all-projects-link">
            Ver todos los proyectos <span className="arrow-icon">&rarr;</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProjectsSection;
