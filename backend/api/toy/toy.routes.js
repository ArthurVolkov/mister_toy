const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {log} = require('../../middlewares/logger.middleware')
const {getToys, getToy, updateToy, addToy, deleteToy, addReview} = require('./toy.controller')
// const { addReview } = require('../review/review.controller')
const router = express.Router()

// middleware that is specific to this router
// router.use(requireAuth)

router.get('/', log, getToys)
router.get('/:id', getToy)
router.put('/:id', requireAuth, requireAdmin, updateToy)
router.post('/:id/review', requireAuth, addReview)
router.post('/', requireAuth, requireAdmin, addToy)
router.delete('/:id', requireAuth, requireAdmin, deleteToy)


// router.get('/', log, getToys)
// router.get('/:id', getToy)
// router.put('/:id',  updateToy)
// router.post('/',  requireAuth, addToy)
// router.delete('/:id',  requireAuth, deleteToy)

module.exports = router