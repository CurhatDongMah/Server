const { Client } = require('../models/index')
const { comparePass } = require('../helpers/bcrypt')
const { loginToken } = require('../helpers/jwt')

class ClientController {
  static findClient(req, res, next) {
    Client.findAll()
      .then(data => {
        res.status(201).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

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
        res.status(201).json(data)
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
            const isValidPass = comparePass(password, client.password)
            if (isValidPass) {
                const payload = {
                    id: client.id,
                    email: client.email
                }
                const access_token = loginToken(payload)
                const userData = {
                  access_token,
                  email: client.email,
                  role: client.role
                }
                return res.status(200).json(userData)
            } else {
                next({name: 'Invalid Email / Password'})
            }
        }
    } catch (err) {
        // console.log(err)
        next(err)
    }
  }
}

module.exports = { ClientController }