import { supabase } from './supabase.js'

class Proyecto {
  constructor (id = null, nombre = null, descripcion = null, user_id = null, nota = null, enlace = null, activo = null, enunciado_id = null) {
    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.user_id = user_id
    this.nota = nota
    this.enlace = enlace
    this.activo = activo
    this.enunciado_id = enunciado_id
  }

  static async getAll () {
    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }

    return proyectos.map(({ id, nombre, descripcion, user_id, nota, enlace, activo, enunciado_id }) => {
      return new Proyecto(id, nombre, descripcion, user_id, nota, enlace, activo, enunciado_id)
    })
  }

  static async getAllByUserId (user_id) {
    const { data: proyectos, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('user_id', user_id)
      // .order('created_at', { ascending: false })

    if (error) {
      throw new Error(error.message)
    }

    return proyectos.map(({ id, nombre, descripcion, user_id, nota, enlace, activo, enunciado_id }) => {
      return new Proyecto(id, nombre, descripcion, user_id, nota, enlace, activo, enunciado_id)
    })
  }

  static async getById (id) {
    const { data: proyecto, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Proyecto(proyecto.id, proyecto.nombre, proyecto.descripcion, proyecto.user_id, proyecto.nota, proyecto.enlace, proyecto.activo, proyecto.enunciado_id)
  }

  static async getByProjectId (id) {
    const { data: proyecto, error } = await supabase
      .from('proyectos')
      .select('*')
      .eq('proyecto_id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Proyecto(proyecto.id, proyecto.nombre, proyecto.descripcion, proyecto.user_id, proyecto.nota, proyecto.enlace, proyecto.activo, proyecto.enunciado_id)
  }

  static async create (proyectoData) {
    const { error } = await supabase
      .from('proyectos')
      .insert(proyectoData)
      .select()
    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  async update () {
    const { error } = await supabase
      .from('proyectos')
      .update({
        nombre: this.nombre,
        descripcion: this.descripcion,
        user_id: this.user_id,
        nota: this.nota,
        enlace: this.enlace,
        activo: this.activo,

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
      .from('proyectos')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  async block () {
    const { error } = await supabase
      .from('proyectos')
      .update({
        activo: this.activo
      })
      .eq('id', this.id)
      .single()

    if (error) {
      throw new Error(error.message)
    }
    return true
  }
}
class ProyectoDetalle extends Proyecto {
  constructor (id = null, nombre = null, descripcion = null, user_id = null, nota = null, enlace = null, activo = null, enunciado_id = null, nombre_usuario = null, apellidos_usuario, nombre_enunciado = null, definicion_enunciado = null) {
    super(id, nombre, descripcion, user_id, nota, enlace, activo, enunciado_id)

    this.id = id
    this.nombre = nombre
    this.descripcion = descripcion
    this.user_id = user_id
    this.nota = nota
    this.enlace = enlace
    this.activo = activo
    this.enunciado_id = enunciado_id
    this.nombre_usuario = nombre_usuario
    this.apellidos_usuario = apellidos_usuario
    this.nombre_enunciado = nombre_enunciado
    this.definicion_enunciado = definicion_enunciado
  }

  static async proyectoDetalleId (proyectoid) {
    const { data, error } = await supabase
      .rpc('proyectodetalleid', {
        proyectoid
      })

    if (error) console.error(error)
    else {
      const proyecto = data[0]
      console.log('data desde clase proyectosdetalle2-', data[0])
      return new ProyectoDetalle(
        proyecto.id,
        proyecto.nombre,
        proyecto.descripcion,
        proyecto.user_id,
        proyecto.nota,
        proyecto.enlace,
        proyecto.activo,
        proyecto.enunciado_id,
        proyecto.nombre_usuario,
        proyecto.apellidos_usuario,
        proyecto.nombre_enunciado,
        proyecto.definicion_enunciado
      )
    }
  }
}
export { Proyecto, ProyectoDetalle }