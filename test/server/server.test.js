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

  test('responds to / hello world', async () => {
    const res = await request(app).get('/');
    
    expect(res.statusCode).toEqual(200);
    expect(res.text).toEqual('Deployed with ECR and ECS with CI/CD!!');
  });

});