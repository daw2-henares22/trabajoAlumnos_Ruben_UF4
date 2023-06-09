import { U as User, P as Perfil, m as menuUsuario, a as menuSuperior } from "./main-0a42993d.js";
const loginVistas = {
  template: `
    <div class="mt-5 d-flex justify-content-center" style="padding-top: 100px">
    <div class="col-12 col-md-4">
        <div class="display-4 text-center p-2">Login</div>
        <form id="login" class="p-3" novalidate>
            <label class="mt-3 form-label text-black fs-5" for="email">Email</label>
            <input type="email" class="form-control" value="" placeholder ="email@gmail.com" id="email2" required />
            <div class="invalid-feedback">Email válido</div>
  
            <label class="mt-3 form-label text-black fs-5" for="nick">Contraseña: </label>
            <input type="password" class="form-control" placeholder ="password" id="password2" value="" required />
            <div class="invalid-feedback">Esta no es una contraseña correcta</div>
  
            <button id="btn_submit" type="submit" class="mt-4 btn btn-primary w-100" >
                Enviar
            </button>
        </form>
    </div>
  </div>
  
    `,
  script: () => {
    const form = document.querySelector("#login");
    form.addEventListener("submit", async (event) => {
      event.preventDefault();
      event.stopPropagation();
      form.classList.add("was-validated");
      if (!form.checkValidity()) {
        console.log("form");
      } else {
        try {
          const userData = {
            email: document.querySelector("#email2").value,
            password: document.querySelector("#password2").value
          };
          const usuarioLogeado = await User.login(userData);
          const divUsuarioLogeado = document.querySelector("#emailUsuarioLogueado");
          const userthisMoment = await User.getUser();
          const perfil = await Perfil.getByUserId(userthisMoment.id);
          console.log(perfil);
          divUsuarioLogeado.innerHTML = usuarioLogeado.email;
          menuUsuario.script(userthisMoment, perfil.rol);
          menuSuperior.script(perfil.rol);
          window.location.href = "/#/home";
        } catch (error) {
        }
      }
    });
  }
};
export {
  loginVistas as default
};
