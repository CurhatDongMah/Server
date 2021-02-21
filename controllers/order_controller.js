const { Order, Therapist } = require ('../models/index')

class OrderController {
    static create (req, res, next) {
        const ClientId = req.loggedInClient.id
        const {TherapistId} = req.body
        // const newOrder = {}

        const obj = {
            ClientId,
            TherapistId
        }

        Order.create(obj)
        .then((result) => {
            res.status(201).json(result)
            
        }).catch((err) => {
            next(err)
            
        });
    }
}

module.exports = OrderController