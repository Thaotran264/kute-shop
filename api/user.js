import axiosClient from "./axiosClient"
import axiosClient2 from "./axiosClient2"

export const userApi = {
    login(params) {
        const url = `/Users/Login`
        return axiosClient.post(url, params)
    },
    logout() {
        const url = `/Users/Logout`
        return axiosClient2.post(url)
    }
}