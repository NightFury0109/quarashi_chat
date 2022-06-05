import { compress, decompress } from 'lz-string'
import isEmpty from './../../utils/is-empty'

export const login = (userData) => {
    if (typeof localStorage !== "undefined") {
        if (isEmpty(localStorage.getItem('user_data'))) {
            return 2;
        }
        let registered_info = JSON.parse(decompress(localStorage.getItem('user_data')))

        if (userData.username == registered_info.username && userData.password == registered_info.password) {
            userData.login_time = new Date();
            localStorage.setItem('user_token', compress(JSON.stringify(userData)))
            return 1;
        } else {
            return 0;
        }
    }
}