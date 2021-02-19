const express = require('express')
const router = express.Router()
const { ClientController } = require('../controllers/client_controllers')
const TherapistController = require('../controllers/TherapistController')
const clientRoutes = require('./client_routes')

router.get('/', (req, res) => {
    res.status(200).json({message: 'App jalan'})
})
router.post('/register/client', ClientController.register)
router.post('/login/client', ClientController.login)
router.use('/client', clientRoutes)

router.post('/register/therapist', TherapistController.register)
router.post('/login/therapist', TherapistController.login)
router.get('/therapist', TherapistController.getAll)

module.exports = router