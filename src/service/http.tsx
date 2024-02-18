import axios from "axios";

const url = 'https://jsonplaceholder.typicode.com/'

export const http = {
    get: async (route: string, params?:  {}) => {
        const data = await axios.get(`${url}/${route}`, {params})
        return data.data
    },
    post: async (route: string, params?: {}) => {
        const data = await axios.get(`${url}/${route}`, { params })
        return data.data
    }
}
