document.addEventListener("DOMContentLoaded", () => {
    const menuContainer = document.getElementById('mophraGlobalMenu');
    const vectorBtn = document.getElementById('mophraVectorBtn');
    const releasesToggle = document.getElementById('mophraReleasesToggle');
    const releasesSubmenu = document.getElementById('mophraReleasesSubmenu');
    const svgLogo = document.getElementById('mophraSvgLogo');

    // Apertura y cierre del menú principal
    if (vectorBtn && menuContainer) {
        vectorBtn.addEventListener('click', () => {
            menuContainer.classList.toggle('active');
            if (menuContainer.classList.contains('active')) {
                if (svgLogo) svgLogo.style.transform = 'rotate(45deg)';
            } else {
                if (svgLogo) svgLogo.style.transform = 'rotate(0deg)';
                if (releasesSubmenu) releasesSubmenu.classList.remove('open');
            }
        });
    }

    // Desplegable de releases
    if (releasesToggle && releasesSubmenu) {
        releasesToggle.addEventListener('click', (e) => {
            e.stopPropagation();
            releasesSubmenu.classList.toggle('open');
        });
    }
});

// --- SOLUCIÓN PARA LA CORTINA CONGELADA AL USAR "ATRÁS" ---
window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        const menuContainer = document.getElementById('mophraGlobalMenu');
        const svgLogo = document.getElementById('mophraSvgLogo');
        const releasesSubmenu = document.getElementById('mophraReleasesSubmenu');
        
        if (menuContainer) {
            menuContainer.classList.remove('active');
        }
        if (svgLogo) {
            svgLogo.style.transform = 'rotate(0deg)';
        }
        if (releasesSubmenu) {
            releasesSubmenu.classList.remove('open');
        }
    }
});
