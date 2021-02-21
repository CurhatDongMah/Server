
const router  = require('express').Router()
const therapistRouter = require('./therapist')
const clientRouter = require('./client')

router.use('/client',clientRouter)
router.use('/therapist',therapistRouter)




module.exports = router

