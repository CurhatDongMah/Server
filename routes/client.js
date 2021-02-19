const TherapistController = require('../controllers/TherapistController')
const authenticationClient = require ('../middlewares/auth-client')
const {ClientController} = require('../controllers/client_controllers')

const router  = require('express').Router()


router.post('/register', ClientController.register)
router.post('/login', ClientController.login)
// router.use(authenticationClient)

router.put('/:id', ClientController.update)
router.get('/:id/history', ClientController.findHistory)



module.exports = router

