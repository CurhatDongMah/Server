const TherapistController = require('../controllers/TherapistController')
const { authenticationTherapist, authorizeTherapist } = require('../middlewares/auth-therapist')

const router  = require('express').Router()


router.post('/register', TherapistController.register)
router.post('/login', TherapistController.login)

router.use(authenticationTherapist)
router.put('/:id', authorizeTherapist, TherapistController.updateTherapist)

module.exports = router