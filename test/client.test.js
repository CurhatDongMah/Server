const app = require('../app')
const request = require('supertest')
const { clearClients, registerClient, createOrder, clearOrders } = require('./helpers/helpers_client')
const { registerTherapist, clearTherapists } = require('./helpers/helpers_therapist')
const { loginToken } = require('../helpers/jwt')
const order = require('../models/order')

let dummyId = 1
let access_token = ''
let TherapistId
let orderId = 1

describe('POST/client/register', function() {
  afterAll(function(done) {
      clearClients()
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
          birthDate: new Date('2001-04-01'),
          gender: 'male',
          city: 'jakarta'
      }
      //execute
      request(app)
          .post('/client/register')
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
              expect(res.body.birthDate).toEqual(body.birthDate.toISOString())
              expect(res.body).toHaveProperty('gender')
              expect(res.body.gender).toEqual(body.gender)
              expect(res.body).toHaveProperty('city')
              expect(res.body.city).toEqual(body.city)

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
          birthDate: new Date('2001-04-01'),
          gender: 'male',
          city: 'jakarta'
      }
      //execute
      request(app)
          .post('/client/register')
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
        email: 'salahformatemail',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: new Date('2001-04-01'),
        gender: 'male',
        city: 'jakarta'
    }
    //execute
    request(app)
        .post('/client/register')
        .send(body)
        .end((err, res) => {
            if (err) done(err)

            //assert
            expect(res.statusCode).toEqual(400)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(Array.isArray(res.body.message)).toEqual(true)
            expect(res.body.message).toEqual(
                expect.arrayContaining(['must be an email format'])
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
          birthDate: new Date('2001-04-01'),
          gender: 'male',
          city: 'jakarta'
      }
      //execute
      request(app)
          .post('/client/register')
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
          birthDate: new Date('2001-04-01'),
          gender: 'male',
          city: 'jakarta'
      }
      //execute
      request(app)
          .post('/client/register')
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
        birthDate: new Date('2001-04-01'),
        gender: 'male',
        city: 'jakarta'
    }
    //execute
    request(app)
        .post('/client/register')
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
        city: 'jakarta'
    }
    //execute
    request(app)
        .post('/client/register')
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
        fullName: 'asdas',
        email: 'tes@mail.com',
        password: 'tes123',
        photoUrl: 'tyusdgtfu',
        birthDate: new Date('2001-04-01'),
        gender: '',
        city: 'jakarta'
    }
    //execute
    request(app)
        .post('/client/register')
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
        birthDate: new Date('2001-04-01'),
        gender: 'male',
        city: ''
    }
    //execute
    request(app)
        .post('/client/register')
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

})

describe('POST/client/login', function() {
    beforeAll(function(done) {
        registerClient()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearClients()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 200 status code', function(done) {
        //setup
        const body = {
          email: 'tes@mail.com',
          password: 'tes123',
        }
        //execute
        request(app)
            .post('/client/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('access_token')
                expect(typeof res.body.access_token).toEqual('string')

                done()
            })

    })
    it('1 should send response with 400 status code', function(done) {
        //setup
        const body = {
          email: 'emailNgasal@mail.com',
          password: 'tes123',
        }
        //execute
        request(app)
            .post('/client/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid Email / Password')

                done()
            })

    })
    it('2 should send response with 401 status code', function(done) {
        //setup
        const body = {
          email: 'tes@mail.com',
          password: 'passwordNgasal',
        }
        //execute
        request(app)
            .post('/client/login')
            .send(body)
            .end((err, res) => {
                if (err) done(err)

                //assert
                expect(res.statusCode).toEqual(400)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Invalid Email / Password')

                done()

            })

    })
})

describe('PUT/client/:id', function() {
    beforeAll(function(done) {
        registerClient()
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token = loginToken(payload)
            dummyId = data.id
            // console.log(dummyId, 'ini dummy iddddd')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearClients()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 200 status code', function(done) {
        //setup
        const body = {
            fullName: 'nama hasil edit',
            photoUrl: 'link baru',
            birthDate: new Date('2069-04-01'),
            gender: 'gender baru',
            city: 'kota baru'
        }
        //execute
        request(app)
            .put(`/client/${dummyId}`)
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('fullName')
                expect(res.body.fullName).toEqual(body.fullName)
                expect(res.body).toHaveProperty('photoUrl')
                expect(res.body.photoUrl).toEqual(body.photoUrl)
                expect(res.body).toHaveProperty('birthDate')
                expect(res.body.birthDate).toEqual(body.birthDate.toISOString())
                expect(res.body).toHaveProperty('gender')
                expect(res.body.gender).toEqual(body.gender)
                expect(res.body).toHaveProperty('city')
                expect(res.body.city).toEqual(body.city)
  
                done()
            })
  
    })
    it('should send response with 400 status code', function(done) {
        //setup
        const body = {
            fullName: '',
            email: 'tes@mail.com',
            birthDate: new Date('2001-04-01'),
            gender: 'male',
            city: 'jakarta'
        }
        //execute
        request(app)
            .put(`/client/${dummyId}`)
            .set('access_token', access_token)
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
          birthDate: new Date('2001-04-01'),
          gender: 'male',
          city: 'jakarta'
      }
      //execute
      request(app)
          .put(`/client/${dummyId}`)
          .set('access_token', access_token)
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
          photoUrl: 'tyusdgtfu',
          birthDate: '',
          gender: 'male',
          city: 'jakarta'
      }
      //execute
      request(app)
          .put(`/client/${dummyId}`)
          .set('access_token', access_token)
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
          fullName: 'asdas',
          email: 'tes@mail.com',
          password: 'tes123',
          photoUrl: 'tyusdgtfu',
          birthDate: new Date('2001-04-01'),
          gender: '',
          city: 'jakarta'
      }
      //execute
      request(app)
          .put(`/client/${dummyId}`)
          .set('access_token', access_token)
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
          birthDate: new Date('2001-04-01'),
          gender: 'male',
          city: ''
      }
      //execute
      request(app)
          .put(`/client/${dummyId}`)
          .set('access_token', access_token)
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
    it('should send response with 401 status code', function(done) {
        //setup
        const body = {
            fullName: '',
            email: 'tes@mail.com',
            birthDate: new Date('2001-04-01'),
            gender: 'male',
            city: 'jakarta'
        }
        //execute
        request(app)
            .put(`/client/${dummyId}`)
            .send(body)
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('You need to login first')
  
                done()
            })
  
    })
    it('should send response with 401 status code', function(done) {
        //setup
        const body = {
            fullName: '',
            email: 'tes@mail.com',
            birthDate: new Date('2001-04-01'),
            gender: 'male',
            city: 'jakarta'
        }
        //execute
        request(app)
            .put(`/client/${dummyId}`)
            .set('access_token', 'token ngasal')
            .send(body)
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('You need to login first')
  
                done()
            })
  
    })
  
})

describe('GET/client/history', function() {
    beforeAll(function(done) {
        registerClient()
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token = loginToken(payload)
            dummyId = data.id
            // console.log(dummyId, 'ini dummy iddddd')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearClients()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 200 status code', function(done) {
        //setup
        //execute
        request(app)
            .get(`/client/history`)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
  
                done()
            })
  
    })
    it('should send response with 401 status code', function(done) {
        //setup

        //execute
        request(app)
            .get(`/client/history`)
            .set('access_token', 'token ngasal')
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('You need to login first')
  
                done()
            })
  
    })
})

describe('GET/client/ongoing', function() {
    beforeAll(function(done) {
        registerClient()
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token = loginToken(payload)
            dummyId = data.id
            // console.log(dummyId, 'ini dummy iddddd')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearClients()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 200 status code', function(done) {
        //setup
        //execute
        request(app)
            .get(`/client/ongoing`)
            .set('access_token', access_token)
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
  
                done()
            })
  
    })
    it('should send response with 401 status code', function(done) {
        //setup

        //execute
        request(app)
            .get(`/client/ongoing`)
            .set('access_token', 'token ngasal')
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(401)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('You need to login first')
  
                done()
            })
  
    })
})

describe('DELETE/client/:id', function() {

    beforeAll(function(done) {
        registerClient()
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token = loginToken(payload)
            dummyId = data.id
            // console.log(dummyId, 'ini dummy iddddd')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearClients()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })


    it('should return response 200 with success message', function(done) {
        // Setup
        // Execute
        request(app)
          .delete(`/client/${dummyId}`)
          .set('access_token', access_token)
          .end(function(err, res) {
            if(err) done(err)
  
            // Assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('Data has been deleted successfully')
  
            done()
          })
  
      })

      it('should send response with 401 status code', function(done) {
        // Setup
        // Execute
        request(app)
          .delete(`/client/${dummyId}`)
          .set('access_token', 'token ngasal')
          .end(function(err, res) {
            if(err) done(err)
  
            // Assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('You need to login first')
  
            done()
          })
  
      })
})

describe('GET /client/alltherapists', () => {
    beforeAll(done => {
      registerClient()
        .then(data => {
          let payload = {
            id: data.id,
            email: data.email
          }
          access_token = loginToken(payload)
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    
    afterAll(done => {
      clearClients()
        .then(() => {
          done()
        })
        .catch(err => {
          done(err)
        })
    })
    it('should send response with 200 status code', (done) => {
      request(app)
        .get('/client/alltherapists')
        .set('access_token', access_token)
        .end((err, res) => {
          if (err) done(err)
  
          expect(res.statusCode).toEqual(200)
          expect(Array.isArray(res.body)).toEqual(true)
          done()
        })
    })
  
    it('should send response with 401 status code', (done) => {
      request(app)
        .get('/client/alltherapists')
        .end((err, res) => {
          if (err) done(err)
  
          expect(res.statusCode).toEqual(401)
          expect(typeof res.body).toEqual('object')
          expect(res.body).toHaveProperty('message')
          expect(res.body.message).toEqual('You need to login first')
  
          done()
        })
    })
  })

describe('POST /client/order', () => {
    beforeAll(function(done) {
        registerClient()
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token = loginToken(payload)
            
            // console.log(dummyId, 'ini dummy iddddd')
            return registerTherapist()
        })
        .then(data => {
            TherapistId = data.id
            done()

        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearClients()
        .then(data => {
            return clearTherapists()
        })
        .then(data => {
            return clearOrders()
        })
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })


    it('should return response 201 with success message', function(done) {
        // Setup
        // Execute
        request(app)
          .post(`/client/order`)
          .set('access_token', access_token)
          .send({TherapistId})
          .end(function(err, res) {
            if(err) done(err)
  
            // Assert
            expect(res.statusCode).toEqual(201)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('TherapistId')
            expect(res.body).toHaveProperty('ClientId')
            
  
            done()
          })
  
      })

      it('should send response with 401 status code', function(done) {
        // Setup
        // Execute
        request(app)
          .post(`/client/order`)
          .send({TherapistId})
          .end(function(err, res) {
            if(err) done(err)
  
            // Assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('You need to login first')
  
            done()
          })
  
      })

      it('should send response with 400 status code', function(done) {
        // Setup
        // Execute
        request(app)
          .post(`/client/order`)
          .send({TherapistId: ''})
          .set('access_token', access_token)
          .end(function(err, res) {
            if(err) done(err)
  
            // Assert
            expect(res.statusCode).toEqual(400)
              expect(typeof res.body).toEqual('object')
              expect(res.body).toHaveProperty('message')
              expect(Array.isArray(res.body.message)).toEqual(true)
              expect(res.body.message).toEqual(
                  expect.arrayContaining(['TherapistId is required'])
              )
  
              done()
          })
  
      })
}) 

describe('PATCH /client/order/:id', () => {
    beforeAll(function(done) {
        registerClient()
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token = loginToken(payload)
            dummyId = data.id
            return registerTherapist()
        })
        .then(data => {
            TherapistId = data.id
            return createOrder(TherapistId)
        })
        .then(data => {
            orderId = data.id
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearClients()
        .then(data => {
            return clearTherapists()
        })
        .then(data => {
            return clearOrders()
        })
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    it('should send response with 200 status code', function(done) {
        //setup
        const body = {
            status: 'completed'
        }
        //execute
        request(app)
            .patch(`/client/order/${orderId}`)
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(200)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('id')
                expect(typeof res.body.id).toEqual('number')
                expect(res.body).toHaveProperty('TherapistId')
                expect(res.body.TherapistId).toEqual(TherapistId)
                expect(res.body).toHaveProperty('status')
                expect(res.body.status).toEqual(body.status)
  
                done()
            })
  
    })
    it('should send response with 500 status code', function(done) {
        //setup
        const body = {
            status: 'completed'
        }
        //execute
        request(app)
            .patch(`/client/order/${orderId + 10}`)
            .set('access_token', access_token)
            .send(body)
            .end((err, res) => {
                if (err) done(err)
  
                //assert
                expect(res.statusCode).toEqual(500)
                expect(typeof res.body).toEqual('object')
                expect(res.body).toHaveProperty('message')
                expect(res.body.message).toEqual('Internal Server Error')
  
                done()
            })
  
    })
})

//Delete Order by Id

describe('DELETE/client/order/:id', function() {

    beforeAll(function(done) {
        registerClient()
        .then(data => {
            let payload = {
                id: data.id,
                email: data.email
            }
            access_token = loginToken(payload)
            dummyId = data.id
            // console.log(dummyId, 'ini dummy iddddd')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    afterAll(function(done) {
        clearClients()
        .then(data => {
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })


    it('should return response 200 with success message', function(done) {
        // Setup
        // Execute
        request(app)
          .delete(`/client/order/${dummyId}`)
          .set('access_token', access_token)
          .end(function(err, res) {
            if(err) done(err)
  
            // Assert
            expect(res.statusCode).toEqual(200)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('Data has been deleted successfully')
  
            done()
          })
  
      })

      it('should send response with 401 status code', function(done) {
        // Setup
        // Execute
        request(app)
          .delete(`/client/order/${dummyId}`)
          .set('access_token', 'token ngasal')
          .end(function(err, res) {
            if(err) done(err)
  
            // Assert
            expect(res.statusCode).toEqual(401)
            expect(typeof res.body).toEqual('object')
            expect(res.body).toHaveProperty('message')
            expect(typeof res.body.message).toEqual('string')
            expect(res.body.message).toEqual('You need to login first')
  
            done()
          })
  
      })
})