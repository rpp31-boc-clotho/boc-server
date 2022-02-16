/**
 * @jest-environment node
 */

 const request = require('supertest');
 const { app , server } = require('../../server/server');


describe("StreamFinder Routes", () => {

  beforeAll(() => {
    const app = require('../../server/server');
  });

  afterAll(() => {
    server.close();
  });

  test('server is deployed', async () => {
    const res = await request(app).get('/');

    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Server Responding');
  });

});