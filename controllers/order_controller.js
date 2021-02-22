const { Order, Therapist } = require ('../models/index');

class OrderController {
    static create (req, res, next) {
        const ClientId = req.loggedInClient.id
        console.log(ClientId, 'ini dari create order')
        const {TherapistId} = req.body
        // const newOrder = {}

        const obj = {
            ClientId,
            TherapistId,
            status: 'not complete'
        }

        Order.create(obj)
        .then((result) => {
            res.status(201).json(result)
            
        }).catch((err) => {
            next(err)
            
        });
    }

    static changeStatus(req, res, next) {
        const orderId = +req.params.id
        const { status } = req.body
        const obj = {
            status
        }
        Order.update(obj, {
          where: {
            id: orderId
          }
        })
          .then(data => {
            return Order.findByPk(orderId)
          })
          .then(data => {
            if (data === null) {
                next({name: 'Internal Server Error'})
            }
            res.status(200).json(data)
          })
          .catch(err => {
            next(err)
          })
    }

    static async delete(req,res,next){
      try {
        const data = await Order.destroy({
          where : {
            id : req.params.id
          }
        })
        res.status(200).json({message : "Data has been deleted successfully"})
      } catch (err) {
        next(err)
      }
    }
}

module.exports = OrderController