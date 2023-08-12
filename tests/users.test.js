const supertest =require('supertest')

const app = require('../app')
const { mongo, default: mongoose } = require('mongoose')
const User = require('../models/User')

const api = supertest(app)

beforeAll(async () => {
    await User.deleteMany({})
})


test('user registration', async() =>{
    await api.post('/users/register')
        .send({
            username : "testUser1",
            password: "test123",
            fullname: "Test User",
            email: "test@gmail.com"
        })
        .expect(201)
        // console.log(res.body)
        expect(res.body.username).toBe("testUser1")
})

test('registration of duplicate username',() =>{
    return api.post('/users/register')
    .send({
            username : "testUser1",
            password: "test123",
            fullname: "Test User",
            email: "test@gmail.com"

    }).expect(400)
    .then((res) => { 
        //console.log(res.body)

        expect(res.body.console.error).toMatch(/duplicate/)
    })
})

test('registered user can login', async () =>{
    await api.post('/users/login')
    .send({
        username : "testUser1",
        password: "test123",
        

    }).expect(200)
    expect(res.body.token).toBeDefined()

})

test('user login with unregistered username',() =>{
    expect()

})

afterAll(async () => await mongoose.connection.close())