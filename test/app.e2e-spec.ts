import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;
  let token: string;
  let userId: string;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  // Ruta 1: Sign Up (POST /auth/singup)
  it('/auth/singup (POST) - should register a new user', () => {
    const userData = {
      email: 'test@example.com',
      password: 'password123@',
      confirmPassword: 'password123@',
      name: 'Test User',
      address: '1234 Elm Street',
      phone: 1234567890,
      country: 'USA',
      city: 'New York'
    };

    return request(app.getHttpServer())
      .post('/auth/singup')
      .send(userData)
      .expect(201)
      .then((response) => {
        expect(response.body.email).toEqual(userData.email);
        userId = response.body.id;
      });
  });

  // Ruta 2: Sign In (POST /auth/singin)
  it('/auth/singin (POST) - should login a user and return a JWT token', () => {
    const loginData = {
      email: 'test@example.com',
      password: 'password123',
    };

    return request(app.getHttpServer())
      .post('/auth/singin')
      .send(loginData)
      .expect(201)
      .then((response) => {
        expect(response.body.succes).toEqual('User logged succesfuly');
        expect(response.body.token).toBeDefined();
        token = response.body.token;
      });
  });

  // Ruta 3: Get User Info (GET /users/:id)
  it('/users/:id (GET) - should get user information', () => {
    return request(app.getHttpServer())
      .get(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body.email).toEqual('test@example.com');
        expect(response.body.name).toEqual('Test User');
      });
  });

  // Ruta 4: Update User Info (PATCH /users/:id)
  it('/users/:id (PATCH) - should update user information', () => {
    const updateData = { name: 'Updated Test User' };

    return request(app.getHttpServer())
      .patch(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updateData)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual('Update succesfuly');
      });
  });

  // Ruta 5: Delete User (DELETE /users/:id)
  it('/users/:id (DELETE) - should delete a user', () => {
    return request(app.getHttpServer())
      .delete(`/users/${userId}`)
      .set('Authorization', `Bearer ${token}`)
      .expect(200)
      .then((response) => {
        expect(response.body).toEqual('Delete succesfuly');
      });
  });
});
