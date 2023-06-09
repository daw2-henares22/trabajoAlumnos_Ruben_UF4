import { supabase } from './supabase.js'

export class Nota {
  constructor (id = null, created_at = null, nota = null, proyecto_id = null, user_id = null, rubrica_id = null) {
    this.id = id
    this.created_at = created_at
    this.nota = nota
    this.proyecto_id = proyecto_id
    this.user_id = user_id
    this.rubrica_id = rubrica_id
  }

  static async getAll () {
    const { data: notas, error } = await supabase
      .from('notas')
      .select('*')
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }

    return notas.map(({ id, created_at, nota, proyecto_id, user_id, rubrica_id }) => {
      return new Nota(id, created_at, nota, proyecto_id, user_id, rubrica_id)
    })
  }

  static async getAllByProjectId (id) {
    const { data: notas, error } = await supabase
      .from('notas')
      .select('*')
      .eq('proyecto_id', id)
      .order('created_at', { ascending: false })
    if (error) {
      throw new Error(error.message)
    }

    return notas.map(({ id, created_at, nota, proyecto_id, user_id, rubrica_id }) => {
      return new Nota(id, created_at, nota, proyecto_id, user_id, rubrica_id)
    })
  }

  static async getById (id) {
    const { data: nota, error } = await supabase
      .from('notas')
      .select('*')
      .eq('id', id)
      .single()

    if (error) {
      throw new Error(error.message)
    }

    return new Nota(nota.id, nota.nota, nota.proyecto_id, nota.user_id)
  }

  static async create (notaData) {
    const { data, error } = await supabase
      .from('notas')
      .insert(notaData)
      .select()
    if (error) {
      throw new Error(error.message)
    }
 
    return data[0]
  }

  async update () {
    const { error } = await supabase
      .from('notas')
      .update({
        nota: this.nota,
        proyecto_id: this.proyecto_id,
        user_id: this.user_id,
        rubrica_id: this.rubrica_id
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
      .from('notas')
      .delete()
      .eq('id', id)

    if (error) {
      throw new Error(error.message)
    }
    return true
  }

  static async eventos () {
    const notas = supabase.channel('custom-all-channel')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'notas' },
        (payload) => {
          return 'change'
        }
      )
      .subscribe()
  }
}