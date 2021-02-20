const { Client, Therapist } = require('../models/index')
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
                return res.status(200).json({ access_token, email })
            } else {
                next({name: 'Invalid Email / Password'})
            }
        }
    } catch (err) {
        next(err)
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
    const id = +req.params.id
    Client.findByPk(id, {
      include: {
       model: Therapist
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