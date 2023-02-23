import { storeToRefs } from "pinia"
import { auth } from "../store/auth"

export const useAuth  = () => {
    
    const { isUser, user, ui } = storeToRefs(auth())
    
    const { checkAuth, setUser } = auth()

    return {
        isUser,
        user,
        ui,
        checkAuth,
        setUser
    }
}