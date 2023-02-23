import { useAuth } from "../modules/auth/composables/useAuth";

const isLogin = async (to, from, next) => {

    const {
        checkAuth
    } = useAuth()

    const ok = checkAuth()

    if(ok) next()
    else next('/auth')
}

export default isLogin