import Cookie from "@/service/cookie"

export default {
    redirectIfAuthenticated(to, from, next) {
        const token = Cookie.getToken()
        let n
        
        if (token) {
            n = { name: 'home' }
        }
        //AINDA TEM QUE CHECAR SE O TOKEN ESTA VALIDO
        
        next(n)
    },
    
    redirectIfNotAuthenticated(to, from ,next) {
        const token = Cookie.getToken()

        if (!token) {
            next({name: 'login'})
        }

        next()
        
    }
}