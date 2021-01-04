import axios from 'axios'
const service = axios.create({
    baseURL: 'http://localhost:4000',
    timeout: 500000,
    withCredentials: true
})

service.interceptors.request.use(
    config => {
        if (window.$nuxt.$store.getters['user/token']) {
             service.defaults.headers.common['Authorization'] = window.$nuxt.$store.getters['user/token'];
             console.log('yes')
        }
        return config
    },
    error => {
        console.log(error)
        return new Promise(function (resolve, reject) {
            if (error.status === 401 && error.config && !error.config.__isRetryRequest) {
                window.$nuxt.$store.dispatch('user/logout');
                resolve();
            }
            reject(error);
        })
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data

        // if (res.code !== 20000) {
        //     return Promise.reject(new Error(res.message || 'Error'))
        // } else {
        return res
        // }
    },
    error => {
        console.log('err' + error)
        return Promise.reject(error)
    }
)

export const deleteAuthHeader = function () {
    delete service.defaults.headers.common['Authorization']
}
export default service