import request from 'supertest'
import app from '../server.js'

describe('POST /accounts', function() {
    it('valid input 1', function (done) {
        request(app)
        .post('/accounts')
        .send({
            balance: 100,
            name: 'checking'
        })
        .expect(201, {id: 0}, done)
    })

    it('valid input 2', function(done) {
        request(app)
        .post('/accounts')
        .send({
            balance: 200,
            name: 'savings'
        })
        .expect(201, {id: 1}, done)
    })
})

describe('GET /accounts', function() {
    it('valid input 3', function(done) {
        request(app)
        .get('/accounts')
        .expect(200, [{balance: 100, name: 'checking'},
                      {balance: 200, name: 'savings'}
                    ]
        , done)
    })
})

describe('PUT /accounts', function() {
    it('valid input 4', function(done) {
        request(app)
        .put('/accounts/0')
        .send({
            balance: 300,
            name: 'savings'
        })
        .expect(200, {balance: 300, name: 'savings'}
        , done)
    })
})

describe('GET /accounts', function() {
    it('valid input 5', function(done) {
        request(app)
        .get('/accounts')
        .expect(200, [{balance: 300, name: 'savings'},
                      {balance: 200, name: 'savings'}
                    ]
        , done)
    })
})

describe("DELETE", function() {
    it('valid input 6', function(done) {
        request(app)
        .delete('/accounts/0')
        .expect(204, done)
    })
})

describe('GET /accounts', function() {
    it('valid input 7', function(done) {
        request(app)
        .get('/accounts')
        .expect(200, [{balance: 200, name: 'savings'}]
        , done)
    })
})