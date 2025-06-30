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

  // --- Mobile Navigation Menu (Main Toggle) ---
  const navToggleBtn = document.getElementById('navToggleBtn');
  const mainMenuNav = document.getElementById('mainMenuNav');
  const navIcon = navToggleBtn ? navToggleBtn.querySelector('i') : null;

  if (navToggleBtn && mainMenuNav && navIcon) {
    navToggleBtn.addEventListener('click', () => {
      const isExpanded = mainMenuNav.classList.toggle('menu-visible');
      navToggleBtn.setAttribute('aria-expanded', String(isExpanded));
      navIcon.classList.toggle('fa-bars', !isExpanded);
      navIcon.classList.toggle('fa-times', isExpanded);

      if (!isExpanded) {
        mainMenuNav
          .querySelectorAll('.has-submenu.open')
          .forEach((openSubmenuLi) => {
            openSubmenuLi.classList.remove('open');
            const link = openSubmenuLi.querySelector('a[aria-haspopup="true"]');
            if (link) link.setAttribute('aria-expanded', 'false');
            const submenu = openSubmenuLi.querySelector('.submenu');
            if (submenu && window.innerWidth <= 991)
              submenu.style.maxHeight = null;
          });
      }
    });
  }

  // --- Submenu Toggle Logic (Revised) ---
  function performToggleVisually(listItem, linkElement, submenuElement) {
    const isOpen = listItem.classList.toggle('open');
    if (linkElement) linkElement.setAttribute('aria-expanded', String(isOpen));

    if (window.innerWidth <= 991 && submenuElement) {
      if (isOpen) {
        submenuElement.style.maxHeight = submenuElement.scrollHeight + 'px';
      } else {
        submenuElement.style.maxHeight = null;
        submenuElement
          .querySelectorAll('.has-submenu.open')
          .forEach((openChild) => {
            openChild.classList.remove('open');
            const childLink = openChild.querySelector(
              'a[aria-haspopup="true"]'
            );
            if (childLink) childLink.setAttribute('aria-expanded', 'false');
            const childSubmenu = openChild.querySelector('.submenu');
            if (childSubmenu) childSubmenu.style.maxHeight = null;
          });
      }
    }
  }

  if (mainMenuNav) {
    mainMenuNav.querySelectorAll('li.has-submenu').forEach((listItem) => {
      const link = listItem.querySelector(":scope > a[aria-haspopup='true']");
      const toggleIcon = listItem.querySelector(
        ':scope > a > .submenu-toggle-icon'
      );
      const submenu = listItem.querySelector(':scope > .submenu');

      if (!link || !submenu) return;

      if (toggleIcon) {
        toggleIcon.addEventListener('click', function (event) {
          event.preventDefault();
          event.stopPropagation();
          performToggleVisually(listItem, link, submenu);
        });
      }

      link.addEventListener('click', function (event) {
        if (event.target.closest('.submenu-toggle-icon')) {
          return;
        }

        const isMobileView = window.innerWidth <= 991;
        const hasValidHref =
          link.getAttribute('href') &&
          link.getAttribute('href') !== '#' &&
          link.getAttribute('href') !== '';
        const linkPathOnly = (
          link.pathname.split('/').pop() || 'index.html'
        ).split('#')[0];
        const currentPathOnly = (
          window.location.pathname.split('/').pop() || 'index.html'
        ).split('#')[0];
        const isLinkToCurrentPagePathOnly =
          linkPathOnly === currentPathOnly && !link.hash;

        if (isMobileView) {
          if (listItem.classList.contains('has-submenu')) {
            event.preventDefault();
            performToggleVisually(listItem, link, submenu);
          }
        } else {
          // Desktop View
          if (hasValidHref) {
            if (isLinkToCurrentPagePathOnly) {
              event.preventDefault();
              performToggleVisually(listItem, link, submenu);
            }
          } else {
            event.preventDefault();
            performToggleVisually(listItem, link, submenu);
          }
        }
      });
    });
  }

  // --- Close mobile menu when a direct navigation link (not a submenu toggle) is clicked ---
  if (mainMenuNav) {
    mainMenuNav.querySelectorAll('ul li a').forEach((link) => {
      link.addEventListener('click', (event) => {
        const isSubmenuToggleIcon = event.target.closest(
          '.submenu-toggle-icon'
        );
        const listItem = link.closest('li');
        const isParentLinkThatTogglesOnMobile =
          listItem &&
          listItem.classList.contains('has-submenu') &&
          window.innerWidth <= 991;

        if (isSubmenuToggleIcon || isParentLinkThatTogglesOnMobile) {
          return;
        }

        if (mainMenuNav.classList.contains('menu-visible')) {
          if (link.getAttribute('href') && link.getAttribute('href') !== '#') {
            mainMenuNav.classList.remove('menu-visible');
            if (navToggleBtn)
              navToggleBtn.setAttribute('aria-expanded', 'false');
            if (navIcon) {
              navIcon.classList.remove('fa-times');
              navIcon.classList.add('fa-bars');
            }
            mainMenuNav
              .querySelectorAll('.has-submenu.open')
              .forEach((openSubmenuLi) => {
                openSubmenuLi.classList.remove('open');
                const parentLink = openSubmenuLi.querySelector(
                  'a[aria-haspopup="true"]'
                );
                if (parentLink)
                  parentLink.setAttribute('aria-expanded', 'false');
                const submenu = openSubmenuLi.querySelector('.submenu');
                if (submenu && window.innerWidth <= 991)
                  submenu.style.maxHeight = null;
              });
          }
        }
      });
    });
  }

  // --- Resaltado de Página Actual en el Menú ---
  function updateCurrentPage() {
    if (!mainMenuNav) return;
    const currentUrlPath =
      window.location.pathname.split('/').pop() || 'index.html';
    const currentUrlHash = window.location.hash;

    mainMenuNav.querySelectorAll('a').forEach((navLink) => {
      navLink.classList.remove('current-page');
      const linkHref = navLink.getAttribute('href');
      if (!linkHref) return;

      const linkUrl = new URL(linkHref, window.location.origin);
      const linkPath = linkUrl.pathname.split('/').pop() || 'index.html';
      const linkHash = linkUrl.hash;

      let isActive = false;

      if (linkPath === currentUrlPath) {
        if (linkHash) {
          if (linkHash === currentUrlHash) isActive = true;
        } else {
          if (!currentUrlHash || currentUrlHash === '#') isActive = true;
        }
      }

      if (isActive) {
        navLink.classList.add('current-page');
        let currentElementForParentCheck = navLink;
        while (currentElementForParentCheck) {
          const parentSubmenuUl =
            currentElementForParentCheck.closest('ul.submenu');
          if (!parentSubmenuUl) break;
          const parentLi = parentSubmenuUl.parentElement;
          if (!parentLi || !parentLi.classList.contains('has-submenu')) break;
          const parentAnchor = parentLi.querySelector(
            ':scope > a[aria-haspopup="true"]'
          );
          if (parentAnchor) {
            parentAnchor.classList.add('current-page');
          } else {
            break;
          }
          if (parentLi.parentElement === mainMenuNav.querySelector('ul')) {
            break;
          }
          currentElementForParentCheck = parentLi;
        }
      }
    });
  }

  updateCurrentPage();
  window.addEventListener('hashchange', updateCurrentPage);

  // --- Cargar Contenido Dinámico desde JSON (Solo Footer, FAB y Botón de Admin) ---
  const btnAdminContactReception = document.getElementById(
    'btnAdminContactReception'
  );
  const footerContactDirectContainer = document.getElementById(
    'footerContactDirectContainer'
  );
  const footerSocialProfilesContainer = document.getElementById(
    'footerSocialProfilesContainer'
  );
  const fabWhatsapp = document.getElementById('fabWhatsapp');
  const paypalMenuLink = document.getElementById('paypalMenuLink');

  async function cargarContenidoDesdeJSON() {
    console.log(
      'Intentando cargar datos_web.json para comunidades-whatsapp.html (botón admin, footer, fab)...'
    );
    try {
      const response = await fetch('datos_web.json');
      console.log('Respuesta del fetch (comunidades):', response);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} al cargar datos_web.json`
        );
      }
      const data = await response.json();
      console.log('Datos JSON cargados (comunidades):', data);

      // Llenar enlace de donación
      if (
        paypalMenuLink &&
        data.redesSociales &&
        data.redesSociales.donaciones
      ) {
        const paypalInfo = data.redesSociales.donaciones.find(
          (d) => d.plataforma && d.plataforma.toLowerCase() === 'paypal'
        );
        if (paypalInfo && paypalInfo.url) {
          paypalMenuLink.href = paypalInfo.url;
        } else {
          paypalMenuLink.parentElement.style.display = 'none';
        }
      } else if (paypalMenuLink) {
        paypalMenuLink.parentElement.style.display = 'none';
      }

      // Configurar botón de recepción para administradores
      if (btnAdminContactReception && data.Recepciones) {
        const recepcionInfo = data.Recepciones.find(
          (r) => r.id === 'recepcion_general_whatsapp'
        );
        if (recepcionInfo && recepcionInfo.enlaceUrl) {
          btnAdminContactReception.href = recepcionInfo.enlaceUrl;
          const btnTextSpan = btnAdminContactReception.querySelector('span');
          if (recepcionInfo.textoBoton && btnTextSpan) {
            btnTextSpan.textContent = recepcionInfo.textoBoton;
          }
          const btnIcon = btnAdminContactReception.querySelector('i');
          if (recepcionInfo.icono && btnIcon) {
            btnIcon.className = recepcionInfo.icono;
          }
        } else {
          btnAdminContactReception.href = 'javascript:void(0);';
          btnAdminContactReception.style.cursor = 'default';
          btnAdminContactReception.style.opacity = '0.7';
          btnAdminContactReception.title = 'Enlace de recepción no disponible';
          console.warn(
            'No se encontró el enlace de recepción general de WhatsApp en el JSON.'
          );
        }
      } else if (btnAdminContactReception) {
        btnAdminContactReception.href = 'javascript:void(0);';
        btnAdminContactReception.style.cursor = 'default';
        btnAdminContactReception.style.opacity = '0.7';
      }

      // Cargar Contenido del Footer y FAB
      if (data.redesSociales) {
        renderizarFooterYFAB(
          data.redesSociales,
          footerContactDirectContainer,
          footerSocialProfilesContainer,
          fabWhatsapp
        );
      }
    } catch (error) {
      console.error('Error al cargar contenido desde JSON:', error);
      if (footerContactDirectContainer)
        footerContactDirectContainer.innerHTML =
          '<p>Error al cargar contactos.</p>';
      if (footerSocialProfilesContainer)
        footerSocialProfilesContainer.innerHTML =
          '<p>Error al cargar redes.</p>';
      if (fabWhatsapp) fabWhatsapp.href = 'javascript:void(0);';
      if (btnAdminContactReception) {
        btnAdminContactReception.href = 'javascript:void(0);';
        btnAdminContactReception.style.cursor = 'default';
        btnAdminContactReception.style.opacity = '0.7';
      }
    }
  }

  function renderizarFooterYFAB(
    redesSociales,
    contactContainer,
    socialContainer,
    fabElement
  ) {
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
    } else if (contactContainer) {
      contactContainer.innerHTML =
        '<p>Información de contacto no disponible.</p>';
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
    } else if (socialContainer) {
      socialContainer.innerHTML = '<p>Redes sociales no disponibles.</p>';
    }

    if (fabElement && redesSociales.contactosDirectos) {
      const whatsappFabInfo = redesSociales.contactosDirectos.find(
        (c) =>
          c.plataforma &&
          c.plataforma.toLowerCase() === 'whatsapp' &&
          c.tipo === 'Contacto Directo'
      );
      if (whatsappFabInfo && whatsappFabInfo.url) {
        fabElement.href = whatsappFabInfo.url;
      } else {
        fabElement.href = 'javascript:void(0);';
        fabElement.style.cursor = 'default';
      }
    } else if (fabElement) {
      fabElement.href = 'javascript:void(0);';
      fabElement.style.cursor = 'default';
    }
  }

  cargarContenidoDesdeJSON();

  const currentYearElement = document.getElementById('currentYear');
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});
