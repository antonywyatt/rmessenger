import { storeToRefs } from "pinia"
import { auth } from "../store/auth"

export const useAuth  = () => {
    
    const { isUser, user, isUsuario, usuario, exists } = storeToRefs(auth())
    
    const { checkAuth, setUser, postUsuario } = auth()

    return {
        isUser,
        user,
        exists,
        checkAuth,
        setUser,
        isUsuario,
        usuario,
        postUsuario
    }
}