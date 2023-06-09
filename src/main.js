
import { header } from './componentes/header'
import { footer } from './componentes/footer'

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import { enrutador } from './componentes/router'
import { supabase } from './bd/supabase'



header.script()
document.querySelector('header').innerHTML = header.template


document.querySelector('footer').innerHTML = footer.template



enrutador.observadorRutas()
//home
window.location = '#/home'



