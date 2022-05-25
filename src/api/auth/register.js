import { compress, decompress } from 'lz-string'

export const register = (userData) => {
    let data = compress(JSON.stringify(userData))
    if(typeof localStorage !== "undefined"){
        localStorage.setItem('userData', data)
    }
    return true;
}