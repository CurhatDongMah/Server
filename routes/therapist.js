const TherapistController = require('../controllers/therapist_controller')
const { authenticationTherapist, authorizeTherapist } = require('../middlewares/auth-therapist')
const router  = require('express').Router()


router.post('/register', TherapistController.register)
router.post('/login', TherapistController.login)

router.use(authenticationTherapist)
router.get('/clients', TherapistController.getClients) //find All client

//order
router.get('/ongoing', TherapistController.findOnGoing)
router.patch('/status', TherapistController.updateStatus)
router.get('/history', TherapistController.findHistory)
router.patch('/order/:id', TherapistController.changeCompleted)

//Therapist
router.put('/:id', authorizeTherapist, TherapistController.updateTherapist)
router.delete('/:id', authorizeTherapist, TherapistController.delete)


module.exports = router