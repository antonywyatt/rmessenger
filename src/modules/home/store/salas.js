import { defineStore } from 'pinia'
import { supabase } from '../../../supabase'

const data = JSON.parse(localStorage.getItem('sb-wxqaxhncvezwvdtylsly-auth-token'))

export const salas = defineStore('salas', {
    state: () => ({
        salas: [],
        active_sala: 0
    }),
    actions: {
        async getSalas(){
            const {data: salas, error} = await supabase
                .from('sala_usuarios')
                .select('id, sala_id, username, sala ( text, created_at )')
                .eq('user_id', data.user.id)
            this.salas = salas
        },
        selectSala(sala_id){
            localStorage.setItem('_c_', sala_id)
            this.active_sala = sala_id
            return true
        }
    },
    getters: {
    }
})