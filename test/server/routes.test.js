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

    expect(res.statusCode).toEqual(200);
    // expect(JSON.parse(res.text)[0]).toMatchObject(movie);
  })

  test('posts new user', async () => {
    function getRandomArbitrary(min, max) {
        return Math.random() * (max - min) + min;
    }

    let randomNumber = getRandomArbitrary(0, 999999999999)

    let randomUser = {
        "username": `test+${randomNumber}@gmail.com`,
        "subscriptions": {
            "Apple iTunes": false,
            "Apple TV Plus": false,
            "Amazon Prime Video": false,
            "Disney Plus": false,
            "Google Play Movies": false,
            "HBO Max": false,
            "Hulu": false,
            "Netflix": false,
            "Paramount Plus": false,
            "Peacock": false,
            "YouTube": false
        },
        "watchHistory": [],
        "_id": "620ddd4f026e8281fd8ab6b5",
        "createdDate": "2022-02-17T05:29:51.583Z",
        "__v": 0
    }


    request(app)
    .post('/homepage/user/create')
    .field('username', `test+${randomNumber}@gmail.com`)
    .expect(response => {
        expect(response.status).toBe(201)
        expect(response.body).toEqual(randomUser)
        done()
    })
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