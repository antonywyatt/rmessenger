import { defineStore } from "pinia";

//apis localStorage
const saveMode = localStorage.getItem('darkMode')
let MyBoolean =(saveMode === 'true' )

export const home = defineStore('home', {
    state:() => ({
        darkMode: false
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
        }
    },
    getters: {
        isDarkMode(){
            return this.darkMode
        }
    }
})