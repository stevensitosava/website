document.addEventListener('DOMContentLoaded', () => {
    const hamburgerBtn = document.getElementById('hamburger-btn');
    const navMenu = document.getElementById('nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    if (!hamburgerBtn || !navMenu) {
        return;
    }

    hamburgerBtn.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        hamburgerBtn.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (navMenu.classList.contains('active')) {
                navMenu.classList.remove('active');
                hamburgerBtn.classList.remove('active');
            }
        });
    });
});