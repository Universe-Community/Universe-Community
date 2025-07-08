import React from 'react';
import { useStaggeredAnimation } from '../../hooks/useAnimations';

const WhatWeDoSection = () => {
  const activities = [
    {
      icon: 'fas fa-project-diagram',
      title: 'Proyectos Colaborativos',
      description: 'Impulsamos iniciativas donde la inteligencia colectiva y la cooperación son clave para alcanzar metas ambiciosas.'
    },
    {
      icon: 'fas fa-chalkboard-teacher',
      title: 'Aprendizaje Continuo',
      description: 'Fomentamos un ambiente de curiosidad y desarrollo constante, compartiendo conocimientos y experiencias.'
    },
    {
      icon: 'fas fa-globe-americas',
      title: 'Conexiones Globales',
      description: 'Conectamos personas de diversas culturas y disciplinas, creando una red rica en perspectivas y talentos.'
    },
    {
      icon: 'fas fa-lightbulb',
      title: 'Innovación Abierta',
      description: 'Promovemos un ecosistema donde las ideas fluyen libremente y se transforman en soluciones con impacto real.'
    }
  ];

  const ActivityCard = ({ activity, index }) => {
    const [ref, isVisible] = useStaggeredAnimation(index * 150);
    
    return (
      <div 
        ref={ref}
        className={`card what-we-do-card hover-lift ${isVisible ? 'animate-scale-in' : ''}`}
        style={{ animationDelay: `${index * 0.1}s` }}
      >
        <div className="card-icon-top animate-float">
          <i className={activity.icon}></i>
        </div>
        <h3 className="card-title">{activity.title}</h3>
        <p className="card-description">{activity.description}</p>
      </div>
    );
  };

  return (
    <section className="content-block bg-shaded" id="que-hacemos">
      <div className="container">
        <h2 className="block-title scroll-animate">Qué Hacemos</h2>
        <div className="info-cards-wrapper grid-three-cols">
          {activities.map((activity, index) => (
            <ActivityCard key={index} activity={activity} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default WhatWeDoSection;
