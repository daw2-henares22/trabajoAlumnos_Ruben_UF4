import { supabase } from './supabase.js'

export class User {
  constructor (id = null, email = null, password = null, rol=null) {
    this.id = id
    this.email = email
    this.password = password
    this.rol = rol
  }

  static async create (userData) {
    const { data, error } = await supabase.auth.signUp(userData)
    if (error) {
      throw new Error(error.message)
    }
    return new User(data.user.id, data.user.email)
  }

  static async login (userData) {
    const { data, error } = await supabase.auth.signInWithPassword(userData)
    if (error) {
      throw new Error(error.message)
    }
    return new User(data.user.id, data.user.email, data.user.rol)
  }

  static async logout () {
    let { error } = await supabase.auth.signOut()
    alert("Cerraste la sesión!!!")
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  static async getUser () {
    const { data: { user } } = await supabase.auth.getUser()
    if (user) return new User(user.id, user.email)
  }

  async update (nuevosDatos) {
    const { data, error } = await supabase.auth.updateUser({
      email: this.email,
      password: this.password
    })

    if (error) {
      throw new Error(error.message)
    }
  }
}