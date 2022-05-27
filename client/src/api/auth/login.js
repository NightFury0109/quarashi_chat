import { compress, decompress } from 'lz-string'
import isEmpty from './../../utils/is-empty'
import api from './../../utils/api'

export const login = (userData) => {
    if (typeof localStorage !== "undefined") {
        if (isEmpty(localStorage.getItem('user_data'))) {
            return false;
        }
        let registerd_info = JSON.parse(decompress(localStorage.getItem('user_data')))

        if (userData.username == registerd_info.username && userData.password == registerd_info.password) {
            localStorage.setItem('user_token', compress(userData))
            return true
        } else {
            return false
        }

    }
}