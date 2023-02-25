import { storeToRefs } from "pinia"
import { salas } from "../store/salas"

export const useSalas  = () => {
    
    const { salas: isSalas } = storeToRefs(salas())
    
    const { getSalas, watchSalas } = salas()

    return {
        isSalas,
        getSalas,
        watchSalas
    }
}