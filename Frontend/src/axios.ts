import axios from "axios";

const baseAxios = axios.create({
    baseURL: 'http://localhost:4000'
});
baseAxios.interceptors.request.use((config) => {
    config.headers.Authorization = window.localStorage.getItem('token');

    return config
})

export default baseAxios;

