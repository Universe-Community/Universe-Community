import React from 'react';

const ContactInfo = ({ contacts }) => {
  const emailContact = contacts.find(
    c => c.plataforma && c.plataforma.toLowerCase() === 'email'
  );

  const contactItems = [
    ...(emailContact ? [{
      icon: emailContact.icono || 'fas fa-envelope',
      label: 'Correo electrónico',
      value: (
        <a href={emailContact.url}>
          {emailContact.url.replace('mailto:', '')}
        </a>
      )
    }] : []),
    {
      icon: 'fas fa-clock',
      label: 'Horario de soporte',
      value: 'Lunes a Viernes : 9:00 AM - 6:00 PM (UTC-5)'
    },
    {
      icon: 'fas fa-headset',
      label: 'Soporte en línea',
      value: 'Disponible en nuestro servidor de Discord'
    }
  ];

  if (contactItems.length === 0) {
    return <p>Información de contacto detallada no disponible.</p>;
  }

  return (
    <ul className="contact-info-list">
      {contactItems.map((item, index) => (
        <li key={index} className="contact-info-item">
          <i className={item.icon}></i>
          <div>
            <span className="info-label">{item.label}</span>
            {typeof item.value === 'string' ? item.value : item.value}
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ContactInfo;
