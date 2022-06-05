import { compress } from 'lz-string'

export const register = (userData) => {
    let data = compress(JSON.stringify(userData))
    if (typeof localStorage !== "undefined") {
        localStorage.setItem('user_data', data)
    }
    return true;
}