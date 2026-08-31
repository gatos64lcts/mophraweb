(function() {
    // 1. Inyectar los estilos CSS de la cortina automáticamente al cargar el documento
    const style = document.createElement('style');
    style.innerHTML = `
        .cortina-contenedor {
            position: fixed;
            top: -15vh;
            left: 0;
            width: 100vw;
            height: 115vh;
            background-color: #1a1a1a;
            z-index: 9999999 !important;
            display: flex;
            justify-content: center;
            align-items: center;
            overflow: hidden;
            pointer-events: none;
            transform: translateY(-100%);
        }
        .cortina-contenedor.cerrar {
            pointer-events: auto;
            transform: translateY(0%);
            transition: transform 0.5s cubic-bezier(0.18, 0.89, 0.32, 1.05) !important;
        }
        .cortina-contenedor.abrir {
            transform: translateY(-100%);
            transition: transform 0.7s cubic-bezier(0.6, -0.28, 0.735, 0.045) !important;
        }
        .cortina-imagen {
            width: 100%;
            height: 100%;
            object-fit: cover;
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

    // 2. Inyectar la estructura HTML de la cortina al inicio del body
    document.addEventListener('DOMContentLoaded', () => {
        if (!document.getElementById('cortina-transicion')) {
            const cortinaHTML = `
                <div id="cortina-transicion" class="cortina-contenedor">
                    <img src="https://i.ibb.co/svc7DsmQ/CORTINA-METALICA.webp" alt="Cargando..." class="cortina-imagen">
                </div>
            `;
            document.body.insertAdjacentHTML('afterbegin', cortinaHTML);
        }

        const cortina = document.getElementById('cortina-transicion');
        if (!cortina) return;

        let transitando = false;

        function animarCortina() {
            if (transitando) return;
            transitando = true;
            
            cortina.style.transition = 'none';
            cortina.classList.remove('abrir', 'cerrar');
            cortina.offsetHeight; 

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

        // Detectar cambios de hash o navegación interna
        window.addEventListener('hashchange', animarCortina);

        // Opcional: anticiparse al clic en enlaces internos
        document.addEventListener('click', (e) => {
            const link = e.target.closest('a');
            if (link && link.hash && link.hostname === window.location.hostname) {
                animarCortina();
            }
        });
    });
})();
