const dbService = require('../../services/db.service')
const ObjectId = require('mongodb').ObjectId
const asyncLocalStorage = require('../../services/als.service')

async function query(filterBy = {}) {
    console.log('filterBy:', filterBy)
    const criteria = _buildCriteria(filterBy)
    const skip = filterBy.pageIdx * filterBy.pageSize
    const limit = +filterBy.pageSize
    try {
        const collection = await dbService.getCollection('toy')
        var toys = await collection.find(criteria).sort({ [filterBy.sortBy]: 1 }).skip(skip).limit(limit).toArray()
        var count = await collection.count()
        return {toys, count}
    } catch (err) {
        logger.error('cannot find toy', err)
        throw err
    }
}

async function getById(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        const toy = await collection.findOne({ '_id': ObjectId(toyId) })
        return toy
    } catch (err) {
        logger.error(`while finding toy ${toyId}`, err)
        throw err
    }
}

async function remove(toyId) {
    try {
        const collection = await dbService.getCollection('toy')
        await collection.deleteOne({ '_id': ObjectId(toyId) })
    } catch (err) {
        logger.error(`cannot remove toy ${toyId}`, err)
        throw err
    }
}

async function update(toy) {
    try {
        // peek only updatable fields!
        const toyToSave = {
            _id: ObjectId(toy._id),
            name: toy.name,
            price: toy.price,
            type: toy.type,
            createdAt: toy.createdAt,
            inStock: toy.inStock,
            reviews: toy.reviews || []
        }
        const collection = await dbService.getCollection('toy')
        await collection.updateOne({ '_id': toyToSave._id }, { $set: toyToSave })
        return toyToSave;
    } catch (err) {
        logger.error(`cannot update toy ${toy._id}`, err)
        throw err
    }
}

async function add(toy) {
    try {
        // peek only updatable fields!
        const toyToAdd = {
            name: toy.name,
            price: toy.price,
            type: toy.type,
            createdAt: Date.now(),
            inStock: true
        }
        const collection = await dbService.getCollection('toy')
        await collection.insertOne(toyToAdd)
        return toyToAdd;
    } catch (err) {
        logger.error('cannot insert toy', err)
        throw err
    }
}

async function addReview(review) {
    console.log('review:', review)
    review._id = _makeId()
    try {
        const toy = await getById(review.toyId)
        console.log('toy:', toy)
        if (!toy.reviews) toy.reviews = []
        toy.reviews.push(review)
        await update(toy)
        return review


    } catch (err) {
        logger.error('cannot insert review', err)
        throw err
    }
}

module.exports = {
    query,
    remove,
    add,
    getById,
    update,
    addReview
}



function _buildCriteria(filterBy) {
    const criteria = {}
    if (filterBy.name) {
        criteria.name = { $regex: filterBy.name, $options: 'i' }
    }
    if (filterBy.type && filterBy.type !== 'all') {
        criteria.type = { $eq: filterBy.type }
    }
    if (filterBy.inStock && filterBy.inStock !== 'all') {
        criteria.inStock = { $eq: JSON.parse(filterBy.inStock) }
    }
    return criteria
}



function _makeId(length = 5) {
    var txt = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return txt
}

