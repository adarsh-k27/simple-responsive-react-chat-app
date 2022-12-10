import axios from 'axios'

const AxiosInstance = axios.create({
    baseURL: "https://react-chat-app-fgz0.onrender.com/"
})

export default AxiosInstance;