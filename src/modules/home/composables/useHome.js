import { storeToRefs } from "pinia"
import { supabase } from "../../../supabase"
import { home } from "../store/home"
import { messages } from "../store/messages"
import { salas } from "../store/salas"

const data = JSON.parse(localStorage.getItem('sb-wxqaxhncvezwvdtylsly-auth-token'))

export const useHome  = () => {
    
    const { isDarkMode, isActiveChat, new_chat, user_select } = storeToRefs(home())
    const { checkDarkMode, setDarkMode, selectUser, createSala } = home()

    const { salas: isSalas } = storeToRefs(salas())
    const { getSalas } = salas()

    const {mensajes} = storeToRefs(messages())
    const { getMensajes} = messages()


    //GLOBLAL REALTIME
    const watchRealtime = (chat_id) => {
        const mensajeUsuario = supabase.channel('custom-all-channel')
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'mensaje', filter: `sala_id=eq.${chat_id}` },
                (payload) => {
                    if(payload.eventType === 'INSERT'){
                        mensajes.value.push({
                            id: payload.new.id,
                            sala_id: payload.new.sala_id,
                            user_id: payload.new.user_id,
                            mensaje: payload.new.mensaje,
                            read: payload.new.read,
                            read_time: payload.new.read_time,
                            tipo: payload.new.tipo,
                            url: payload.new.url
                        })
                    }else{
                        getMensajes()
                    }
                }
            )
            .on(
                'postgres_changes',
                { event: '*', schema: 'public', table: 'sala_usuarios', filter: `user_id=eq.${data.user.id}` },
                (payload) => {
                    if(payload.eventType === 'INSERT'){
                        isSalas.value.push({
                            id: payload.new.id,
                            sala_id: payload.new.sala_id,
                            username: payload.new.username,
                            sala: {
                                text: 'aún no hay mensajes',
                                created_at: payload.new.created_at
                            }
                        })
                    }else{
                        getSalas()
                    }
                }
            )
        .subscribe()
    }

    return {
        new_chat,
        isDarkMode,
        checkDarkMode,
        setDarkMode,
        isActiveChat,
        user_select,
        selectUser,
        createSala,
        watchRealtime
    }
}