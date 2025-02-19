const app = require('../app')
const request = require('supertest')
const { clearClients, registerClient } = require('./helpers/helpers_client')
const { registerTherapist1, clearTherapists } = require('./helpers/helpers_therapist')
const { loginToken } = require('../helpers/jwt')

let ClientId = 1
let access_token = ''
let TherapistId = 1

describe('POST/client/review', function() {
  beforeAll(function(done) {
    registerClient()
      .then(data => {
        let payload = {
          id: data.id,
          email: data.email
        }
        access_token = loginToken(payload)
        ClientId = data.id
        return registerTherapist1()
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
          done()
      })
      .catch(err => {
          console.log(err)
      })
  })
  it('should send response with 201 status code', function(done) {
    //setup
    const body = {
        TherapistId,
        rating: 5,
        review: 'balallnsdkjfl'
    }
    //execute
    request(app)
      .post(`/client/review`)
      .set('access_token', access_token)
      .send(body)
      .end((err, res) => {
        if (err) done(err)

        //assert
        expect(res.statusCode).toEqual(201)
        expect(typeof res.body).toEqual('object')
        expect(res.body).toHaveProperty('id')
        expect(typeof res.body.id).toEqual('number')
        expect(res.body).toHaveProperty('ClientId')
        expect(res.body.ClientId).toEqual(ClientId)
        expect(res.body).toHaveProperty('TherapistId')
        expect(res.body.TherapistId).toEqual(body.TherapistId)
        expect(res.body).toHaveProperty('rating')
        expect(res.body.rating).toEqual(body.rating)
        expect(res.body).toHaveProperty('review')
        expect(res.body.review).toEqual(body.review)

        done()
      })

  })

  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        TherapistId,
        rating: 0,
        review: 'balallnsdkjfl'
    }
    //execute
    request(app)
      .post(`/client/review`)
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
                  expect.arrayContaining(['the minimum value is 1'])
              )

        done()
      })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        TherapistId,
        rating: 6,
        review: 'balallnsdkjfl'
    }
    //execute
    request(app)
      .post(`/client/review`)
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
                  expect.arrayContaining(['the maximum value is 5'])
              )

        done()
      })

  })
  it('should send response with 400 status code', function(done) {
    //setup
    const body = {
        TherapistId,
        rating: 4,
        review: ''
    }
    //execute
    request(app)
      .post(`/client/review`)
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
                  expect.arrayContaining(['review is required'])
              )

        done()
      })

  })
})

describe('GET/client/review/:id', function() {
  beforeAll(function(done) {
    registerClient()
      .then(data => {
        let payload = {
          id: data.id,
          email: data.email
        }
        access_token = loginToken(payload)
        ClientId = data.id
        return registerTherapist1()
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
          done()
      })
      .catch(err => {
          console.log(err)
      })
  })

  it('should send response with 200 status code', (done) => {
    request(app)
      .get(`/client/review/${TherapistId}`)
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
      .get(`/client/review/${TherapistId}`)
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