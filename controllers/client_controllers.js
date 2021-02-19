const Client = require('../models/index')

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

  // static async login(req, res, next) {
  //   console.log('masuk login')
  //   try {
  //       const { email, password } = req.body

  //       const user = await User.findOne({
  //           where: {
  //               email
  //           }
  //       })
  //       if (!user) {
  //           console.log('ga ada email')
  //           next({name: 'Invalid Email / Password'})
  //       } else {
  //           const isValidPass = comparePass(password, user.password)
  //           if (isValidPass) {
  //               const payload = {
  //                   id: user.id,
  //                   email: user.email
  //               }
  //               const access_token = generateToken(payload)
  //               const userData = {
  //                 access_token,
  //                 email: user.email,
  //                 role: user.role
  //               }
  //               return res.status(200).json(userData)
  //           } else {
  //               next({name: 'Invalid Email / Password'})
  //           }
  //       }
  //   } catch (err) {
  //       console.log(err)
  //       next(err)
  //   }
  // }
}

module.exports = { ClientController }