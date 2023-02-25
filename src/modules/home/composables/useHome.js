import { storeToRefs } from "pinia"
import { home } from "../store/home"

export const useHome  = () => {
    
    const { isDarkMode, isActiveChat, new_chat, user_select } = storeToRefs(home())
    
    const { checkDarkMode, setDarkMode, selectUser, createSala } = home()

    return {
        new_chat,
        isDarkMode,
        checkDarkMode,
        setDarkMode,
        isActiveChat,
        user_select,
        selectUser,
        createSala
    }
}