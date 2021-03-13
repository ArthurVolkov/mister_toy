import { httpService } from './http.service.js'

var gLoggedinUser = JSON.parse(sessionStorage.getItem('loggedinUser'));

export const userService = {
    signUp,
    login,
    getLoggedinUser,
    logout
}

async function signUp(user) {
    console.log('user in serv signUp:', user)

    const signedUser = await httpService.post('auth/signup', user)
    _handleLoggedinUser(signedUser)
    return signedUser

    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&inStock=${filterBy.inStock}&type=${filterBy.type}`
    // const toys = await httpService.get(`toy${queryStr}`)
    // console.log('toys:', toys)
    // return toys
}
async function login(user) {
    console.log('user in serv signUp:', user)

    const loginedUser = await httpService.post('auth/login', user)
    _handleLoggedinUser(loginedUser)
    return loginedUser

    // var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&inStock=${filterBy.inStock}&type=${filterBy.type}`
    // const toys = await httpService.get(`toy${queryStr}`)
    // console.log('toys:', toys)
    // return toys
}

async function logout() {
    const logedout = await httpService.post('auth/logout')
    console.log('logedout in user-service:', logedout)
    _handleLoggedinUser(null)
    return logedout
}

function getLoggedinUser() {
    console.log('gLoggedinUser:', gLoggedinUser)
    return gLoggedinUser
}


function _handleLoggedinUser(user) {
    gLoggedinUser = user;
    console.log('user:', user)
    sessionStorage.setItem('loggedinUser', JSON.stringify(user))
    return user;
}
