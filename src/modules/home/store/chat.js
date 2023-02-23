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
        async postConvesation( group ){
            const { data, error } = await supabase
                .from('groups')
                .insert([group])
                .select()

            const { data: conversation } = await supabase
                .from('conversation')
                .insert([{group_id: data[0]?.id}])
                .select()

            const { data: history } = await supabase
                .from('history')
                .insert([{user_id: user?.user.id,group_id: data[0]?.id, last_message: 'Chat online'}])

            return conversation;
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