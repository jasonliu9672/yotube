import axios from 'axios'
const service = axios.create({
    baseURL: process.env.mediaServerUrl,
    timeout: 500000,
})
export default service