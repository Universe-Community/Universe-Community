# Universe Community - React

Una aplicación web moderna desarrollada en React que representa la comunidad global Universe Community, dedicada a crear, innovar y conectar personas a través de proyectos colaborativos.

## 🚀 Características

- **Diseño Moderno**: Interfaz moderna y responsive con diseño atractivo
- **Tema Oscuro/Claro**: Cambio dinámico entre temas con persistencia local
- **Navegación Intuitiva**: Sistema de navegación responsive con menús desplegables
- **Componentes Reutilizables**: Arquitectura modular con componentes React reutilizables
- **Carga Dinámica de Datos**: Contenido cargado dinámicamente desde archivos JSON
- **Optimización SEO**: Estructura semántica y metadatos optimizados
- **Accesibilidad**: Cumple con estándares de accesibilidad web

## 🛠️ Tecnologías Utilizadas

- **React 18**: Framework principal
- **React Router DOM**: Navegación entre páginas
- **CSS Variables**: Sistema de temas dinámico
- **Font Awesome**: Iconografía
- **Google Fonts**: Tipografía Poppins
- **ES6+**: JavaScript moderno

## 📂 Estructura del Proyecto

```
src/
├── components/
│   ├── layout/
│   │   ├── Header.js
│   │   └── Footer.js
│   ├── pages/
│   │   ├── HomePage.js
│   │   ├── ProjectsPage.js
│   │   └── NoticesPage.js
│   ├── sections/
│   │   ├── HeroSection.js
│   │   ├── MissionVisionSection.js
│   │   ├── WhatWeDoSection.js
│   │   ├── FeaturedProjectsSection.js
│   │   ├── DonationSection.js
│   │   ├── CommunitySection.js
│   │   └── SupportSection.js
│   └── ui/
│       ├── Logo.js
│       ├── Navigation.js
│       ├── ThemeToggle.js
│       ├── MobileMenuToggle.js
│       ├── FAQAccordion.js
│       ├── ContactInfo.js
│       └── FloatingWhatsApp.js
├── hooks/
│   └── useTheme.js
├── data/
│   └── datos_web.json
├── styles/
│   ├── index.css
│   └── App.css
├── App.js
└── index.js
```

## 🎨 Sistema de Temas

El proyecto incluye un sistema de temas dinámico que permite alternar entre modo claro y oscuro:

- **Variables CSS**: Todas las propiedades de color y espaciado están centralizadas
- **Persistencia**: El tema seleccionado se guarda en localStorage
- **Detección Automática**: Detecta la preferencia del sistema operativo
- **Transiciones Suaves**: Cambios animados entre temas

## 📱 Responsive Design

- **Mobile First**: Diseño optimizado para dispositivos móviles
- **Breakpoints**: 480px, 768px, 991px, 1200px
- **Navegación Móvil**: Menú hamburguesa con animaciones
- **Grids Adaptativos**: Layouts que se ajustan automáticamente

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 14 o superior)
- npm o yarn

### Instalación

1. Clona el repositorio:
```bash
git clone <url-del-repositorio>
cd Universe-Community
```

2. Instala las dependencias:
```bash
npm install
```

3. Inicia el servidor de desarrollo:
```bash
npm start
```

4. Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

### Scripts Disponibles

- `npm start`: Inicia el servidor de desarrollo
- `npm build`: Construye la aplicación para producción
- `npm test`: Ejecuta las pruebas
- `npm eject`: Expone la configuración de webpack (irreversible)

## 📄 Configuración de Datos

Los datos del sitio se encuentran en `src/data/datos_web.json` e incluyen:

- **Anuncios**: Información sobre eventos y novedades
- **Proyectos**: Listado de proyectos destacados
- **Preguntas Frecuentes**: FAQ con respuestas expandibles
- **Redes Sociales**: Enlaces de contacto y perfiles sociales
- **Información de Donaciones**: Enlaces para apoyar la comunidad

## 🎯 Funcionalidades Principales

### Página Principal (HomePage)
- **Hero Section**: Presentación principal con llamadas a la acción
- **Misión y Visión**: Tarjetas con información institucional
- **Qué Hacemos**: Grid de servicios con iconos
- **Proyectos Destacados**: Carrusel de proyectos con navegación
- **Donaciones**: Sección para apoyar la comunidad
- **Conecta**: Enlaces a canales de comunicación
- **Soporte**: FAQ y información de contacto

### Página de Proyectos
- Listado completo de proyectos
- Filtros y categorización
- Cards con información detallada

### Página de Avisos
- Anuncios y noticias recientes
- Categorización por etiquetas
- Imágenes y enlaces externos

## 🔧 Personalización

### Colores y Temas
Modifica las variables CSS en `src/styles/index.css`:

```css
:root {
  --primary-color: #6A11CB;
  --secondary-color: #2575FC;
  --accent-color: #FF6B6B;
  /* ... más variables */
}
```

### Datos del Sitio
Actualiza `src/data/datos_web.json` con tu contenido específico.

### Componentes
Cada componente está diseñado para ser reutilizable y fácil de modificar.

## 🌐 Despliegue

### Construcción para Producción
```bash
npm run build
```

Esto crea una carpeta `build` con los archivos optimizados para producción.

### Opciones de Hosting
- **Netlify**: Arrastra la carpeta build
- **Vercel**: Conecta el repositorio
- **GitHub Pages**: Usa gh-pages
- **Firebase Hosting**: Usa Firebase CLI

## 🤝 Contribución

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add some AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

## 📞 Contacto

Universe Community - [Sitio Web](https://universe-community.com)

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

---

Desarrollado con ❤️ por Universe Community
