const TherapistController = require('../controllers/TherapistController')
const authenticationTherapist = require('../middlewares/auth-therapist')

const router  = require('express').Router()


router.post('/register', TherapistController.register)
router.post('/login', TherapistController.login)

// router.use(authenticationTherapist)
router.get('/', TherapistController.getAll)

module.exports = router