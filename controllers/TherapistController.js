const { Therapist }  = require('../models')
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
                  //jwt
                  let payload = {
                      id: data.id,
                      email: data.email
                  }
                  let access_token = loginToken(payload)
                  res.status(200).json({ access_token })
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
      where: { status: true }
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
      email: req.body.email,
      password: req.body.password,
      photoUrl: req.body.photoUrl,
      birthDate: req.body.birthDate,
      gender: req.body.gender,
      city: req.body.city,
      licenseUrl: req.body.licenseUrl,
      price: +req.body.price,
      about: req.body.about,
      rating: +req.body.rating,
      status: req.body.status
    }
    Therapist.update(input, {
      where: { id }
    })
      .then(() => {
        res.status(200).json({ message: 'Successfully updated therapist data' })
      })
      .catch(next)
  }

}

module.exports = TherapistController