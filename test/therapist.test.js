const app = require('../app')
const request = require('supertest')
const { clearTherapists, registerTherapist } = require('./helpers/helpers_therapist')
const { Therapist } = require('../models')
const { loginToken } = require('../helpers/jwt')
const { clearClients, registerClient } = require('./helpers/helpers_client') 

let access_token_therapist1
let access_token_therapist2
let id_therapist1
let access_token_client

let therapist1 = {
  fullName: 'hoho',
  email: 'oho@mail.com',
  password: '1234',
  photoUrl: 'tyusdgtfu',
  birthDate: new Date(),
  gender: 'male',
  city: 'jakarta',
  licenseUrl: 'asad',
  price: 5000,
  about: 'asdasd'
}

let therapist2 = {
  fullName: 'meong',
  email: 'meong@mail.com',
  password: '1234',
  photoUrl: 'tyusdgtfu',
  birthDate: new Date(),
  gender: 'male',
  city: 'jakarta',
  licenseUrl: 'asad',
  price: 5000,
  about: 'asdasd'
}

describe('POST /therapist/register', function () {
  afterAll(function (done) {
    clearTherapists()
      .then(data => {
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
  it('should send response with 201 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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
  it('should send response with 400 status code', function (done) {
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
      .post('/therapist/register')
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

describe('POST /therapist/login', function () {
  beforeAll((done) => {
    registerTherapist()
      .then(data => {
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })

  afterAll(function (done) {
    clearTherapists()
      .then(data => {
        done()
      })
      .catch(err => {
        console.log(err)
      })
  })
  it('should send response with 200 status code', function (done) {
    let userObj = {
      email: 'tes@mail.com',
      password: 'tes123'
    }
    // Execute
    request(app)
      .post('/therapist/login')
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
      .post('/therapist/login')
      .send(userObj)
      .end((err, res) => {
        if (err) done(err)
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
      .post('/therapist/login')
      .send(userObj)
      .end((err, res) => {
        if (err) done(err)
        // Assert 
        expect(res.statusCode).toEqual(400)
        expect(res.body).toHaveProperty('message', 'Invalid Email / Password')

        done()
      })
  })
})

describe('PUT /therapist/:id', () => {
  beforeAll((done) => {
    Therapist.create(therapist1)
      .then(res => {
        let payload1 = {
          id: res.id,
          email: res.email
        }
        id_therapist1 = res.id
        access_token_therapist1 = loginToken(payload1)
        // console.log('ini akses token')
        return Therapist.create(therapist2)
      })
      .then(res => {
        let payload = {
          id: res.id,
          email: res.email
        }
        access_token_therapist2 = loginToken(payload)
        // console.log(access_token_therapist2)
        done()
      })
      .catch(err => {
        done(err)
      })
  })

  afterAll((done) => {
    clearTherapists()
      .then(() => {
        done()
      })
      .catch(err => {
        done(err)
      })
  })


  it('should send response with 401 status code', (done) => {
    const updateTherapist = {
      fullName: 'nama baru',
      email: 'tesbaru@mail.com',
      password: '123',
      photoUrl: 'asd',
      birthDate: new Date(),
      gender: 'female',
      city: 'bekasi',
      licenseUrl: 'meong',
      price: 10000,
      status: true,
      about: 'asd',
      rating: 2
    }

    request(app)
      .put(`/therapist/${id_therapist1}`)
      .send(updateTherapist)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message', 'You need to login first')
        done()
      })
  })

  it('should send response with 401 status code', (done) => {
    const updateTherapist = {
      fullName: 'nama baru',
      email: 'tesbaru@mail.com',
      password: '123',
      photoUrl: 'asd',
      birthDate: new Date(),
      gender: 'female',
      city: 'bekasi',
      licenseUrl: 'meong',
      price: 10000,
      status: true,
      about: 'asd',
      rating: 2
    }

    request(app)
      .put(`/therapist/${id_therapist1}`)
      .send(updateTherapist)
      .set('access_token', access_token_therapist2)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(401)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message', 'Unauthorized')
        done()
      })
  })

  it('should send response with 400 status code', (done) => {
    const updateTherapist = {
      fullName: '',
      email: '',
      password: '123',
      photoUrl: 'asd',
      birthDate: '',
      gender: 'female',
      city: 'bekasi',
      licenseUrl: 'meong',
      price: 10000,
      status: true,
      about: 'asd',
      rating: 2
    }

    request(app)
      .put(`/therapist/${id_therapist1}`)
      .send(updateTherapist)
      .set('access_token', access_token_therapist1)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message)).toEqual(true)
        expect(res.body.message).toEqual(
          expect.arrayContaining(['fullName is required', 'email is required', 'birthDate is required'])
        )
        done()
      })
  })


  it('should send response with 400 status code', (done) => {
    const updateTherapist = {
      fullName: 'aku',
      email: '',
      password: '123',
      photoUrl: 'asd',
      birthDate: new Date(),
      gender: '',
      city: 'bekasi',
      licenseUrl: 'meong',
      price: "asdasd",
      status: true,
      about: 'asd',
      rating: 2
    }

    request(app)
      .put(`/therapist/${id_therapist1}`)
      .send(updateTherapist)
      .set('access_token', access_token_therapist1)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message)).toEqual(true)
        expect(res.body.message).toEqual(
          expect.arrayContaining(['email is required', 'gender is required', 'Price must be a number'])
        )
        done()
      })
  })

  it('should send response with 400 status code', (done) => {
    const updateTherapist = {
      fullName: 'aku',
      email: 'asd',
      password: '123',
      photoUrl: 'asd',
      birthDate: new Date(),
      gender: 'asd',
      city: '',
      licenseUrl: '',
      price: -1,
      status: true,
      about: 'asd',
      rating: 2
    }

    request(app)
      .put(`/therapist/${id_therapist1}`)
      .send(updateTherapist)
      .set('access_token', access_token_therapist1)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(400)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message')
        expect(Array.isArray(res.body.message)).toEqual(true)
        expect(res.body.message).toEqual(
          expect.arrayContaining(['city is required', 'licenseUrl is required', 'Minimum price is 0'])
        )
        done()
      })
  })
  it('should send response with 200 status code', (done) => {
    const updateTherapist = {
      fullName: 'nama baru',
      email: 'tesbaru@mail.com',
      password: '123',
      photoUrl: 'asd',
      birthDate: new Date(),
      gender: 'female',
      city: 'bekasi',
      licenseUrl: 'meong',
      price: 10000,
      status: true,
      about: 'asd',
      rating: 2
    }

    request(app)
      .put(`/therapist/${id_therapist1}`)
      .send(updateTherapist)
      .set('access_token', access_token_therapist1)
      .end((err, res) => {
        if (err) done(err)

        expect(res.statusCode).toEqual(200)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('message', 'Successfully updated therapist data')
        done()
      })
  })
})

describe('DELETE/therapist/:id', function() {
  beforeAll(function(done) {
      registerTherapist()
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
      clearTherapists()
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
        .delete(`/therapist/${dummyId}`)
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
        .delete(`/therapist/${dummyId}`)
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
