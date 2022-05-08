

export const userService = {
    login,
    logout,
    getLoggedinUser,
    signup,
    query,
    remove
}

const BASE_URL = `/api/user/`

function getLoggedinUser() {
    const user = JSON.parse(sessionStorage.getItem('loggedinUser'))
    return user
}

function login(username) {
    return axios.post('/api/login', { username })
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem('loggedinUser', JSON.stringify(user))
            return user
        })
}

function logout() {
    return axios.post('/api/logout')
        .then(() => {
            sessionStorage.removeItem('loggedinUser')
        })
}

function signup(user) {
    return axios.post('/api/signup', user)
        .then(res => res.data)
        .then(user => {
            sessionStorage.setItem('loggedinUser', JSON.stringify(user))
            return user
        })
}

function query() {
    return axios.get(BASE_URL)
        .then(res => res.data)
}

function remove(userId) {
    return axios.delete(BASE_URL + userId).then(res => res.data)
}