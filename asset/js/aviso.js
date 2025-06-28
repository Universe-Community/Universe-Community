document.addEventListener('DOMContentLoaded', () => {
  const siteHeader = document.getElementById('siteHeader');
  let headerHeight = 0;

  function updateHeaderHeightAndPadding() {
    if (siteHeader) {
      headerHeight = siteHeader.offsetHeight;
      document.body.style.paddingTop = `${headerHeight}px`;
      document.documentElement.style.setProperty(
        '--header-height',
        `${headerHeight}px`
      );
    }
  }

  updateHeaderHeightAndPadding();
  window.addEventListener('resize', updateHeaderHeightAndPadding);

  // --- Theme Toggle Logic ---
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('theme');

  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  if (currentTheme) {
    applyTheme(currentTheme);
  } else {
    const prefersDark =
      window.matchMedia &&
      window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      applyTheme('dark');
      localStorage.setItem('theme', 'dark');
    }
  }

  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      let theme = 'light';
      if (document.body.classList.contains('dark-mode')) {
        theme = 'dark';
      }
      localStorage.setItem('theme', theme);
    });
  }

  // --- Mobile Navigation Menu (Simplified) ---
  const navToggleBtn = document.getElementById('navToggleBtn');
  const mainMenuNav = document.getElementById('mainMenuNav');
  const navIcon = navToggleBtn ? navToggleBtn.querySelector('i') : null;

  if (navToggleBtn && mainMenuNav && navIcon) {
    navToggleBtn.addEventListener('click', () => {
      const isExpanded = mainMenuNav.classList.toggle('menu-visible');
      navToggleBtn.setAttribute('aria-expanded', String(isExpanded));
      navIcon.classList.toggle('fa-bars', !isExpanded);
      navIcon.classList.toggle('fa-times', isExpanded);
    });
  }

  // --- Close mobile menu when a link is clicked ---
  if (mainMenuNav) {
    mainMenuNav.addEventListener('click', (event) => {
      if (
        event.target.tagName === 'A' &&
        mainMenuNav.classList.contains('menu-visible')
      ) {
        if (navToggleBtn) {
          navToggleBtn.click();
        }
      }
    });
  }

  // --- Resaltado de Página Actual en el Menú ---
  function updateCurrentPage() {
    const mainMenu = document.getElementById('main-menu-list');
    if (!mainMenu) return;
    const currentPath =
      window.location.pathname.split('/').pop() || 'index.html';
    mainMenu.querySelectorAll('a').forEach((navLink) => {
      navLink.classList.remove('current-page');
      const linkHref = navLink.getAttribute('href');
      if (!linkHref) return;
      const linkPath = (linkHref.split('/').pop() || 'index.html').split(
        '#'
      )[0];
      if (linkPath === currentPath) {
        navLink.classList.add('current-page');
      }
    });
  }

  // --- Cargar Contenido Dinámico desde JSON ---
  const announcementsGrid = document.getElementById('announcementsGrid');
  const mainMenuList = document.getElementById('main-menu-list');
  const footerContactDirectContainer = document.getElementById(
    'footerContactDirectContainer'
  );
  const footerSocialProfilesContainer = document.getElementById(
    'footerSocialProfilesContainer'
  );
  const fabWhatsapp = document.getElementById('fabWhatsapp');

  function renderizarMenuDonaciones(donaciones, container) {
    if (!container || !donaciones) return;
    donaciones.forEach((donacion) => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = donacion.url;
      link.target = '_blank';
      link.rel = 'noopener noreferrer';
      link.classList.add('main-cta');
      link.innerHTML = `<i class="${donacion.icono}" style="margin-right: 8px;"></i>${donacion.plataforma}`;
      li.appendChild(link);
      container.appendChild(li);
    });
  }

  function renderizarAnuncios(anuncios, container) {
    if (!container || !anuncios || anuncios.length === 0) {
      if (container)
        container.innerHTML =
          '<p>No hay anuncios disponibles en este momento.</p>';
      return;
    }
    container.innerHTML = '';
    anuncios.forEach((anuncio) => {
      const card = document.createElement('article');
      card.classList.add('announcement-card');
      card.id =
        anuncio.id || `anuncio-${Math.random().toString(36).substr(2, 9)}`;

      let flyerHTML = '';
      if (anuncio.flyerUrl) {
        flyerHTML = `<div class="announcement-flyer"><img src="${
          anuncio.flyerUrl
        }" alt="${
          anuncio.altFlyer || 'Flyer del anuncio'
        }" loading="lazy" onerror="this.style.display='none'; this.parentElement.innerHTML = '<span class=\\'flyer-placeholder-text\\'>[Imagen no disponible]</span>';"></div>`;
      }

      let enlaceHTML = '';
      if (anuncio.enlaceUrl && anuncio.enlaceTexto) {
        enlaceHTML = `<a href="${anuncio.enlaceUrl}" class="announcement-link" target="_blank" rel="noopener">${anuncio.enlaceTexto} <i class="fas fa-arrow-right"></i></a>`;
      }

      let etiquetaHTML = '';
      if (anuncio.etiqueta) {
        etiquetaHTML = `<span class="announcement-tag">${anuncio.etiqueta}</span>`;
      }

      card.innerHTML = `
                    ${flyerHTML}
                    <div class="announcement-header">
                        <h3 class="announcement-title">${anuncio.titulo}</h3>
                        <span class="announcement-date">${anuncio.fecha}</span>
                    </div>
                    <div class="announcement-content">
                        <p>${anuncio.contenido.replace(/\n/g, '<br>')}</p> 
                    </div>
                    <div class="announcement-footer">
                        ${enlaceHTML}
                        ${etiquetaHTML}
                    </div>
                `;
      container.appendChild(card);
    });
  }

  function renderizarFooter(
    redesSociales,
    contactContainer,
    socialContainer,
    fabElement
  ) {
    if (!redesSociales) return;

    if (contactContainer && redesSociales.contactosDirectos) {
      contactContainer.innerHTML = '';
      redesSociales.contactosDirectos.forEach((contacto) => {
        const linkElement = document.createElement('a');
        linkElement.href = contacto.url || '#';
        linkElement.target = '_blank';
        linkElement.setAttribute(
          'aria-label',
          contacto.textoAlternativo || `Contactar por ${contacto.plataforma}`
        );
        linkElement.innerHTML = `<i class="${
          contacto.icono
        }" aria-hidden="true"></i> ${contacto.plataforma} ${
          contacto.tipo ? '(' + contacto.tipo + ')' : ''
        }`;
        contactContainer.appendChild(linkElement);
      });
    }

    if (socialContainer && redesSociales.perfilesSociales) {
      socialContainer.innerHTML = '';
      redesSociales.perfilesSociales.forEach((perfil) => {
        const linkElement = document.createElement('a');
        linkElement.href = perfil.url || '#';
        linkElement.target = '_blank';
        linkElement.title = perfil.titulo;
        linkElement.setAttribute(
          'aria-label',
          `Visita nuestro perfil de ${perfil.titulo}`
        );
        linkElement.innerHTML = `<i class="${perfil.icono}" aria-hidden="true"></i>`;
        socialContainer.appendChild(linkElement);
      });
    }

    if (fabElement && redesSociales.contactosDirectos) {
      const whatsappFabInfo = redesSociales.contactosDirectos.find(
        (c) =>
          c.plataforma &&
          c.plataforma.toLowerCase() === 'whatsapp' &&
          c.tipo === 'Contacto Directo'
      );
      fabElement.href = whatsappFabInfo
        ? whatsappFabInfo.url
        : 'javascript:void(0);';
    }
  }

  async function cargarContenidoDesdeJSON() {
    try {
      const response = await fetch('datos_web.json');
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);
      const data = await response.json();

      renderizarMenuDonaciones(data.redesSociales?.donaciones, mainMenuList);
      renderizarAnuncios(data.anuncios, announcementsGrid);
      renderizarFooter(
        data.redesSociales,
        footerContactDirectContainer,
        footerSocialProfilesContainer,
        fabWhatsapp
      );
    } catch (error) {
      console.error('Error al cargar contenido desde JSON:', error);
      if (announcementsGrid)
        announcementsGrid.innerHTML = `<p>Error al cargar los anuncios: ${error.message}.</p>`;
      if (footerContactDirectContainer)
        footerContactDirectContainer.innerHTML =
          '<p>Error al cargar contactos.</p>';
      if (footerSocialProfilesContainer)
        footerSocialProfilesContainer.innerHTML =
          '<p>Error al cargar redes.</p>';
    } finally {
      updateCurrentPage();
    }
  }

  cargarContenidoDesdeJSON();

  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});
