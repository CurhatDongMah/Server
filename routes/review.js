const router = require('express').Router()
const { ReviewController } = require('../controllers/review_controllers')

router.post('/', ReviewController.create)

module.exports = router