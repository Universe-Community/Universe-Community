import React, { useState } from 'react';

const FAQAccordion = ({ faqs }) => {
  const [activeItems, setActiveItems] = useState(new Set());

  const toggleItem = (faqId) => {
    const newActiveItems = new Set(activeItems);
    if (newActiveItems.has(faqId)) {
      newActiveItems.delete(faqId);
    } else {
      newActiveItems.add(faqId);
    }
    setActiveItems(newActiveItems);
  };

  const handleKeyDown = (event, faqId) => {
    if (event.key === 'Enter' || event.key === ' ') {
      event.preventDefault();
      toggleItem(faqId);
    }
  };

  if (!faqs || faqs.length === 0) {
    return <p>No hay preguntas frecuentes disponibles.</p>;
  }

  return (
    <div className="faq-accordion">
      {faqs.map((faq) => {
        const isActive = activeItems.has(faq.id);
        
        return (
          <div key={faq.id} className={`faq-item ${isActive ? 'active' : ''}`}>
            <div
              className="faq-question"
              role="button"
              tabIndex={0}
              aria-expanded={isActive}
              aria-controls={`faq-answer-${faq.id}`}
              onClick={() => toggleItem(faq.id)}
              onKeyDown={(e) => handleKeyDown(e, faq.id)}
            >
              <span>{faq.pregunta}</span>
              <i className="fas fa-chevron-down"></i>
            </div>
            <div 
              className="faq-answer" 
              id={`faq-answer-${faq.id}`}
              style={{
                maxHeight: isActive ? 'none' : '0',
                overflow: 'hidden',
                transition: 'all 0.3s ease'
              }}
            >
              <p dangerouslySetInnerHTML={{ 
                __html: faq.respuesta.replace(/\n/g, '<br>') 
              }} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default FAQAccordion;
