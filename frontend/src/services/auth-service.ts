import { postRequest } from "../api"

type LoginResponse = {
    accessToken: string
    tokenType: string
}

export const loginUser = async (email: string, password: string): Promise<LoginResponse> => {
    const response = await postRequest("/api/auth/token", {
        email,
        password
    })
    return response.data
}