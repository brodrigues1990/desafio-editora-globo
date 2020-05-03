import axios from 'axios';

const api = axios.create({
    baseURL: "https://5ea76bdc35f3720016607c12.mockapi.io/",
});

export default api;