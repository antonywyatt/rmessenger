import { defineStore } from 'pinia'
import { supabase } from '../../../supabase'

const data = JSON.parse(localStorage.getItem('sb-wxqaxhncvezwvdtylsly-auth-token'))

export const salas = defineStore('salas', {
    state: () => ({
        salas: []
    }),
    actions: {
        async getSalas(){
            const {data: salas, error} = await supabase
                .from('sala_usuarios')
                .select('sala_id, username, sala ( text, created_at )')
                .eq('user_id', data.user.id)

            this.salas = salas
        },
        async watchSalas(){
            const salaUsuarios = supabase.channel('custom-all-channel')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'sala_usuarios', filter: `user_id=eq.${data.user.id}` },
                    (payload) => {
                        this.salas.push({
                            salas_id: payload.new.salas_id,
                            username: payload.new.username
                        })
                    }
                )
            .subscribe()
        }
    },
    getters: {

    }
})