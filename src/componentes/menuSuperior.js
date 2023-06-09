

export const menuSuperior = {
  template: `
  <div class="collapse navbar-collapse" id="navbarNavDropdown">
      <ul id="menuSuperior" class="navbar-nav">
        <li class="nav-item">
        <a class="nav-link text-white " href="#/proyectos">Proyectos</a>
        </li>
      </ul>
    </div>
  `,
  script: (rolUsuario) => {
    const items = {
      anonimo: `
      <li class="nav-item">
        <a class="nav-link text-white" href="#/proyectos">Proyectos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#/recursos">Recursos</a>
      </li>
      `,
      registrado: `
      <li class="nav-item">
        <a class="nav-link text-white" href="#/proyectos">Proyectos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#/recursos">Recursos</a>
      </li>
      <li><hr /></li>
      `,
      alumno: `
      <li class="nav-item">
        <a class="nav-link text-white" href="#/proyectos">Proyectos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#/recursos">Recursos</a>
      </li>
      <li><hr /></li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#/adminUsuarios">Admin</a>
      </li>
      `,
      profesor: `
      <li class="nav-item">
        <a class="nav-link text-white" href="#/proyectos">Proyectos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#/recursos">Recursos</a>
      </li>
      <li><hr /></li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#/adminUsuarios">Admin</a>
      </li>
      `,
      admin: `
      <li class="nav-item">
        <a class="nav-link text-white" href="#/proyectos">Proyectos</a>
      </li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#/recursos">Recursos</a>
      </li>
      <li><hr /></li>
      <li class="nav-item">
        <a class="nav-link text-white" href="#/adminUsuarios">Admin</a>
      </li>
      `
    }
    if (rolUsuario !== 'anonimo') {
      const rol = rolUsuario
      
      document.querySelector('#menuSuperior').innerHTML = items[rol]
    } else {
      const rol = rolUsuario
      
      document.querySelector('#menuSuperior').innerHTML = items[rol]
    }
  }
}

