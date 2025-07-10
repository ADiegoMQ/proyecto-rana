document.addEventListener('DOMContentLoaded', () => {
    const mainHeader = document.getElementById('mainHeader');
    const isIndexPage = window.location.pathname.endsWith('/') || window.location.pathname.endsWith('/index.html');

    if (mainHeader) {
        // Para index.html, el header cambia con el scroll
        if (isIndexPage) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > 60) {
                    mainHeader.classList.add('scrolled');
                } else {
                    mainHeader.classList.remove('scrolled');
                }
            });
            // Asegurarse de que el estado inicial sea correcto al cargar la página
            if (window.scrollY > 60) {
                mainHeader.classList.add('scrolled');
            } else {
                mainHeader.classList.remove('scrolled');
            }
        } else {
            // Para otras páginas (equipo, recursos, preguntas), el header SIEMPRE es oscuro
            mainHeader.classList.add('scrolled'); // Asegura que siempre esté oscuro
            // La clase animate__fadeInDown ya está en el HTML, Intersection Observer lo manejará
            // para mostrarlo si tiene visibility: hidden
        }
    }

    // Código de scroll suave para enlaces con # (mantener)
    document.querySelectorAll('.navbar-nav a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Solo para enlaces internos de la misma página (ej. index.html#contact)
            if (this.getAttribute('href').startsWith('#') && (window.location.pathname.endsWith('index.html') || window.location.pathname.endsWith('/'))) {
                e.preventDefault();
                const targetId = this.getAttribute('href');
                const targetElement = document.querySelector(targetId);
                if (targetElement) {
                    const headerOffset = document.getElementById('mainHeader').offsetHeight;
                    const elementPosition = targetElement.getBoundingClientRect().top + window.pageYOffset;
                    const offsetPosition = elementPosition - headerOffset - 10;
                    window.scrollTo({
                        top: offsetPosition,
                        behavior: 'smooth'
                    });
                }
                const navbarCollapse = document.getElementById('navbarNav');
                const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
                if (bsCollapse && navbarCollapse.classList.contains('show')) {
                    bsCollapse.hide();
                }
            } else if (this.getAttribute('href').startsWith('#') && !isIndexPage) {
                // Si es un enlace # pero no estamos en la página de inicio, redirige a index.html#seccion
                e.preventDefault();
                const targetId = this.getAttribute('href');
                window.location.href = `index.html${targetId}`;
            }
        });
    });

    // Código para animaciones con Intersection Observer (¡AJUSTADO!)

    // Seleccionar todos los elementos con animate__animated
    const animateElements = document.querySelectorAll('.animate__animated');

    // Configurar Intersection Observer
    const animateOnScroll = new IntersectionObserver(function(entries, observer) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.visibility = 'visible';
                entry.target.classList.add('animate__active'); // Agrega esta clase para activar la animación
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1, // Elemento visible un 10%
        rootMargin: "0px 0px -50px 0px" // Inicia un poco antes de que llegue al final de la vista
    });

    // Observar todos los elementos con animate__animated (que tienen visibility: hidden por defecto)
    animateElements.forEach(element => {
        // Excluir elementos que ya deberían estar visibles por diseño (ej. el header principal)
        // El header ya tiene animate__fadeInDown directamente en el HTML y no necesita ser ocultado inicialmente por JS.
        // Los banners de página interna (faq-header, team-page-header, resources-banner)
        // se manejan para aparecer inmediatamente en el CSS con su padding-top.
        // Aquí solo queremos observar los elementos que realmente deben aparecer al hacer scroll.
        if (
            !element.classList.contains('main-header') && // Excluye el header principal
            !element.classList.contains('faq-header') && // Excluye el banner de FAQ
            !element.classList.contains('team-page-header') && // Excluye el banner de Equipo
            !element.classList.contains('resources-banner') // Excluye el banner de Recursos
        ) {
            animateOnScroll.observe(element);
        } else {
             // Para los banners de página interna y el header, asegúrate de que estén visibles al cargar
             element.style.visibility = 'visible';
             element.classList.add('animate__active');
        }
    });

    // Código para parallax del hero (mantener, solo se aplica a index.html)
    const heroBgParallax = document.querySelector('.hero-bg-parallax');
    if (heroBgParallax) {
        window.addEventListener('scroll', () => {
            const scrollY = window.pageYOffset;
            heroBgParallax.style.transform = `translateY(${scrollY * 0.3}px)`;
        });
    }
});