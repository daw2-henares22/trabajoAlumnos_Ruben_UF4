import { formEditarUsuario } from './formEditarUsuario'
import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'
import { menuSuperior } from './menuSuperior'
import { menuUsuario } from './menuUsuario'
export const header = {
  template: `
<nav class="navbar navbar-expand-sm bg-dark fixed-top">
  <div class="container-fluid">
    <a class="navbar-brand d-flex align-items-center" href="#/home">
      <p class="text-white mt-3">Vanilla Games</p>
    </a>
    
    <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
    </button>
    ${menuSuperior.template}
    ${menuUsuario.template}
  </div>
</nav>


${formEditarUsuario.template}
  `,
  script: async () => {
    
    try {
      const usuarioLogueado = await User.getUser()
   
      const perfilLogueado = await Perfil.getByUserId(usuarioLogueado.id)
      if (perfilLogueado.rol != "anonimo") {
        
        const rol = perfilLogueado.rol
      
        menuSuperior.script(perfilLogueado.rol)
        menuUsuario.script(usuarioLogueado, rol)
    
        rol = "anonimo"
       
        menuSuperior.script(perfilLogueado.rol)
        menuUsuario.script(usuarioLogueado , rol)
      }
    } catch (error) {
    }
  }
}