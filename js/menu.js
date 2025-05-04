document.addEventListener('DOMContentLoaded', () => {
    const menuButton = document.querySelector('.menu-toggle');
    const mainNav = document.querySelector('.main-nav');

    menuButton.addEventListener('click', () => {
        mainNav.classList.toggle('active');
        menuButton.classList.toggle('active');
    });

    // Fechar menu ao clicar em um link
    document.querySelectorAll('.main-nav a').forEach(link => {
        link.addEventListener('click', () => {
            mainNav.classList.remove('active');
            menuButton.classList.remove('active');
        });
    });

    // Fechar menu ao redimensionar a tela para desktop
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            mainNav.classList.remove('active');
            menuButton.classList.remove('active');
        }
    });
}); 