/**
 * @jest-environment node
 */

 const request = require('supertest');
 const { app , server } = require('../../server/server');
 const { movie } = require('../testData/movieTestData');


describe("StreamFinder Routes", () => {

  beforeAll(() => {
    const app = require('../../server/server');
  });

  afterAll(() => {
    server.close();
  });

  test('responds to / hello world', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Deployed with ECR and ECS with CI/CD!!');
  });

  test('responds to /homepage with a status code of 200 and correct data shape', async () => {
    const res = await request(app).get('/homepage');

    expect(res.statusCode).toEqual(200);
    expect(JSON.parse(res.text)[0]).toEqual(movie);
  })
});