document.addEventListener('DOMContentLoaded', () => {
    // --- SELECCIÓN DE ELEMENTOS DEL DOM ---
    const header = document.querySelector('.header');
    const sections = document.querySelectorAll('.section');
    const parallaxElements = document.querySelectorAll('.parallax-element');
    const themeToggle = document.getElementById('theme-toggle');
    const heroSection = document.getElementById('inicio');
    const blob = document.querySelector('.hero-background-blob');

    const homeLinks = document.querySelectorAll('a[href="#inicio"]');
    homeLinks.forEach(link => {
        link.addEventListener('click', (event) => {
            event.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
            if (history.pushState) {
                history.pushState(null, null, window.location.pathname + window.location.search);
            }
        });
    });
    
    // Elementos a animar letra por letra
    const animatedLines = document.querySelectorAll('.animated-line');

    // Comprobación inicial para evitar errores
    if (!header || !themeToggle || !blob) {
        console.error("Faltan elementos críticos para la animación o el tema en el HTML.");
        return; // Detiene la ejecución si falta algo crítico
    }

    // --- LÓGICA DEL BLOB INTERACTIVO ---
    heroSection.addEventListener('pointermove', (e) => {
        const { clientX, clientY } = e;
        window.requestAnimationFrame(() => {
            blob.style.setProperty('--mouse-x', `${clientX}px`);
            blob.style.setProperty('--mouse-y', `${clientY}px`);
        });
    });

    // --- LÓGICA DE MODO OSCURO/CLARO ---
    const applyTheme = (theme) => {
        document.body.classList.toggle('dark-mode', theme === 'dark');
    };
    themeToggle.addEventListener('click', () => {
        const newTheme = document.body.classList.contains('dark-mode') ? 'light' : 'dark';
        localStorage.setItem('theme', newTheme);
        applyTheme(newTheme);
    });
    const savedTheme = localStorage.getItem('theme') || 'dark';
    applyTheme(savedTheme);


    // --- LÓGICA PARA ANIMACIÓN DE TÍTULO EN MÚLTIPLES LÍNEAS ---
    animatedLines.forEach((line, lineIndex) => {
        const text = line.textContent;
        line.textContent = '';
        
        let accumulatedDelay = 0;
        if (lineIndex > 0) {
            const previousLine = animatedLines[lineIndex - 1];
            accumulatedDelay = (previousLine.textContent.length * 0.05) + 0.5;
        }

        text.split('').forEach((char, charIndex) => {
            const span = document.createElement('span');
            span.textContent = char === ' ' ? '\u00A0' : char;
            
            const delay = accumulatedDelay + (charIndex * 0.05);
            span.style.animationDelay = `${delay}s`;
            line.appendChild(span);
        });
    });


    // --- LÓGICA DE SCROLL (ANIMACIÓN DE SECCIONES + CABECERA) ---
    const animateOnScroll = () => {
        const scrollY = window.scrollY;
        header.classList.toggle('scrolled', scrollY > 50);

        const viewportHeight = window.innerHeight;
        sections.forEach(section => {
            const sectionRect = section.getBoundingClientRect();
            if (sectionRect.bottom < 0 || sectionRect.top > viewportHeight) {
                return;
            }
            const sectionCenterY = sectionRect.top + sectionRect.height / 2;
            const distanceFromCenter = Math.abs(viewportHeight / 2 - sectionCenterY);
            const showThreshold = viewportHeight * 1.2;
            let opacity = Math.max(0, 1 - (distanceFromCenter / showThreshold));
            section.style.opacity = opacity;
        });
        
        parallaxElements.forEach(el => {
            if (el.id === 'p-element-1') el.style.transform = `translateY(${scrollY * -0.1}px)`;
            if (el.id === 'p-element-2') el.style.transform = `translateY(${scrollY * 0.05}px)`;
        });
    };

    // --- OPTIMIZACIÓN DEL RENDIMIENTO DEL SCROLL ---
    let ticking = false;
    document.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                animateOnScroll();
                ticking = false;
            });
            ticking = true;
        }
    });

    animateOnScroll();
});

