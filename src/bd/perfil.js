import { supabase } from './supabase.js'

export class Perfil {
  constructor (id = null, created_at = null, nombre = null, apellidos = null, user_id = null, estado = null, rol = null, avatar = null, email = null, bloqueado = null) {
    this.id = id
    this.created_at = created_at
    this.nombre = nombre
    this.apellidos = apellidos
    this.user_id = user_id
    this.estado = estado
    this.rol = rol
    this.avatar = avatar
    this.email = email
    this.bloqueado = bloqueado
  }

  static async getAll () {
    const { data: perfiles, error } = await supabase
      .from('perfiles')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }
    // devuelve array de objetos
    return perfiles.map(({ id, created_at, nombre, apellidos, user_id, estado, rol, avatar, email, bloqueado }) => {
      return new Perfil(id, created_at, nombre, apellidos, user_id, estado, rol, avatar, email, bloqueado)
    })
  }

  static async getById (id) {
    const { data: perfil, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('id', id)
      .single()
    if (error) {
      throw new Error(error.message)
    }
    return new Perfil(perfil.id, perfil.created_at, perfil.nombre, perfil.apellidos, perfil.user_id, perfil.estado, perfil.rol, perfil.avatar, perfil.email, perfil.bloqueado)
  }

  static async getByUserId (id) {
    const { data: perfil, error } = await supabase
      .from('perfiles')
      .select('*')
      .eq('user_id', id)
      .single()
      
    if (error) {
      throw new Error(error.message)
    }
    return new Perfil(perfil.id, perfil.created_at, perfil.nombre, perfil.apellidos, perfil.user_id, perfil.estado, perfil.rol, perfil.avatar, perfil.email, perfil.bloqueado)
  }

  static async create (perfilData) {
    const { error } = await supabase
      .from('perfiles')
      .insert(perfilData)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

   async update () {
    const { error } = await supabase
      .from('perfiles')
      .update({
        nombre: this.nombre,
        apellidos: this.apellidos,
        avatar: this.avatar
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  async block () {
    const { error } = await supabase
      .from('perfiles')
      .update({
        bloqueado: this.bloqueado
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  static async delete (id) {
    const { error } = await supabase
      .from('perfiles')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }


  static async getRol(id){
    let { data: perfiles, error } = await supabase
    .from('perfiles')
    .select('rol')
    .eq('user_id', id)
    return (Perfil.rol)
  }
}