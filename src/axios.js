import axios from 'axios'

const AxiosInstance = axios.create({
    //baseURL:"http://localhost:5000"
     baseURL: "https://react-chat-app-fgz0.onrender.com/"
})

export default AxiosInstance;