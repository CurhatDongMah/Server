const express = require('express')
const router = express.Router()
const { ClientController } = require('../controllers/client_controllers')

router.get('/', (req, res) => {
    res.status(200).json({message: 'App jalan'})
})
router.post('/register/client', ClientController.register)
router.post('/login/client', ClientController.login)

module.exports = router