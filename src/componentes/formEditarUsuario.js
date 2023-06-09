
import { Perfil } from "../bd/perfil";
import { User } from "../bd/user";

export const formEditarUsuario = {
    template: `
  <div class="modal fade" id="editar">
  <div class="modal-dialog" role="document" >
      <div class="modal-content">
      <div class="modal-header">
          <h5 class="modal-title">Editar usuario</h5>
          <button
          type="button"
          class="btn-close"
          data-bs-dismiss="modal"
          aria-label="Close"
          >
          <span aria-hidden="true"></span>
          </button>
      </div>
      <form class="p-3" id="formEditarUsuario">
        <div class="modal-body" >
          
          <label class="mt-3 form-label" for="nick">Nombre: </label>
          <input id="nombre" type="text" class="form-control" value="" />
  
          <label class="mt-3 form-label" for="apellidos">Apellidos: </label>
          <input id="apellidos" type="text" class="form-control" value="" />
  
          <label class="mt-3 form-label" for="email">Email</label>
          <input
              id="email"
              type="email"
              class="form-control"
              value="email@gmail.com"
          />
  
          <label class="mt-3 form-label" for="contraseña">Contraseña: </label>
          <input id="contraseña" type="password" class="form-control" value="123456" />
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary" id="guardarCambios">
          Guardar cambios
          </button>
          <button
          type="button"
          class="btn btn-secondary"
          data-bs-dismiss="modal"
          >
          Cerrar
          </button>
        </div>
      </form>
    </div>
  </div>
  </div>
    `,
    script: async () => {
      const formulario = document.querySelector('#formEditarUsuario')
      const usuarioLogueado = await User.getUser()
      console.log(usuarioLogueado);
      
      if (usuarioLogueado) {
        const userId = usuarioLogueado.id
        console.log(usuarioLogueado)
        var usuario = User.getUser(userId)

        var email = usuarioLogueado.email
        
        
        const datosUsuario = await Perfil.getByUserId(userId)
        console.log(datosUsuario);
        formulario.nombre.value = datosUsuario.nombre
        formulario.apellidos.value = datosUsuario.apellidos
        formulario.email.value = email
        document.querySelector('#guardarCambios').addEventListener("click", (e)=>{
          e.preventDefault()
          datosUsuario.nombre = formulario.nombre.value
          datosUsuario.apellidos = formulario.apellidos.value
          console.log(datosUsuario);
          datosUsuario.update()
        })
      }   
}
}