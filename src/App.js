import React, { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider } from './hooks/useTheme';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import FloatingWhatsApp from './components/ui/FloatingWhatsApp';
import HomePage from './components/pages/HomePage';
import ProjectsPage from './components/pages/ProjectsPage';
import NoticesPage from './components/pages/NoticesPage';
import CommunitiesPage from './components/pages/CommunitiesPage';
import AboutPage from './components/pages/AboutPage';
import './styles/App.css';

function App() {
  useEffect(() => {
    // Inicializar animaciones de scroll
    const observerCallback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate');
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, {
      threshold: 0.1,
      rootMargin: '50px',
    });

    // Observar todos los elementos con la clase scroll-animate
    const animateElements = document.querySelectorAll('.scroll-animate');
    animateElements.forEach((el) => observer.observe(el));

    // Efecto de scroll suave para el header
    const handleScroll = () => {
      const header = document.querySelector('.site-header');
      if (header) {
        if (window.scrollY > 100) {
          header.classList.add('scrolled');
        } else {
          header.classList.remove('scrolled');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <ThemeProvider>
      <div className="App">
        <Header />
        <main>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/proyectos" element={<ProjectsPage />} />
            <Route path="/avisos" element={<NoticesPage />} />
            <Route path="/comunidades" element={<CommunitiesPage />} />
            <Route path="/nosotros" element={<AboutPage />} />
            <Route path="*" element={<HomePage />} />
          </Routes>
        </main>
        <Footer />
        <FloatingWhatsApp />
      </div>
    </ThemeProvider>
  );
}

export default App;
