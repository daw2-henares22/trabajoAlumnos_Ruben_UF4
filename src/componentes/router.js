export const enrutador = {

    rutas: {
      home: import('../vistas/homeVista.js'),
      // Users
      adminUsuarios: import('../vistas/admin/adminVista.js'),
      registro: import('../vistas/registroVista.js'),
      login: import('../vistas/loginVistas.js'),
      // Proyectos
      proyectos: import('../vistas/proyectos/proyectosVista.js'),
      nuevoProyecto: import('../vistas/proyectos/nuevoProyectoVista.js'),
      editarProyecto: import('../vistas/proyectos/editarProyectoVista.js'),
      detalleProyecto: import('../vistas/proyectos/detalleProyectoVista.js'),
    },

    router: async () => {
      const pathCompleto = window.location.hash
      const path = pathCompleto.split('/')[1]
      const parametro = pathCompleto.split('/')[2]
  
      const componenteVista = await enrutador.rutas[path]
      if (componenteVista) {
        try {
          const vista = await componenteVista.default
          document.querySelector('main').innerHTML = vista.template
          vista.script(parametro)
        } catch (error) {
          console.log(error)
        }
      }
    },
  
    // Capturamos los eventos
    observadorRutas: () => {
      document.body.addEventListener('click', event => {
        // Evitamos que se cargue la página
  
        const link = event.target
        if (link.tagName === 'A') {
          event.preventDefault()
          // Obtenemos la ruta del enlace sin el .html
          const href = link.getAttribute('href')
          // Añadimos la nueva ruta al historial
  
          // (El método pushState() permite agregar un nuevo estado a la pila del historial del navegador. Esto significa que una nueva entrada de historial se agrega a la pila y la URL del navegador se actualiza sin recargar la página.)
          window.history.pushState({ path: href }, '', href)
          // y ejecutamos el router de nuevo para que detecte los cambios con el evento popstate
          enrutador.router()
        }
      })
  
      // Detectamos cuando alguien navega por el historial con los botones avanzar y retroceder del navegador.
      window.addEventListener('popstate', (e) => {
        enrutador.router()
      })
    }
  }