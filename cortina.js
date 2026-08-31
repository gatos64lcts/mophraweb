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
        body.cortina-bloqueo .content {
            opacity: 0 !important;
            pointer-events: none !important;
            transition: none !important;
        }
    `;
    document.head.appendChild(style);

    // 2. Inyectar HTML de inmediato al cargar el DOM
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

        let transitando = false;

        function animarCortina() {
            if (transitando) return;
            transitando = true;
            
            cortina.style.transition = 'none';
            cortina.classList.remove('abrir', 'cerrar');
            void cortina.offsetHeight; 

            cortina.style.transition = '';
            cortina.classList.add('cerrar');

            setTimeout(() => {
                document.body.classList.add('cortina-bloqueo');
                setTimeout(() => {
                    document.body.classList.remove('cortina-bloqueo');
                    cortina.classList.remove('cerrar');
                    cortina.classList.add('abrir');

                    setTimeout(() => {
                        cortina.classList.remove('abrir');
                        transitando = false;
                    }, 700);
                }, 50);
            }, 500);
        }

        // Detectar cambios de página / hash
        window.addEventListener('hashchange', animarCortina);

        // Detectar clics en enlaces internos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.hash && link.hostname === window.location.hostname) {
                animarCortina();
            }
        });
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', inicializarCortina);
    } else {
        inicializarCortina();
    }
})();
