import { defineStore } from "pinia";
import { supabase } from '../../../supabase'

//apis localStorage
const user = JSON.parse(localStorage.getItem('sb-wxqaxhncvezwvdtylsly-auth-token'))

export const chat = defineStore('chat', {
    state:() => ({
        chat_history: [],
        chat_messages: [],
        chat_now: {},
    }),
    actions: {
        async getChatHistory(){
            let { data: history, error } = await supabase
                .from('history')
                .select('*, groups( name, icono )')
                .eq('user_id', user?.user.id)

            this.chat_history = history
        },
        async checkHistory(){
            supabase
            .channel('any')
            .on('postgres_changes', { 
                event: '*', 
                schema: 'public', 
                table: 'history',
                filter: `user_id=eq.${user?.user.id}`
            }, async payload => {
                let { data: history, error } = await supabase
                    .from('history')
                    .select('*, groups( name, icono )')
                    .eq('user_id', user?.user.id)

                this.chat_history = history
            })
            .subscribe()
        }
        
    },
    getters: {
        isChatHistory(){
            return this.chat_history
        }
    }
})