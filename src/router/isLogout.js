import { useAuth } from "../modules/auth/composables/useAuth";

const isLogout = async (to, from, next) => {

    const {
        checkAuth
    } = useAuth()

    const ok = checkAuth()

    if(!ok) next()
    else next('/')
}

export default isLogout