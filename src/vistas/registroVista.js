import { User } from '../bd/user'
import { Perfil } from '../bd/perfil'



export default {
    template: `
    <div class="vh-100 d-flex align-items-center justify-content-center" style="padding-top: 100px">
    <div class="col-12 col-md-4">
        <div class="display-4 text-center p-2">Registro</div>
        <form id="form_registro" class="p-3" novalidate>
            <label class="mt-3 form-label text-black fs-5" for="nombre">Nombre: </label>
            <input type="text" class="form-control" value="" placeholder ="Rubén" id="nombre" required />
            <div class="invalid-feedback">El nombre no es correcto</div>
  
            <label class="mt-3 form-label text-black fs-5" for="apellidos">Apellidos: </label>
            <input type="text" class="form-control" value="" placeholder = "Henares Hidalgo" id="apellidos" required />
            <div class="invalid-feedback">Este campo no es correcto</div>
  
            <label class="mt-3 form-label text-black fs-5" for="email">Email</label>
            <input
                id="email1"
                type="email"
                class="form-control"
                value=""
                placeholder = "email@gmail.com"
                required
            />
            <div class="invalid-feedback">El email no es correcto</div>
            <label class="mt-3 form-label text-black fs-5" for="nick">Contraseña: </label>
            <input id="contrasena" type="password" class="form-control" value="" pattern="[A-Za-z]{8,}" placeholder = "Contraseña" required/>
            <div class="invalid-feedback">
                La contraseña debe contener 8 letras o más que deben ser mayusculas y minusculas, no se aceptan signos ni números
            </div>
            <button type="submit" class="mt-5 btn btn-primary w-100">
                Enviar
            </button>
        </form>
    </div>
  </div>
      `,
      script: () => {
        document.querySelector('#form_registro').addEventListener('submit', async function (e) {
          e.preventDefault()
          try {
            const usuario = {
              email: document.querySelector('#email1').value,
              password: document.querySelector('#contrasena').value
            }
            const nuevoUser = await User.create(usuario)
            const perfilData = {
              nombre: document.querySelector('#nombre').value,
              apellidos: document.querySelector('#apellidos').value,
              user_id: nuevoUser.id
            }
            await Perfil.create(perfilData)
            alert('Te registraste correctamente')
            // login
            window.location.href = '/#/login'
          } catch (error) {
            console.log(error)
          }
        })
      }
  }