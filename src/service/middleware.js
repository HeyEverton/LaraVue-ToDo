import Cookie from "@/service/cookie"
import axios from "axios"
import store from '@/store'

export default {

    // SE ->NAO<- ESTA AUTENTICADO
    async redirectIfNotAuthenticated(to, from, next) {
        const token = Cookie.getToken()

        if (!token) {
            next({ name: 'login' })
        }
        //AINDA TEM QUE CHECAR SE O TOKEN ESTA VALIDO
        await axios
            .get('http://localhost:8000/api/v1/me')
            .then((response) => {
                if (!store?.state?.user?.id) {
                    store.commit('user/STORE_USER', response.data.data)
                }
            })
            .catch(() => {
                Cookie.deleteToken()
                next({ name: 'login' })
            })

        next()
    },

    //SE ESTA AUTENTICADO
    redirectIfAuthenticated(to, from, next) {
        const token = Cookie.getToken()
        let n

        if (token) {
            n = { name: 'home' }
        }


        next(n)
    },
}