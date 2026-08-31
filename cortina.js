(function() {
    console.log("Script de cortina cargado correctamente.");

    // 1. Inyectar Estilos
    const style = document.createElement('style');
    style.innerHTML = `
        .cortina-contenedor {
            position: fixed !important;
            top: -15vh !important;
            left: 0 !important;
            width: 100vw !important;
            height: 115vh !important;
            background-color: #1a1a1a !important;
            z-index: 99999999 !important;
            display: flex !important;
            justify-content: center !important;
            align-items: center !important;
            overflow: hidden !important;
            pointer-events: none !important;
            transform: translateY(-100%) !important;
        }
        .cortina-contenedor.cerrar {
            pointer-events: auto !important;
            transform: translateY(0%) !important;
            transition: transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.05) !important;
        }
        .cortina-contenedor.abrir {
            transform: translateY(-100%) !important;
            transition: transform 0.7s cubic-bezier(0.6, -0.28, 0.735, 0.045) !important;
        }
        .cortina-imagen {
            width: 100% !important;
            height: 100% !important;
            object-fit: cover !important;
        }
        body.cortina-bloqueo #main > section,
        body.cortina-bloqueo main,
        body.cortina-bloqueo .content,
        body.cortina-bloqueo .mophra-tw-container,
        body.cortina-bloqueo #mophra-releases-section {
            opacity: 0 !important;
            pointer-events: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    function inicializarCortina() {
        if (!document.getElementById('cortina-transicion')) {
            const div = document.createElement('div');
            div.id = 'cortina-transicion';
            div.className = 'cortina-contenedor';
            div.innerHTML = `<img src="https://i.ibb.co/svc7DsmQ/CORTINA-METALICA.webp" alt="Cargando..." class="cortina-imagen">`;
            document.body.prepend(div);
        }

        const cortina = document.getElementById('cortina-transicion');
        if (!cortina) return;

        // 2. EFECTO DE APERTURA AL CARGAR LA NUEVA PÁGINA
        // Fuerza a que la cortina empiece abajo y suba al entrar a cualquier página nueva
        cortina.style.transition = 'none';
        cortina.classList.add('cerrar');
        cortina.offsetHeight; // Reflow
        
        setTimeout(() => {
            cortina.style.transition = '';
            cortina.classList.remove('cerrar');
            cortina.classList.add('abrir');
            setTimeout(() => {
                cortina.classList.remove('abrir');
            }, 700);
        }, 50);

        // 3. CAPTURAR CLICS EN ENLACES INTERNOS (Para bajar antes de cambiar de página)
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.href) {
                const destino = link.href;
                const esMismoDominio = destino.startsWith(window.location.origin);
                const esAnclaExterna = link.getAttribute('href').startsWith('#');

                if (esMismoDominio && !esAnclaExterna && link.target !== '_blank') {
                    e.preventDefault(); // Detener el salto inmediato
                    
                    cortina.style.transition = '';
                    cortina.classList.remove('abrir');
                    cortina.classList.add('cerrar'); // Baja la cortina

                    // Esperar a que termine de bajar (500ms) y luego cambiar de página
                    setTimeout(() => {
                        window.location.href = destino;
                    }, 500);
                }
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarCortina);
    } else {
        inicializarCortina();
    }
})();
