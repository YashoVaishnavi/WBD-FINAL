// userRouter.test.js
const request = require('supertest');
const express = require('express');
const userRouter = require('./userRoute');

const app = express();
app.use(express.json());
app.use('/', userRouter);

describe('User Router', () => {
    it('should register a user', async () => {
      const registrationData = {
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'testpassword',
       
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
      });

  it('should logout a user', async () => {
    const response = await request(app).get('/logout');
    expect(response.statusCode).toBe(200);
  });

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
      .send({ /* provide updated user data */ });
    expect(response.statusCode).toBe(200);
  });

  it('should update user photo', async () => {
    const response = await request(app)
      .patch('/updatePhoto')
      .send({ /* provide updated photo data */ });
    expect(response.statusCode).toBe(200);
  });
});
