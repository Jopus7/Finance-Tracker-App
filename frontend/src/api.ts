import axios from "axios"


const BASE_URL = "http://0.0.0.0:8000";


export const postRequest = async (endpoint: string, data: any) => {
    try {
        const response = await axios.post(`${BASE_URL}${endpoint}`, data);
        return response.data
    }
    catch (error) {
        console.log(error)
        throw error
    }
}