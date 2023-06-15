import axios from "axios";

import {getCookie, removeToken} from "@/cookie";

let requests =  axios.create({
    baseURL:"/api",
    timeout:5000,
})

requests.interceptors.request.use((config) => {

    config.headers['Content-Type'] = 'application/json'
    // NProgress.start()
    const token = getCookie('token')
    if (token) {
        config.headers.token = token;
    }
    return config
}, err => {
    return Promise.reject(err)
})
export default requests