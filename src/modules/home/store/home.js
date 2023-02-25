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