/**
 * @file Script para la página principal (index.html)
 * @description Maneja la interactividad de la página, incluyendo el cambio de tema,
 * navegación móvil, resaltado de enlaces de navegación, acordeón de FAQ,
 * slider de proyectos y actualización del año en el footer.
 */

document.addEventListener("DOMContentLoaded", () => {
  /**
   * ------------------------------------------------------------------------
   * GESTIÓN DEL TEMA (CLARO/OSCURO)
   * ------------------------------------------------------------------------
   * Controla la funcionalidad para cambiar entre el tema claro y oscuro,
   * guardando la preferencia del usuario en localStorage.
   */
  const themeToggleBtn = document.getElementById('themeToggleBtn');
  const currentTheme = localStorage.getItem('theme');

  /**
   * Aplica el tema especificado al body.
   * @param {string} theme - El tema a aplicar ('dark' o 'light').
   */
  function applyTheme(theme) {
    if (theme === 'dark') {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Aplica el tema guardado o el preferido por el sistema al cargar la página
  if (currentTheme) {
    applyTheme(currentTheme);
  } else {
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (prefersDark) {
      applyTheme('dark');
      localStorage.setItem('theme', 'dark'); // Guarda la preferencia del sistema si no hay nada guardado
    }
  }

  // Event listener para el botón de cambio de tema
  if (themeToggleBtn) {
    themeToggleBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark-mode');
      let theme = document.body.classList.contains('dark-mode') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);
    });
  }

  /**
   * ------------------------------------------------------------------------
   * MENÚ DE NAVEGACIÓN MÓVIL Y SUBMENÚS
   * ------------------------------------------------------------------------
   * Controla la visibilidad del menú de navegación en dispositivos móviles
   * y la apertura/cierre de los submenús.
   */
  const navToggleBtn = document.getElementById("navToggleBtn");
  const mainMenuNav = document.getElementById("mainMenuNav");
  const siteHeader = document.querySelector('.site-header');
  let headerHeight = siteHeader ? siteHeader.offsetHeight : 70; // Valor por defecto si el header no se encuentra

  /**
   * Actualiza la altura del header y la variable CSS correspondiente.
   * Esto es útil para que el menú desplegable en móvil no se solape con el contenido.
   */
  function updateHeaderHeightForMenu() {
    if (siteHeader) {
      headerHeight = siteHeader.offsetHeight;
      document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    }
  }
  updateHeaderHeightForMenu(); // Ejecutar al cargar
  window.addEventListener('resize', updateHeaderHeightForMenu); // Y en cada redimensionamiento

  // Lógica para el botón principal del menú móvil
  if (navToggleBtn && mainMenuNav) {
    const navIcon = navToggleBtn.querySelector("i");

    navToggleBtn.addEventListener("click", () => {
      const isExpanded = mainMenuNav.classList.toggle("menu-visible");
      navToggleBtn.setAttribute("aria-expanded", String(isExpanded));
      if (navIcon) {
        navIcon.classList.toggle("fa-bars", !isExpanded);
        navIcon.classList.toggle("fa-times", isExpanded);
      }
      // Si el menú se cierra, también cierra todos los submenús abiertos
      if (!isExpanded) {
        mainMenuNav.querySelectorAll(".has-submenu.open").forEach((openSubmenuLi) => {
          openSubmenuLi.classList.remove("open");
          const openSubmenu = openSubmenuLi.querySelector(".submenu");
          if (openSubmenu) openSubmenu.style.maxHeight = null; // Para animación en móvil
          const openSubmenuLink = openSubmenuLi.querySelector('a[aria-haspopup="true"]');
          if (openSubmenuLink) openSubmenuLink.setAttribute("aria-expanded", "false");
        });
      }
    });
  }

  // Lógica para desplegar submenús
  if (mainMenuNav) {
    mainMenuNav.querySelectorAll("li.has-submenu").forEach((listItem) => {
      const link = listItem.querySelector("a[aria-haspopup='true']");
      const toggleIcon = listItem.querySelector(".submenu-toggle-icon");
      const submenu = listItem.querySelector(".submenu");

      /**
       * Acción para abrir/cerrar un submenú.
       * @param {Event} event - El objeto del evento.
       */
      function toggleAction(event) {
        event.preventDefault(); // Prevenir navegación si es solo para desplegar
        event.stopPropagation(); // Evitar que el evento se propague a elementos padres
        const isOpen = listItem.classList.toggle("open");
        if (link) link.setAttribute("aria-expanded", String(isOpen));

        // Animación de altura para submenús en móvil
        if (window.innerWidth <= 991 && submenu) {
          if (isOpen) {
            submenu.style.maxHeight = submenu.scrollHeight + "px";
          } else {
            submenu.style.maxHeight = null;
            // Cierra submenús hijos si el padre se cierra
            submenu.querySelectorAll('.has-submenu.open').forEach(openChild => {
              openChild.classList.remove('open');
              const childLink = openChild.querySelector('a[aria-haspopup="true"]');
              if (childLink) childLink.setAttribute('aria-expanded', 'false');
              const childSubmenu = openChild.querySelector('.submenu');
              if (childSubmenu) childSubmenu.style.maxHeight = null;
            });
          }
        }
      }

      // Event listener para el icono de despliegue
      if (toggleIcon && submenu) {
        toggleIcon.addEventListener("click", toggleAction);
      }

      // Event listener para el enlace padre (si también debe desplegar)
      if (link && submenu) {
        link.addEventListener('click', (event) => {
          // No hacer nada si se hizo clic directamente en el icono (ya tiene su propio listener)
          if (event.target.closest('.submenu-toggle-icon')) {
            return;
          }
          // En móvil, o si el enlace es solo un placeholder (#), el enlace principal también despliega.
          if (window.innerWidth <= 991 || !link.getAttribute('href') || link.getAttribute('href') === '#') {
            toggleAction(event);
          }
          // Si es un enlace real y estamos en desktop, permite la navegación normal.
        });
      }
    });

    // Cerrar menú móvil al hacer clic en un enlace de navegación directo
    mainMenuNav.querySelectorAll("ul li a").forEach((link) => {
      link.addEventListener("click", (event) => {
        const isSubmenuToggleIcon = event.target.closest(".submenu-toggle-icon");
        // Verifica si el enlace es un padre que solo despliega en móvil o es un placeholder
        const isParentLinkThatToggles = link.matches('a[aria-haspopup="true"]') &&
                                      (window.innerWidth <= 991 || !link.getAttribute('href') || link.getAttribute('href') === '#');

        if (!isSubmenuToggleIcon && !isParentLinkThatToggles && mainMenuNav.classList.contains("menu-visible")) {
          // Solo cierra si es un enlace real que navega
          if (link.getAttribute("href") && link.getAttribute("href") !== "#") {
            mainMenuNav.classList.remove("menu-visible");
            if (navToggleBtn) navToggleBtn.setAttribute("aria-expanded", "false");
            const navIcon = navToggleBtn ? navToggleBtn.querySelector("i") : null;
            if (navIcon) {
              navIcon.classList.remove("fa-times");
              navIcon.classList.add("fa-bars");
            }
            // Cierra todos los submenús abiertos
            mainMenuNav.querySelectorAll('.has-submenu.open').forEach(openSubmenuLi => {
              openSubmenuLi.classList.remove('open');
              const parentLink = openSubmenuLi.querySelector('a[aria-haspopup="true"]');
              if (parentLink) parentLink.setAttribute('aria-expanded', 'false');
              const submenu = openSubmenuLi.querySelector('.submenu');
              if (submenu && window.innerWidth <= 991) submenu.style.maxHeight = null;
            });
          }
        }
      });
    });
  }

  /**
   * ------------------------------------------------------------------------
   * RESALTADO DE ENLACES DE NAVEGACIÓN AL HACER SCROLL (NAVHIGHLIGHTER)
   * ------------------------------------------------------------------------
   * Actualiza la clase 'current-page' en los enlaces de navegación
   * según la sección visible en la pantalla.
   */
  const sections = document.querySelectorAll("main section[id]");
  const allNavLinks = mainMenuNav ? mainMenuNav.querySelectorAll("nav ul li a") : [];

  function navHighlighter() {
    if (!mainMenuNav || allNavLinks.length === 0 || sections.length === 0) return;

    let scrollY = window.pageYOffset;
    let currentActiveSectionId = null;
    const offset = headerHeight + 60; // Considera la altura del header y un margen adicional

    sections.forEach((current) => {
      if (!current) return; // Seguridad
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - offset;
      let sectionId = current.getAttribute("id");

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        currentActiveSectionId = sectionId;
      }
    });

    let anActiveLinkIsSetByScroll = false;
    allNavLinks.forEach((navLink) => {
      navLink.classList.remove("current-page"); // Limpiar todos primero
      const href = navLink.getAttribute("href");
      if (currentActiveSectionId && href && href.includes("#" + currentActiveSectionId)) {
        navLink.classList.add("current-page");
        anActiveLinkIsSetByScroll = true;

        // Si el enlace activo está en un submenú, también marca al padre
        let parentLi = navLink.closest('ul.submenu')?.parentElement.closest('li.has-submenu');
        if (parentLi) {
          const parentAnchor = parentLi.querySelector('a[aria-haspopup="true"]');
          if (parentAnchor) parentAnchor.classList.add('current-page');
        }
      }
    });

    // Si ningún enlace se activó por scroll (ej. estamos al inicio o final sin sección coincidente)
    // o si la página no tiene secciones para scrollspy, usa la URL actual.
    if (!anActiveLinkIsSetByScroll) {
      const homeLink = mainMenuNav.querySelector("a[href='index.html'], a[href='./'], a[href='/']"); // Más flexible para el enlace de inicio
      const currentPagePath = window.location.pathname.split('/').pop() || 'index.html';
      const currentHash = window.location.hash;

      // Caso especial para la página de inicio sin hash
      if (homeLink && (currentPagePath === 'index.html' || currentPagePath === '') && (!currentHash || currentHash === '#')) {
           allNavLinks.forEach(nl => nl.classList.remove("current-page")); // Asegurar que solo el de inicio esté activo
           homeLink.classList.add("current-page");
      } else {
        // Para otras páginas o hashes, busca coincidencia exacta
        allNavLinks.forEach(navLink => {
          const href = navLink.getAttribute("href");
          if (href) {
            const linkUrl = new URL(href, window.location.origin); // Normalizar URL
            const linkPath = linkUrl.pathname.split('/').pop() || 'index.html';
            const linkHash = linkUrl.hash;

            if (linkPath === currentPagePath && linkHash === currentHash) {
                navLink.classList.add("current-page");
                 // Marcar padres si es un submenú
                let parentLi = navLink.closest('ul.submenu')?.parentElement.closest('li.has-submenu');
                if (parentLi) {
                    const parentAnchor = parentLi.querySelector('a[aria-haspopup="true"]');
                    if (parentAnchor) parentAnchor.classList.add('current-page');
                }
            }
          }
        });
      }
    }
  }

  if (sections.length > 0 && allNavLinks.length > 0) {
    window.addEventListener("scroll", navHighlighter);
    navHighlighter(); // Ejecutar al cargar para el estado inicial
  } else if (mainMenuNav) { // Fallback si no hay secciones para scrollspy
    navHighlighter(); // Llama para que se base en la URL
  }


  /**
   * ------------------------------------------------------------------------
   * ACORDEÓN DE PREGUNTAS FRECUENTES (FAQ)
   * ------------------------------------------------------------------------
   * Controla la expansión y contracción de los elementos del acordeón.
   */
  const faqItems = document.querySelectorAll(".faq-item");
  faqItems.forEach((item) => {
    const question = item.querySelector(".faq-question");
    const answer = item.querySelector(".faq-answer");

    if (question && answer) {
      question.addEventListener("click", () => {
        item.classList.toggle("active");
        const isActive = item.classList.contains("active");
        question.setAttribute("aria-expanded", String(isActive));

        if (isActive) {
          answer.style.maxHeight = answer.scrollHeight + 20 + "px"; // +20 para un pequeño buffer
        } else {
          answer.style.maxHeight = "0";
        }
      });
      // Accesibilidad: permitir abrir/cerrar con Enter o Espacio
      question.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          question.click();
        }
      });
    }
  });

  /**
   * ------------------------------------------------------------------------
   * SLIDER DE PROYECTOS
   * ------------------------------------------------------------------------
   * Maneja la navegación y el estado de los botones del slider de proyectos.
   */
  const projectListContainer = document.getElementById("projectListContainer");
  const prevBtn = document.querySelector("#proyectos-destacados .prev-btn");
  const nextBtn = document.querySelector("#proyectos-destacados .next-btn");

  if (projectListContainer && prevBtn && nextBtn) {
    /**
     * Calcula la cantidad de scroll basada en el ancho de la primera tarjeta y el gap.
     * @returns {number} La cantidad de píxeles a desplazar.
     */
    const getScrollAmount = () => {
      const firstCard = projectListContainer.querySelector(".project-card");
      if (firstCard) {
        const cardStyle = window.getComputedStyle(firstCard);
        const cardWidth = firstCard.offsetWidth;
        const containerStyle = window.getComputedStyle(projectListContainer);
        let gapValue = parseFloat(containerStyle.gap);

        // Fallback si 'gap' no es un número (ej. no soportado o no definido como pixel)
        if (isNaN(gapValue)) {
          gapValue = parseFloat(cardStyle.marginRight) || 0; // Intenta con marginRight
          if (isNaN(gapValue)) gapValue = 24; // Valor por defecto si todo falla
        }
        return cardWidth + gapValue;
      }
      return 320; // Valor por defecto si no se encuentra tarjeta
    };

    /**
     * Actualiza el estado (habilitado/deshabilitado) de los botones de navegación
     * y centra los elementos si el contenido es menor que el contenedor.
     */
    const updateButtonStatesAndCentering = () => {
      if (!projectListContainer || !prevBtn || !nextBtn) return;
      const scrollLeft = projectListContainer.scrollLeft;
      const scrollWidth = projectListContainer.scrollWidth;
      const clientWidth = projectListContainer.clientWidth;
      const maxScrollLeft = scrollWidth - clientWidth;
      const tolerance = 5; // Pequeña tolerancia para evitar problemas de precisión de float

      prevBtn.disabled = scrollLeft <= tolerance;
      nextBtn.disabled = scrollLeft >= maxScrollLeft - tolerance;

      // Centrar si el contenido total es menor o igual al ancho visible
      if (scrollWidth <= clientWidth + tolerance) {
        projectListContainer.classList.add("center-flex-items");
      } else {
        projectListContainer.classList.remove("center-flex-items");
      }
    };

    prevBtn.addEventListener("click", () => {
      const currentScroll = projectListContainer.scrollLeft;
      const scrollAmount = getScrollAmount();
      projectListContainer.scrollTo({
        left: currentScroll - scrollAmount,
        behavior: "smooth",
      });
    });

    nextBtn.addEventListener("click", () => {
      const currentScroll = projectListContainer.scrollLeft;
      const scrollAmount = getScrollAmount();
      projectListContainer.scrollTo({
        left: currentScroll + scrollAmount,
        behavior: "smooth",
      });
    });

    projectListContainer.addEventListener("scroll", updateButtonStatesAndCentering);
    window.addEventListener("resize", updateButtonStatesAndCentering);

    // Ejecutar después de un breve retraso para asegurar que el layout esté completo
    setTimeout(() => {
      updateButtonStatesAndCentering();
    }, 100);
  }

  /**
   * ------------------------------------------------------------------------
   * ACTUALIZACIÓN DEL AÑO EN EL FOOTER
   * ------------------------------------------------------------------------
   * Inserta dinámicamente el año actual en el elemento del footer.
   */
  const currentYearElement = document.getElementById("currentYear");
  if (currentYearElement) {
    currentYearElement.textContent = new Date().getFullYear();
  }
});
