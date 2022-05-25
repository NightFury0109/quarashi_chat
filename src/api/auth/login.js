import { compress, decompress } from 'lz-string'

export const login = (userData) => {
    if(typeof localStorage !== "undefined"){
        let registerd_info = JSON.parse(decompress(localStorage.getItem('user_data')))
        if(userData.username == registerd_info.username && userData.password == registerd_info.password){
            localStorage.setItem('user_token', compress(userData))
            return true 
        } else {
            return false
        }
    }
}