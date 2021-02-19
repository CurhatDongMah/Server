const router = require('express').Router()

const { ClientController } = require('../controllers/client_controllers')

router.put('/:id', ClientController.update)
router.get('/:id/history', ClientController.findHistory)

module.exports = router