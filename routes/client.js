const TherapistController = require('../controllers/therapist_controller')
const { authenticationClient, authorizeClient } = require ('../middlewares/auth-client')
const {ClientController} = require('../controllers/client_controllers')
const OrderController = require('../controllers/order_controller')
const { ReviewController } = require('../controllers/review_controllers')


const router  = require('express').Router()


router.post('/register', ClientController.register)
router.post('/login', ClientController.login)
router.use(authenticationClient)

//order 
router.post('/order', OrderController.create)
router.patch('/order/:id', OrderController.changeStatus)
router.delete('/order/:id', OrderController.delete)
router.put('/:id', authorizeClient, ClientController.update)
router.delete('/:id', authorizeClient, ClientController.delete)

router.get('/therapist', ClientController.getTherapist)  //Alltherapist
router.get('/alltherapists', TherapistController.getAll) //All Therapist status true

//history order
router.get('/history', ClientController.findHistory)
router.get('/ongoing', ClientController.findOnGoing)

//Review
router.post('/review', ReviewController.create)
router.get('/review/:id', ReviewController.getReview)




module.exports = router

