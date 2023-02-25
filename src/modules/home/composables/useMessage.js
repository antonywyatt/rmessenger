import { storeToRefs } from "pinia"
import { messages } from "../store/messages"

export const useMessage  = () => {
    
    const { mensajes, mensaje } = storeToRefs(messages())
    
    const { getMensajes, sendMensaje } = messages()

    return {
        mensajes,
        mensaje,
        getMensajes,
        sendMensaje
    }
}