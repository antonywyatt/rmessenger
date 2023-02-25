import { defineStore } from 'pinia'
import { supabase } from '../../../supabase'

const data = JSON.parse(localStorage.getItem('sb-wxqaxhncvezwvdtylsly-auth-token'))

export const messages = defineStore('messages', {
    state:() => ({
        mensaje: {
            sala_id: null,
            user_id: data?.user.id,
            mensaje: '',
        },
        mensajes: [],
    }),
    actions: {
        async getMensajes(sala_id){
            const {data, error} = await supabase
                .from('mensaje')
                .select('mensaje, user_id,read , read_time, tipo, url, created_at')
                .order('created_at', {
                    ascending: true,
                })
                .eq('sala_id', sala_id)

            this.mensajes = data
        },
        async sendMensaje(){
            const {data, error} = await supabase
                .from('mensaje')
                .insert([this.mensaje])
            this.mensaje.mensaje = ''
        },
    }
})