const { Therapist, Order, Client }  = require('../models')
const { comparePass } = require('../helpers/bcrypt')
const { loginToken } = require('../helpers/jwt')

class TherapistController {
  static register (req, res, next) {
    let input = {
      fullName: req.body.fullName,
      email: req.body.email,
      password: req.body.password,
      photoUrl: req.body.photoUrl,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      city: req.body.city,
      licenseUrl: req.body.licenseUrl,
      price: +req.body.price,
      about: req.body.about
    }
    Therapist.create(input)
      .then(data => {
        const { id, fullName, email, photoUrl, birthDate, gender, city, licenseUrl, price, about, status, rating } = data
        res.status(201).json({ id, fullName, email, photoUrl, birthDate, gender, city, licenseUrl, price, about, status, rating })
      })
      .catch(err => {
        next(err)
      }) 
  }
  

  static login (req, res, next) {
    console.log('masuk login')
    let { email, password } = req.body
    Therapist.findOne({
      where: { email }
    })
      .then(data => {
          if (!data) {
              next({ name: 'Invalid Email / Password' })
          } else {
              if (comparePass(password, data.password)) {
                  const { id, fullName, email, photoUrl, birthDate, gender, city, licenseUrl, price, about, status, rating } = data
                  //jwt
                  let payload = {
                      id: data.id,
                      email: data.email
                  }
                  let access_token = loginToken(payload)
                  res.status(200).json({ access_token, data: { id, fullName, email, photoUrl, birthDate, gender, city, licenseUrl, price, about, status, rating } })
              } else {
                  next({ name: 'Invalid Email / Password' })
              }
          }
      })
      .catch(err => {
        next(err)
      })
  }

  static getAll(req, res, next) {
    Therapist.findAll({
      where: { status: true },
      attributes: { exclude: ['password'] }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(err => {
        next(err)
      })
  }

  static updateTherapist (req, res, next) {
    let id = +req.params.id
    let input = {
      fullName: req.body.fullName,
      photoUrl: req.body.photoUrl,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      city: req.body.city,
      licenseUrl: req.body.licenseUrl,
      price: +req.body.price,
      about: req.body.about
    }
    Therapist.update(input, {
      where: { id }
    })
      .then(() => {
        return Therapist.findByPk(id, {
          attributes: { exclude: ['password'] }
        })
      })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static async delete(req,res,next){
    try {
      const data = await Therapist.destroy({
        where : {
          id : req.params.id
        }
      })
      res.status(200).json({ message: "Data has been deleted successfully"})
    } catch (err) {
      next(err)
    }
  }

  static updateStatus(req, res, next) {
    let status = req.body.status
    let id = req.loggedInTherapist.id
    Therapist.update({ status }, { where: { id }})
      .then(() => {
        res.status(200).json({ message: "Successfully updated"})
      })
      .catch(next)
  }

  
  static findHistory(req, res, next) {
    const TherapistId = req.loggedInTherapist.id
    Order.findAll({
      where: {
        TherapistId,
        status: "completed"
      },
      include: {
        model: Client,
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

  static findOnGoing(req, res, next) {
    let TherapistId = req.loggedInTherapist.id
    Order.findAll({
      where: {
        TherapistId, 
        status: "ongoing"
      },
      include: {
        model: Client,
        attributes: {exclude: ["password"] }, required: false 
      }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }

  static changeCompleted (req, res, next) {
    let orderId = +req.params.id
    const input = {
      status: 'completed'
    }
    Order.update(input, {
      where: { id: orderId }
    })
      .then(data => {
        if (data[0] === 1) {
          res.status(200).json({ message: 'Order is completed' })
        } else {
          next({ name: 'Data Not Found'})
        }
      })
      .catch(next)
  }

  static getClients (req, res, next) {
    Client.findAll({
      attributes: { exclude: ['password'] }
    })
      .then(data => {
        res.status(200).json(data)
      })
      .catch(next)
  }
}

module.exports = TherapistController