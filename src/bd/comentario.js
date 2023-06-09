import { supabase } from './supabase.js'

export class Comentario {
  constructor (id = null, create_at = null, comentario = null, proyecto_id = null, user_id = null) {
    this.id = id
    this.create_at = create_at
    this.comentario = comentario
    this.proyecto_id = proyecto_id
    this.user_id = user_id
  }

  static async getAll () {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')

    if (error) {
      throw new Error(error.message)
    }

    return comentarios.map(({ id, comentario, proyecto_id, user_id }) => {
      return new Comentario(id, comentario, proyecto_id, user_id)
    })
  }

  static async getAllByUserId (userId) {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('user_id', userId)

    if (error) {
      throw new Error(error.message)
    }

    return comentarios.map(({ id, create_at, comentario, proyecto_id, user_id }) => {
      return new Comentario(id, comentario, proyecto_id, user_id)
    })
  }

  static async getAllByProjectId (proyectoId) {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('proyecto_id', proyectoId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return comentarios.map(({ id, create_at, comentario, proyecto_id, user_id }) => {
      return new Comentario(id, create_at, comentario, proyecto_id, user_id)
    })
  }

  static async getAllById (proyectoId) {
    const { data: comentarios, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('proyecto_id', proyectoId)
      .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return comentarios.map(({ id, create_at, comentario, proyecto_id, user_id }) => {
      return new Comentario(id, create_at, comentario, proyecto_id, user_id)
    })
  }

  static async getById (id) {
    const { data: comentario, error } = await supabase
      .from('comentarios')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Comentario(comentario.id, comentario.create_at, comentario.comentario, comentario.proyecto_id, comentario.user_id)
  }

  static async create (comentarioData) {
    const { error } = await supabase
      .from('comentarios')
      .insert(comentarioData)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  async update () {
    const { error } = await supabase
      .from('comentarios')
      .update({
        nombre: this.comentario,
        proyecto_id: this.proyecto_id,
        user_id: this.user_id
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
      .from('comentarios')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}