import { defineStore } from "pinia";
import { useRouter } from "vue-router";
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
        },
        usuarios: [],
    }),
    actions: {
        async setUser(){

            if(data){
                const {data: usuario, error} = await supabase
                    .from('usuarios')
                    .select('user_id, username, active, status, photo')
                    .eq('user_id', data.user.id)

                if(!usuario.length){
                    this.exists = false
                    this.usuario.username = generateRandomString(15)
                    this.usuario.photo = data.user.user_metadata.avatar_url
                }else{
                    this.exists = true
                    this.usuario = usuario[0]
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
        async postUsuario(){
            const { data: new_user , error } = await supabase
                .from('usuarios')
                .insert([{
                    ...this.usuario, 
                    user_id: data.user.id
                }])
                .select('*')

            return {
                new_user, 
                error
            }
        },
        async logout(){
            const { error } = await supabase.auth.signOut()
            this.isAuth = false
            this.user = {}
            localStorage.removeItem('sb-wxqaxhncvezwvdtylsly-auth-token')
            localStorage.removeItem('_c_')
            window.location.href = '/auth'
        },
        async searchUser(query){
            const { data, error } = await supabase
                .from('usuarios')
                .select('user_id, username, status')
                .ilike('username', `%${query}%`)
                .neq('username', this.usuario.username)
                .limit(5)

            this.usuarios = data
        }
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