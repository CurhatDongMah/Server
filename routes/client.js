const TherapistController = require('../controllers/TherapistController')
const { authenticationClient, authorizeClient } = require ('../middlewares/auth-client')
const {ClientController} = require('../controllers/client_controllers')
const OrderController = require('../controllers/order_controller')
const { ReviewController } = require('../controllers/review_controllers')


const router  = require('express').Router()


router.post('/register', ClientController.register)
router.post('/login', ClientController.login)
router.use(authenticationClient)
router.post('/order', OrderController.create)
router.get('/alltherapists', TherapistController.getAll)
router.put('/:id', authorizeClient, ClientController.update)
router.delete('/:id', authorizeClient, ClientController.delete)
router.get('/:id/history',authorizeClient, ClientController.findHistory)
router.post('/:id/review', authenticationClient, ReviewController.create)




module.exports = router

