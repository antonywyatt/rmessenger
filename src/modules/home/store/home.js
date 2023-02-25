import { defineStore } from "pinia";
import { supabase } from '../../../supabase'

//apis localStorage
const saveMode = localStorage.getItem('darkMode')
let MyBoolean =(saveMode === 'true' )

export const home = defineStore('home', {
    state:() => ({
        darkMode: false,
        activeChat: true,
        new_chat: false,
        user_select: {
            i: false
        }
    }),
    actions: {
        setDarkMode(){
            this.darkMode = !this.darkMode
            localStorage.setItem('darkMode', this.darkMode)
        },
        checkDarkMode(){
            if(MyBoolean){
                this.darkMode = true
            }else{
                this.darkMode = false
            }
        },
        selectUser(user){
            this.user_select = {
                ...user,
                i: true
            }
        },
        async createSala(usuario){
            const { data, error } = await supabase
                .from('sala')
                .insert([{
                    name: this.user_select.username,
                    text: 'aún no hay mensajes'
                }])
                .select('id')
            
            const salas_array = [{
                user_id: usuario.user_id,
                sala_id: data[0]?.id,
                username: this.user_select.username
            },
            {
                user_id: this.user_select.user_id,
                sala_id: data[0]?.id,
                username: usuario.username
            }]


            const {data: sala } = await supabase
                .from('sala_usuarios')
                .insert(salas_array)
                .select('id')

            return sala
        }
    },
    getters: {
        isDarkMode(){
            return this.darkMode
        },
        isActiveChat(){
            return this.activeChat
        },
    }
})