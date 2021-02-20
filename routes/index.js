
const router  = require('express').Router()
const therapistRouter = require('./therapist')
const clientRouter = require('./client')
const reviewRouter = require('./review')

router.use('/client',clientRouter)
router.use('/therapist',therapistRouter)
router.use('/review', reviewRouter)




module.exports = router

