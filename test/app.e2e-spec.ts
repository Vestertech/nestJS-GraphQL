import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from './../src/app.module';
import { DataSource } from 'typeorm';

describe('Graphql Server (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();

    const dataSource = app.get(DataSource);
    await dataSource.synchronize(true);
    await app.init();
  });

  afterAll(async () => {
    const dataSource = app.get(DataSource);
    if (dataSource) {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
    await app.close();
  });

  describe('getUsers', () => {
    it('should query getUsers and return 0 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{getUsers{id username displayName}}' })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(0);
        });
    });

    it('should create a user using createUser mutation', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({
          query:
            'mutation{createUser(createUserData:{username:"sylvester",displayName:"Sylvester"}){username displayName}}',
        })
        .expect(200)
        .expect((res) => {
          expect(res.body.data.createUser).toEqual({
            username: 'sylvester',
            displayName: 'Sylvester',
          });
        });
    });

    it('should query getUsers and return 1 users', () => {
      return request(app.getHttpServer())
        .post('/graphql')
        .send({ query: '{getUsers{id username displayName}}' })
        .expect((res) => {
          expect(res.body.data.getUsers).toHaveLength(1);
        });
    });
  });
});
