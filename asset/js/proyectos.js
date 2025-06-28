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

  // --- Cargar Contenido Dinámico desde JSON ---
  const announcementsCarouselContainer = document.getElementById(
    'announcementsCarousel'
  );
  const carouselSlidesContainer = document.getElementById('carouselSlides');
  const carouselDotsContainer = document.getElementById(
    'carouselDotsContainer'
  );
  const projectsGridContainer = document.getElementById('projectsGrid');
  const footerContactDirectContainer = document.getElementById(
    'footerContactDirectContainer'
  );
  const footerSocialProfilesContainer = document.getElementById(
    'footerSocialProfilesContainer'
  );
  const fabWhatsapp = document.getElementById('fabWhatsapp');
  const paypalMenuLink = document.getElementById('paypalMenuLink');

  async function cargarContenidoDesdeJSON() {
    console.log('Intentando cargar datos_web.json...');
    try {
      const response = await fetch('datos_web.json');
      console.log('Respuesta del fetch:', response);

      if (!response.ok) {
        throw new Error(
          `HTTP error! status: ${response.status} al intentar cargar datos_web.json`
        );
      }
      const data = await response.json();
      console.log('Datos JSON cargados:', data);

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

      // 1. Cargar Anuncios para el Carrusel
      if (announcementsCarouselContainer && data.anuncios) {
        renderizarCarruselAnuncios(
          data.anuncios,
          carouselSlidesContainer,
          carouselDotsContainer
        );
      } else if (carouselSlidesContainer) {
        carouselSlidesContainer.innerHTML =
          '<p>No hay anuncios para mostrar en el carrusel.</p>';
      }

      // 2. Cargar Tarjetas de Proyectos
      if (projectsGridContainer && data.proyectos) {
        renderizarTarjetasDeProyectos(data.proyectos, projectsGridContainer);
      } else if (projectsGridContainer) {
        projectsGridContainer.innerHTML =
          '<p>No hay proyectos para mostrar.</p>';
      }

      // 3. Cargar Contenido del Footer y FAB
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
      if (carouselSlidesContainer)
        carouselSlidesContainer.innerHTML = `<p>Error al cargar anuncios del carrusel: ${error.message}.</p>`;
      if (projectsGridContainer)
        projectsGridContainer.innerHTML = `<p>Error al cargar proyectos: ${error.message}.</p>`;
      if (footerContactDirectContainer)
        footerContactDirectContainer.innerHTML =
          '<p>Error al cargar contactos.</p>';
      if (footerSocialProfilesContainer)
        footerSocialProfilesContainer.innerHTML =
          '<p>Error al cargar redes.</p>';
      if (fabWhatsapp) fabWhatsapp.href = 'javascript:void(0);';
    }
  }

  function renderizarCarruselAnuncios(
    anuncios,
    slidesContainer,
    dotsContainer
  ) {
    if (!slidesContainer || !dotsContainer) return;

    slidesContainer.innerHTML = '';
    dotsContainer.innerHTML = '';

    anuncios.forEach((anuncio, index) => {
      const slide = document.createElement('div');
      slide.classList.add('carousel-slide');
      if (index === 0) slide.classList.add('active');
      slide.setAttribute('role', 'group');
      slide.setAttribute('aria-roledescription', 'slide');
      slide.setAttribute('aria-label', `${index + 1} de ${anuncios.length}`);

      slide.innerHTML = `
                    <img src="${
                      anuncio.flyerUrl ||
                      'https://placehold.co/960x450/cccccc/333333?text=Anuncio'
                    }" alt="${
        anuncio.altFlyer || anuncio.titulo
      }" loading="lazy" onerror="this.onerror=null;this.src='https://placehold.co/960x450/cccccc/333333?text=Imagen+no+disponible';">
                    <div class="carousel-caption">
                        <h3>${anuncio.titulo}</h3>
                        <p>${
                          anuncio.contenido
                            ? anuncio.contenido.substring(0, 100) +
                              (anuncio.contenido.length > 100 ? '...' : '')
                            : 'Contenido no disponible.'
                        }</p> 
                    </div>
                `;
      slidesContainer.appendChild(slide);

      const dot = document.createElement('button');
      dot.classList.add('carousel-dot');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Ir al anuncio ${index + 1}`);
      dot.dataset.slideTo = index;
      dotsContainer.appendChild(dot);
    });

    // Inicializar la lógica del carrusel DESPUÉS de que los slides y dots se hayan renderizado
    if (anuncios.length > 0) {
      inicializarLogicaCarruselInterna(
        announcementsCarouselContainer,
        slidesContainer,
        dotsContainer
      );
    }
  }

  function inicializarLogicaCarruselInterna(
    carouselContainer,
    slidesContainer,
    dotsContainer
  ) {
    const slides = Array.from(
      slidesContainer.querySelectorAll('.carousel-slide')
    );
    const dots = Array.from(dotsContainer.querySelectorAll('.carousel-dot'));
    const prevButton = carouselContainer.querySelector('.carousel-button.prev');
    const nextButton = carouselContainer.querySelector('.carousel-button.next');

    let currentIndex = 0;
    let slideInterval;
    const slideCount = slides.length;

    if (slideCount <= 0) return;

    let isDragging = false;
    let startPosX = 0;
    let currentTranslate = 0;
    let prevTranslate = 0;
    const swipeThreshold = 50;

    function applyTransition() {
      slidesContainer.style.transition = 'var(--transition-carousel)';
    }
    function removeTransition() {
      slidesContainer.style.transition = 'none';
    }

    function setPositionByIndex() {
      if (slidesContainer && slidesContainer.offsetWidth > 0) {
        currentTranslate = currentIndex * -slidesContainer.offsetWidth;
        prevTranslate = currentTranslate;
        applyTransition();
        slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
      }
    }

    function updateCarouselState() {
      setPositionByIndex();
      slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentIndex);
        slide.setAttribute('aria-hidden', String(index !== currentIndex));
        slide.inert = index !== currentIndex;
      });
      dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentIndex);
        dot.setAttribute('aria-current', String(index === currentIndex));
      });
    }

    function goToSlide(index) {
      currentIndex = (index + slideCount) % slideCount;
      updateCarouselState();
    }
    function nextSlide() {
      goToSlide(currentIndex + 1);
    }
    function prevSlide() {
      goToSlide(currentIndex - 1);
    }

    if (nextButton)
      nextButton.addEventListener('click', () => {
        nextSlide();
        resetInterval();
      });
    if (prevButton)
      prevButton.addEventListener('click', () => {
        prevSlide();
        resetInterval();
      });

    dots.forEach((dot) => {
      dot.addEventListener('click', (e) => {
        goToSlide(parseInt(e.target.dataset.slideTo));
        resetInterval();
      });
    });

    function startInterval() {
      clearInterval(slideInterval);
      slideInterval = setInterval(nextSlide, 6000);
    }
    function resetInterval() {
      clearInterval(slideInterval);
      startInterval();
    }

    slidesContainer.addEventListener('touchstart', touchStart, {
      passive: true,
    });
    slidesContainer.addEventListener('touchmove', touchMove, {
      passive: true,
    });
    slidesContainer.addEventListener('touchend', touchEnd);
    slidesContainer.addEventListener('mousedown', touchStart);
    slidesContainer.addEventListener('mousemove', touchMove);
    slidesContainer.addEventListener('mouseup', touchEnd);
    slidesContainer.addEventListener('mouseleave', touchEnd);

    function touchStart(event) {
      isDragging = true;
      startPosX = getPositionX(event);
      removeTransition();
      carouselContainer.classList.add('grabbing');
      clearInterval(slideInterval);
    }

    function touchMove(event) {
      if (isDragging) {
        const currentPosition = getPositionX(event);
        currentTranslate = prevTranslate + currentPosition - startPosX;
        slidesContainer.style.transform = `translateX(${currentTranslate}px)`;
      }
    }

    function touchEnd() {
      if (!isDragging) return;
      isDragging = false;
      carouselContainer.classList.remove('grabbing');
      const movedBy = currentTranslate - prevTranslate;
      applyTransition();
      if (movedBy < -swipeThreshold && currentIndex < slideCount - 1) {
        currentIndex += 1;
      }
      if (movedBy > swipeThreshold && currentIndex > 0) {
        currentIndex -= 1;
      }
      updateCarouselState();
      resetInterval();
    }

    function getPositionX(event) {
      return event.type.includes('mouse')
        ? event.pageX
        : event.touches[0].clientX;
    }

    updateCarouselState();
    startInterval();

    carouselContainer.addEventListener('mouseenter', () => {
      if (!isDragging) clearInterval(slideInterval);
    });
    carouselContainer.addEventListener('mouseleave', () => {
      if (!isDragging) startInterval();
    });
    carouselContainer.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') {
        prevSlide();
        resetInterval();
      } else if (e.key === 'ArrowRight') {
        nextSlide();
        resetInterval();
      }
    });
    window.addEventListener('resize', () => {
      removeTransition();
      updateHeaderHeightAndPadding();
      setPositionByIndex();
      setTimeout(applyTransition, 50);
    });
  }

  function renderizarTarjetasDeProyectos(proyectos, gridContainer) {
    if (!gridContainer) return;
    gridContainer.innerHTML = '';
    proyectos.forEach((proyecto) => {
      const card = document.createElement('article');
      card.classList.add('project-card-detailed');

      let imgHTML = `<div class="project-img-placeholder"><span>[Imagen no disponible]</span></div>`;
      if (proyecto.portadaUrl) {
        imgHTML = `
                        <div class="project-img-placeholder">
                            <img src="${proyecto.portadaUrl}" alt="${
          proyecto.altPortada || proyecto.titulo
        }" loading="lazy" onerror="this.onerror=null; this.parentElement.innerHTML = '<span>[Imagen no disponible]</span>';">
                        </div>`;
      }

      card.innerHTML = `
                    ${imgHTML}
                    <div class="project-content">
                        <p class="project-category">${
                          proyecto.categoria || 'Categoría'
                        }</p>
                        <h3 class="project-title"><a href="${
                          proyecto.enlacePagina || '#'
                        }">${proyecto.titulo}</a></h3>
                        <p class="project-description-full">
                            ${
                              proyecto.descripcionCompleta ||
                              'Descripción no disponible.'
                            }
                        </p>
                        <a href="${
                          proyecto.enlacePagina || '#'
                        }" class="btn-view-project-page">${
        proyecto.enlaceDetalles || 'Ver detalles'
      } <i class="fas fa-arrow-right"></i></a>
                    </div>
                `;
      gridContainer.appendChild(card);
    });
  }

  function renderizarFooterYFAB(
    redesSociales,
    contactContainer,
    socialContainer,
    fabElement
  ) {
    // Contactos Directos del Footer
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

    // Perfiles Sociales del Footer
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

    // Botón Flotante de WhatsApp (FAB)
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
