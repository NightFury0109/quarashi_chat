import API from './../../utils/api'

export const getUser = (username) => {
    let userlist;
    if (username) {
        API.post('/getUsers', username).then((users) => {
            console.log(users)
            userlist = users
        }).catch(err => {
            console.log(err)
        })
    }
    console.log(username)
}