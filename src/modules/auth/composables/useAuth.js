import { storeToRefs } from "pinia"
import { auth } from "../store/auth"

export const useAuth  = () => {
    
    const { isUser, user, isUsuario, usuario, exists, usuarios } = storeToRefs(auth())
    
    const { checkAuth, setUser, postUsuario, logout, searchUser } = auth()

    return {
        isUser,
        user,
        exists,
        checkAuth,
        setUser,
        isUsuario,
        usuario,
        postUsuario,
        logout,
        usuarios,
        searchUser
    }
}