import axios from 'axios';
function getToken (){
    let token
    if (typeof window !== "undefined") {
        token = localStorage.getItem("token") ? localStorage.getItem("token") : {};
      }
}
const axiosClient2 = axios.create({
    baseURL: process.env.BASE_URL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${getToken()}`
    },
}); 
axiosClient2.interceptors.response.use(
    function (response) {
        return response.data;
    },
    function (error) {
        return Promise.reject(error);
    }
);

export default axiosClient2;