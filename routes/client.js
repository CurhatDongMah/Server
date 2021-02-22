const TherapistController = require('../controllers/therapist_controller')
const { authenticationClient, authorizeClient } = require ('../middlewares/auth-client')
const {ClientController} = require('../controllers/client_controllers')
const OrderController = require('../controllers/order_controller')
const { ReviewController } = require('../controllers/review_controllers')


const router  = require('express').Router()


router.post('/register', ClientController.register)
router.post('/login', ClientController.login)
router.use(authenticationClient)
router.post('/order', OrderController.create)
router.patch('/order/:id', OrderController.changeStatus)
router.delete('/order/:id', OrderController.delete)
router.get('/alltherapists', TherapistController.getAll)
router.put('/:id', authorizeClient, ClientController.update)
router.delete('/:id', authorizeClient, ClientController.delete)
router.get('/history', ClientController.findHistory)
router.get('/ongoing', ClientController.findOnGoing)
router.post('/review', ReviewController.create)




module.exports = router

