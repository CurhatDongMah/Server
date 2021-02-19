const app = require('../app')
const request = require('supertest')
const { clearTherapists, registerTherapist } = require('./helpers/helpers_therapist')

describe('POST /register/therapist', function() {
  afterAll(function(done) {
      clearTherapists()
      .then(data => {
          done()
      })
      .catch(err => {
          console.log(err)
      })
  })
  it('should send response with 201 status code', function(done) {
      //setup
      const body = {
          fullName: 'budi test',
          email: 'tes@mail.com',
          password: 'tes123',
          photoUrl: 'tyusdgtfu',
          birthDate: new Date(),
          gender: 'male',
          city: 'jakarta',
          licenseUrl: 'asad',
          price: 5000,
          status: false,
          about: 'asdasd',
          rating: 0
      }
      //execute
      request(app)
          .post('/register/therapist')
          .send(body)
          .end((err, res) => {
              if (err) done(err)

              //assert
              expect(res.statusCode).toEqual(201)
              expect(typeof res.body).toEqual('object')
              expect(res.body).toHaveProperty('id')
              expect(typeof res.body.id).toEqual('number')
              expect(res.body).toHaveProperty('fullName')
              expect(res.body.fullName).toEqual(body.fullName)
              expect(res.body).toHaveProperty('email')
              expect(res.body.email).toEqual(body.email)
              expect(res.body).toHaveProperty('photoUrl')
              expect(res.body.photoUrl).toEqual(body.photoUrl)
              expect(res.body).toHaveProperty('birthDate')
              expect(res.body.birthDate).toEqual(`${body.birthDate.toISOString()}`)
              expect(res.body).toHaveProperty('gender')
              expect(res.body.gender).toEqual(body.gender)
              expect(res.body).toHaveProperty('city')
              expect(res.body.city).toEqual(body.city)
              expect(res.body).toHaveProperty('licenseUrl')
              expect(res.body.licenseUrl).toEqual(body.licenseUrl)
              expect(res.body).toHaveProperty('price')
              expect(res.body.price).toEqual(body.price)
              expect(res.body).toHaveProperty('status')
              expect(res.body.status).toEqual(body.status)
              expect(res.body).toHaveProperty('about')
              expect(res.body.about).toEqual(body.about)
              expect(res.body).toHaveProperty('rating')
              expect(res.body.rating).toEqual(body.rating)

              done()
          })

  })
  it('should send response with 400 status code', function(done) {
      //setup
      const body = {
          fullName: 'admin',
          email: '',
          password: 'tes123',
          photoUrl: 'tyusdgtfu',
          birthDate: new Date(),
          gender: 'male',
          city: 'jakarta',
          licenseUrl: 'asad',
          price: 5000,
          status: false,
          about: 'asdasd',
          rating: 0
      }
      //execute
      request(app)
          .post('/register/therapist')
          .send(body)
          .end((err, res) => {
              if (err) done(err)

              //assert
              expect(res.statusCode).toEqual(400)
              expect(typeof res.body).toEqual('object')
              expect(res.body).toHaveProperty('message')
              expect(Array.isArray(res.body.message)).toEqual(true)
              expect(res.body.message).toEqual(
                  expect.arrayContaining(['email is required'])
              )

              done()
          })

  })
  it('should send response with 400 status code', function(done) {
      //setup
      const body = {
          fullName: 'admin',
          email: 'tes@mail.com',
          password: '',
          photoUrl: 'tyusdgtfu',
          birthDate: new Date(),
          gender: 'male',
          city: 'jakarta',
          licenseUrl: 'asad',
          price: 5000,
          status: false,
          about: 'asdasd',
          rating: 0
      }
      //execute
      request(app)
          .post('/register/therapist')
          .send(body)
          .end((err, res) => {
              if (err) done(err)

              //assert
              expect(res.statusCode).toEqual(400)
              expect(typeof res.body).toEqual('object')
              expect(res.body).toHaveProperty('message')
              expect(Array.isArray(res.body.message)).toEqual(true)
              expect(res.body.message).toEqual(
                  expect.arrayContaining(['password is required'])
              )

              done()
          })

  })
  it('should send response with 400 status code', function(done) {
      //setup
      const body = {
          fullName: '',
          email: 'tes@mail.com',
          password: 'tes123',
          photoUrl: 'tyusdgtfu',
          birthDate: new Date(),
          gender: 'male',
          city: 'jakarta',
          licenseUrl: 'asad',
          price: 5000,
          status: false,
          about: 'asdasd',
          rating: 0
      }
      //execute
      request(app)
          .post('/register/therapist')
          .send(body)
          .end((err, res) => {
              if (err) done(err)

              //assert
              expect(res.statusCode).toEqual(400)
              expect(typeof res.body).toEqual('object')
              expect(res.body).toHaveProperty('message')
              expect(Array.isArray(res.body.message)).toEqual(true)
              expect(res.body.message).toEqual(
                  expect.arrayContaining(['fullName is required'])
              )

              done()
          })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        fullName: 'budisfsdf',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: '',
        birthDate: new Date(),
        gender: 'male',
        city: 'jakarta',
        licenseUrl: 'asad',
        price: 5000,
        status: false,
        about: 'asdasd',
        rating: 0
    }
    //execute
    request(app)
        .post('/register/therapist')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['photoUrl is required'])
            )

            done()
        })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        fullName: 'budisdfsdf',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: '',
        gender: 'male',
        city: 'jakarta',
        licenseUrl: 'asad',
        price: 5000,
        status: false,
        about: 'asdasd',
        rating: 0
    }
    //execute
    request(app)
        .post('/register/therapist')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['birthDate is required'])
            )

            done()
        })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        fullName: 'asd',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: new Date(),
        gender: '',
        city: 'jakarta',
        licenseUrl: 'asad',
        price: 5000,
        status: false,
        about: 'asdasd',
        rating: 0
    }
    //execute
    request(app)
        .post('/register/therapist')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['gender is required'])
            )

            done()
        })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        fullName: 'budisdfa',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: new Date(),
        gender: 'male',
        city: '',
        licenseUrl: 'asad',
        price: 5000,
        status: false,
        about: 'asdasd',
        rating: 2.3
    }
    //execute
    request(app)
        .post('/register/therapist')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['city is required'])
            )

            done()
        })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        fullName: 'budisdfa',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: new Date(),
        gender: 'male',
        city: 'eins',
        licenseUrl: '',
        price: 5000,
        status: false,
        about: 'asdasd',
        rating: 2.3
    }
    //execute
    request(app)
        .post('/register/therapist')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['licenseUrl is required'])
            )

            done()
        })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        fullName: 'budisdfa',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: new Date(),
        gender: 'male',
        city: 'eins',
        licenseUrl: 'adasd',
        price: -1,
        status: false,
        about: 'asdasd',
        rating: 0
    }
    //execute
    request(app)
        .post('/register/therapist')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['Minimum price is 0'])
            )

            done()
        })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        fullName: 'budisdfa',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: new Date(),
        gender: 'male',
        city: 'eins',
        licenseUrl: 'adasd',
        price: "asd",
        status: false,
        about: 'asdasd',
        rating: 0
    }
    //execute
    request(app)
        .post('/register/therapist')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['Price must be a number'])
            )

            done()
        })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        fullName: 'budisdfa',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: new Date(),
        gender: 'male',
        city: 'eins',
        licenseUrl: 'adasd',
        price: 123333,
        status: false,
        about: '',
        rating: 0
    }
    //execute
    request(app)
        .post('/register/therapist')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['about is required'])
            )

            done()
        })

  })
})

describe('POST /login/therapist', function() {
    beforeAll((done) => {
      registerTherapist()
        .then(data => {
          done()
        })
        .catch(err => {
          console.log(err)
        })
    })
  
    afterAll(function(done) {
      clearTherapists()
      .then(data => {
          done()
      })
      .catch(err => {
          console.log(err)
      })
    })
    it('should send response with 200 status code', function (done){
      let userObj = {
        email: 'tes@mail.com',
        password: 'tes123'
      }
      // Execute
      request(app)
        .post('/login/therapist')
        .send(userObj)
        .end((err, res) => {
            if (err) done(err)
            // Assert
            expect(res.statusCode).toEqual(200)
            expect(res.body).toHaveProperty('access_token')
            expect(typeof res.body.access_token).toEqual('string')
  
            done()
        })
    })
    it('should send response with 400 "Invalid Email/Password"', (done) => {
      //Setup 
      let userObj = {
          email: 'tes@mail.com',
          password: 'password salah'
      }
      // Execute
      request(app)
        .post('/login/therapist')
        .send(userObj)
        .end((err, res) => {
            if(err) done(err)
            // Assert 
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message', 'Invalid Email / Password')
  
            done()
        })
    })
    it('should send response with 400 "Invalid Email/Password"', (done) => {
      //Setup 
      let userObj = {
          email: 'bukanpengguna@mail.com',
          password: 'password salah'
      }
      // Execute
      request(app)
        .post('/login/therapist')
        .send(userObj)
        .end((err, res) => {
            if(err) done(err)
            // Assert 
            expect(res.statusCode).toEqual(400)
            expect(res.body).toHaveProperty('message', 'Invalid Email / Password')
  
            done()
        })
    })
  })