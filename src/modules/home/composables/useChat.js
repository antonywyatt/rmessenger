import { storeToRefs } from "pinia"
import { chat } from "../store/chat"

export const useChat  = () => {
    
    const { chat_history, isChatHistory } = storeToRefs(chat())
    
    const { getChatHistory, checkHistory, postConvesation } = chat()

    return {
        chat_history,
        getChatHistory,
        isChatHistory,
        checkHistory,
        postConvesation
    }
}