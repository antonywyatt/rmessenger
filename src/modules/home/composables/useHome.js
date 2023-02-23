import { storeToRefs } from "pinia"
import { home } from "../store/home"

export const useHome  = () => {
    
    const { isDarkMode, isActiveChat } = storeToRefs(home())
    
    const { checkDarkMode, setDarkMode } = home()

    return {
        isDarkMode,
        checkDarkMode,
        setDarkMode,
        isActiveChat
    }
}