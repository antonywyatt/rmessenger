import { defineStore } from "pinia";
import { supabase } from '../../../supabase'

import { generateRandomString } from '../../../utils/randomText'
const data = JSON.parse(localStorage.getItem('sb-wxqaxhncvezwvdtylsly-auth-token'))

export const auth = defineStore('auth', {
    state:() => ({
        exists: true,
        isAuth: false,
        user: {},
        usuario: {
            username: '',
            active: false,
            status: 'I love RMessage 💜',
            photo: '',
        }
    }),
    actions: {
        async setUser(){

            if(data){
                const {data: usuario, error} = await supabase
                    .from('usuarios')
                    .select('username, active, status, photo')
                    .eq('user_id', data.user.id)

                if(!usuario.length){
                    this.exists = false
                    this.usuario.username = generateRandomString(15)
                    this.usuario.photo = data.user.user_metadata.avatar_url
                    console.log(this.usuario)
                }else{
                    this.exists = true
                    this.usuario = usuario
                }
            }


            this.user = data != null ? data.user.user_metadata : {}
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
            return this.user
        },
        isUsuario(){
            return this.usuario
        }
    }
})