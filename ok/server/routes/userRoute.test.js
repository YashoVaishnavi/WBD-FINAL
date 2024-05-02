// userRouter.test.js
const request = require('supertest');
const express = require('express');
const userRouter = require('./userRoute');

const app = express();
app.use(express.json());
app.use('/', userRouter);
let server;
beforeAll(()=>{
  server=app.listen(5000)
})
afterAll(done=>{
  server.close(done);
})
describe('User Router', () => {
    it('should register a user', async () => {
      const registrationData = {
        name: 'testuser',
        phonenumber: '1234567890',
        role:'Customer',
        photo:'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UTeqYruTd8M_yxIdyI3u1D0ydjy7dZ_bJUjo1Vg&s.png',
        email: 'testuser@example.com',
        password: 'testpassword',
        address:'Andhra Pradesh',
        state:'Andhra Pradesh',
        pincode:'123455'
       
      };
    const response = await request(app)
        .post('/register')
        .send(registrationData);
      expect(response.statusCode).toBe(200);
    });

  it('should login a user', async () => {
        const loginData = {
          email: 'testuser@example.com',
          password: 'testpassword',
        };
    
        const response = await request(app)
          .post('/login')
          .send(loginData);
        expect(response.statusCode).toBe(200);
        process.exit()
      });

  it('should logout a user', async () => {
    const response = await request(app).get('/logout');
    expect(response.statusCode).toBe(200);
  },10000);

  it('should get user details', async () => {
    const response = await request(app).get('/getuser');
    expect(response.statusCode).toBe(200);
  });

  it('should get login status', async () => {
    const response = await request(app).get('/getLoginStatus');
    expect(response.statusCode).toBe(200);
  });

  it('should update user information', async () => {
    const response = await request(app)
      .patch('/updateUser')
      .send({ phoneNumber: "1234567891" }); 
    expect(response.statusCode).toBe(200);
    
  });
  

  // it('should update user photo', async () => {
  //   const response = await request(app)
  //     .patch('/updatePhoto')
  //     .send({photoUrl:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ5UTeqYruTd8M_yxIdyI3u1D0ydjy7dZ_bJUjo1Vg&s.png"});
  //   expect(response.statusCode).toBe(200);
   
  // });
});
