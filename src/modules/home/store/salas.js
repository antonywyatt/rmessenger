import { defineStore } from 'pinia'
import { supabase } from '../../../supabase'

const data = JSON.parse(localStorage.getItem('sb-wxqaxhncvezwvdtylsly-auth-token'))

export const salas = defineStore('salas', {
    state: () => ({
        salas: [],
    }),
    actions: {
        async getSalas(){
            const {data: salas, error} = await supabase
                .from('sala_usuarios')
                .select('id, sala_id, username, sala ( text, created_at )')
                .eq('user_id', data.user.id)
            this.salas = salas
        },
        async watchSalas(){
            const salaUsuarios = supabase.channel('custom-all-channel')
                .on(
                    'postgres_changes',
                    { event: '*', schema: 'public', table: 'sala_usuarios', filter: `user_id=eq.${data.user.id}` },
                    (payload) => {
                        console.log(payload)
                        if(payload.eventType === 'INSERT'){
                            this.salas.push({
                                id: payload.new.id,
                                sala_id: payload.new.sala_id,
                                username: payload.new.username,
                                sala: {
                                    text: 'aún no hay mensajes',
                                    created_at: payload.new.created_at
                                }
                            })
                        }else{
                            this.getSalas()
                        }
                    }
                )
            .subscribe()
        }
    },
    getters: {
    }
})