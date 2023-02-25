import { storeToRefs } from "pinia"
import { salas } from "../store/salas"

export const useSalas  = () => {
    
    const { salas: isSalas, active_sala } = storeToRefs(salas())
    
    const { getSalas, selectSala } = salas()

    return {
        isSalas,
        getSalas,
        selectSala,
        active_sala
    }
}