/**
 * @jest-environment node
 */

 const request = require('supertest');
 const { app , server } = require('../../server/server');
 const { movie, user } = require('../testData/testData');


describe("StreamFinder Routes", () => {

  beforeAll(() => {
    const app = require('../../server/server');
  });

  afterAll(() => {
    server.close();
  });

  test('responds to /homepage with a status code of 200 and correct data shape', async () => {
    const res = await request(app).get('/homepage');

    let { movies } = JSON.parse(res.text);
    expect(res.statusCode).toBe(200);
    expect(movies[0]).toMatchObject(movie);
  })

  test('returns user when visiting a profile page with 200 status', async () => {
    request(app)
    .get('/homepage/user')
    .field('username', 'chris.lazzarini@gmail.com')
    .expect(response => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual({user})
        done()
    })
  })
});

// supertest(app)
//   .get("/form-data")
//   .field("name", "John Doe")
//   .field("age", "25")
//   .expect(response => {
//     expect(response.status).toBe(200)
//     expect(response.body).toEqual({ name: "John Doe", age: "24" })
//     done()
//   })