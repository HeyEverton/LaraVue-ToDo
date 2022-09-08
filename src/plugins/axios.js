import Vue from 'vue'
import axios from 'axios'

const axiosIns = axios.create({
    // timeout: 1000,
    // headers: {'X-Custom-Header': 'foobar'}
    baseURL: 'http://localhost:8000/api/',
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }

})
Vue.prototype.$http = axiosIns
export default axiosIns