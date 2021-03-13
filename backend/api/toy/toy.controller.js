const logger = require('../../services/logger.service')
const userService = require('../user/user.service')
const toyService = require('./toy.service')

async function getToys(req, res) {
    try {
        console.log('req.query:', req.query)
        const toys = await toyService.query(req.query)
        /////////////////////////////////////////////
        setTimeout(() => { 
            res.send(toys)
        }, 500);
        /////////////////////////////////////////////
    } catch (err) {
        logger.error('Cannot get toys', err)
        res.status(500).send({ err: 'Failed to get toys' })
    }
}

async function getToy(req, res) {
    try {
        const toy = await toyService.getById(req.params.id)
        ////////////////////////////////////////////
        setTimeout(() => { 
            res.send(toy)
        }, 500);
        ///////////////////////////////////////////
    } catch (err) {
        logger.error('Failed to get toy', err)
        res.status(500).send({ err: 'Failed to get toy' })
    }
}

async function deleteToy(req, res) {
    try {
        await toyService.remove(req.params.id)
        res.send({ msg: 'Deleted successfully' })
    } catch (err) {
        logger.error('Failed to delete toy', err)
        res.status(500).send({ err: 'Failed to delete toy' })
    }
}


async function updateToy(req, res) {
    try {
        const toy = req.body
        const savedToy = await toyService.update(toy)
        res.send(savedToy)
    } catch (err) {
        logger.error('Failed to update toy', err)
        res.status(500).send({ err: 'Failed to update toy' })
    }
}



async function addToy(req, res) {
    try {
        const toy = req.body
        const savedUser = await toyService.add(toy)
        res.send(savedUser)

    } catch (err) {
        logger.error('Failed to add toy', err)
        res.status(500).send({ err: 'Failed to add toy' })
    }
}

async function addReview(req, res) {
    try {
        const review = req.body
        const savedReview = await toyService.addReview(review)
        res.send(savedReview)

    } catch (err) {
        logger.error('Failed to add review', err)
        res.status(500).send({ err: 'Failed to add review' })
    }
}

module.exports = {
    getToys,
    getToy,
    deleteToy,
    addToy,
    updateToy,

    addReview
}