import Vue from 'vue'
import axios from 'axios'
import Cookie from '@/service/cookie'

// const axiosIns = axios.create({
//     // timeout: 1000,
//     // headers: {'X-Custom-Header': 'foobar'}
//     baseURL: 'http://localhost:8000/api/',
//     headers: {
//         'Content-Type': 'application/json',
//         'Accept': 'application/json',
        
//     }

// })
axios.defaults.baseURL = 'http://localhost:8000/api/'
axios.defaults.headers.common['Content-Type'] = 'application/json'
axios.defaults.headers.common['Accept'] = 'application/json'

axios.interceptors.request.use(function (config) {
    const token = Cookie.getToken()

    if (token) {
        config.headers.common['Authorization'] = token;
    }

    return config
})
Vue.prototype.$http = axios
// export default axiosIns