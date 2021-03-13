// import { utilService } from './util.service.js'
// import { userService } from './user.service.js'
import { storageService } from './async-storage.service.js'
import { httpService } from './http.service.js'
import { userService } from './user.service.js'
import axios from 'axios'

const TOY_KEY = 'toys'
const TOY_URL = '//localhost:3030/api/toy/'


// _createToys()
// var gFilterBy = { name: '', pageIdx: 0 }

export const toyService = {
    query,
    remove,
    save,
    getEmptyToy,
    getById,
    setFilter,
    nextPage,
    saveReview
    // getToysCountByUserId
}


function setFilter(filterBy) {
    gFilterBy.title = filterBy.title
    gFilterBy.pageIdx = 0;
}
function nextPage() {
    gFilterBy.pageIdx++
}

async function query(filterBy) {

    var queryStr = (!filterBy) ? '' : `?name=${filterBy.name}&inStock=${filterBy.inStock}&type=${filterBy.type}&pageIdx=${filterBy.pageIdx}&pageSize=${filterBy.pageSize}&sortBy=${filterBy.sortBy}`
    const toys = await httpService.get(`toy${queryStr}`)
    console.log('toys:', toys)
    return toys
}
// function query(filterBy) {
//     console.log('filterBy in front-service:', filterBy)
//     // return storageService.query(TOY_KEY)
//     return axios.get(TOY_URL, { params: filterBy })
//         .then(res => res.data)
//     // return axios.get(TOY_URL, { params: gFilterBy })
//     //     .then(res => res.data)
// }

// function getById(id) {
//     // return storageService.get(TOY_KEY, id)
//     return axios.get(TOY_URL + id).then(res => res.data)
// }

async function getById(id) {
    const toy = await httpService.get(`toy/${id}`)
    console.log('toy:', toy)
    return toy
}


async function remove(id) {
    return httpService.delete(`toy/${id}`)

}
// function remove(id) {
//     // return storageService.remove(TOY_KEY, id)
//     // return axios.get(TOY_URL + id + '/remove').then(res => res.data)

//     return axios.delete(TOY_URL + id).then(res => res.data)
// }

async function save(toy) {
    if (toy._id) {
        // return storageService.put(TOY_KEY, toy)

        const editedToy = await httpService.put(`toy/${toy._id}`, toy)
        return editedToy

        // return axios.put(TOY_URL + toy._id, toy)
        //     .then(res => res.data)
        //     .catch(err => { throw new Error(err.message) })
    } else {
        const addedToy = await httpService.post('toy', toy)
        return addedToy
        // return storageService.post(TOY_KEY, {...toy, createdAt: Date.now()})
        // return axios.post(TOY_URL, toy).then(res => res.data)
    }
}

async function saveReview(review) {
    const user = userService.getLoggedinUser()
    if (!user) throw new Error('Have to login')
    review.owner = user.fullname
    const addedReview = await httpService.post(`toy/${review.toyId}/review`, review)
    return addedReview
    // return storageService.post(TOY_KEY, {...toy, createdAt: Date.now()})
    // return axios.post(TOY_URL, toy).then(res => res.data)

}



function getEmptyToy() {
    return { name: '', price: 150, type: 'Funny', inStock: true }
}

// function getToysCountByUserId(userId) {
//     return axios.get(TOY_URL)
//         .then(res => console.log('getToysCountByUserId res:', res))
//         // .then(res => res.data)
// }



// Create Test Data:
function _createToys() {
    var toys = JSON.parse(localStorage.getItem(TOY_KEY))
    if (!toys || !toys.length) {
        toys = demoToys
        localStorage.setItem(TOY_KEY, JSON.stringify(toys))
    }
    return toys;
}