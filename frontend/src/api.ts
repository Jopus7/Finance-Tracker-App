import axios from "axios"


const api = axios.create({
    baseURL: "http://localhost:8000"
})


export const postRequest = async (endpoint: string, data: any) => {
    try {
        const response = await api.post(`${endpoint}`, data);
        return response.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}