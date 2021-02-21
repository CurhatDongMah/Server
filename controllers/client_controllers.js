const { Client, Therapist, Order } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { loginToken } = require('../helpers/jwt')

class ClientController {
  static register(req, res, next) {
    const { fullName, email, password, photoUrl, birthDate, gender, city } = req.body
    const obj = {
        fullName,
        email,
        password,
        photoUrl,
        birthDate,
        gender,
        city
    }
    Client.create(obj)
    .then(data => {
        res.status(201).json({
          id: data.id,
          fullName: data.fullName,
          email: data.email,
          photoUrl: data.photoUrl,
          birthDate: data.birthDate,
          gender: data.gender,
          city: data.city
        })
    })
    .catch(err => {
        console.log(err)
        next(err)
    })
  }

  static async login(req, res, next) {
    // console.log('masuk login')
    try {
        const { email, password } = req.body

        const client = await Client.findOne({
            where: {
                email
            }
        })
        if (!client) {
            // console.log('ga ada email')
            next({name: 'Invalid Email / Password'})

        } else {
            const { id, fullName, email, photoUrl, birthDate, gender, city } = client
            const isValidPass = comparePass(password, client.password)
            if (isValidPass) {
                const payload = {
                    id: client.id,
                    email: client.email
                }
                const access_token = loginToken(payload)
                return res.status(200).json({ 
                  access_token,
                  data: {
                    id,
                    fullName,
                    email,
                    photoUrl,
                    birthDate,
                    gender,
                    city
                    
                  } 
                })
            } else {
                next({name: 'Invalid Email / Password'})
            }
        }
    } catch (err) {
        next(err)
        ;
    }
  }

  static update(req, res, next) {
    const id = +req.params.id
    const { fullName, photoUrl, birthDate, gender, city } = req.body
    const obj = {
      fullName,
      photoUrl,
      birthDate,
      gender,
      city
    }

    Client.update(obj, {
      where: {
        id
      }
    })
      .then(data => {
        return Client.findByPk(id)
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static findHistory(req, res, next) {
    const ClientId = req.loggedInClient.id
    Order.findAll({
      where: {
        ClientId,
        status: "completed"
      },
      include: {
        model: Therapist,
        attributes: {exclude: ["password"] }, required: false 
      }
      
    })
      .then(data => {
        res.status(200).json(data)
       
      })
      .catch(err => {
        next(err)
      })
  }

  static async delete(req,res,next){
    try {
      const data = await Client.destroy({
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

module.exports = { ClientController }