import API from './../../utils/api'

export const getUser = (username) => {
    let user_list;
    if (username) {
        API.post('/getUsers', username).then((users) => {
            console.log(users)
            user_list = users
        }).catch(err => {
            console.log(err)
        })
    }
    console.log(username)
}