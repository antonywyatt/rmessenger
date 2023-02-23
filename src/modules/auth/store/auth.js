import { defineStore } from "pinia";

const data = JSON.parse(localStorage.getItem('sb-wxqaxhncvezwvdtylsly-auth-token'))

export const auth = defineStore('auth', {
    state:() => ({
        ui: 'default',
        isAuth: false,
        user: {}
    }),
    actions: {
        setUser(){
            this.user = data != null ? data.user : {}
            this.isAuth = data != null ? true  : false
        },
        checkAuth(){
            if(data != null){
                return true
            }else{
                return false
            }
        },
    },
    getters: {
        isUser(){
            return this.user.user_metadata
        }
    }
})