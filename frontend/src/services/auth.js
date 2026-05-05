import { api } from "./api"

export const loginHandler = async (data) => {
    try {
        const res = await api.post('/auth/login', data)
        return res.data
    } catch (err) {
        throw err
    }
}

export const registerHandler = async (data) => {
    try {
        const res = await api.post('/auth/register', data)
        return res.data
    } catch (err) {
        throw err
    }
}

export const getMe = async (data) => {
    try {
        const res = await api.post('/auth/get-me', data)
        return res.data
    } catch (err) {
        throw err

    }
}

export const logoutHandler = async (data) => {
    try {
        const res = await api.get('/auth/logout');
        return res.data
    } catch (err) {
        throw err
    }
}