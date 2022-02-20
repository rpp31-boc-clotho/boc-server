/**
 * @jest-environment node
 */

const request = require('supertest');
const { app , server } = require('../../server/server');
const { movie, user, homepageResponse } = require('../testData/testData');

const baseUrl = 'http://jsonplaceholder.com'

describe("StreamFinder Routes", () => {

  beforeAll(() => {
    const app = require('../../server/server');
  });

  afterAll(() => {
    server.close();
  });

  test('responds to /homepage with a status code of 200 and correct data shape', async () => {
    const res = await request(baseUrl).get('/homepage');

    expect(res.statusCode).toBe(200);
    expect(homepageResponse.movies[0]).toMatchObject(movie);
    expect(movies).toHaveLength(20);
    // expect(movies[0]).toContain('popular');
  })

  test('responds to /homepage/search:mediaType with 200 status and a list of searched movies', async () => {
    let searchInfo = {
      mediaType: 'movie',
      search: 'jurrasic park'
    };

    const res = await request(app).get(`/homepage/search/${searchInfo.mediaType}?media=${searchInfo.search}`);

    expect(res.statusCode).toBe(200);
    // console.log('JURASSIC PARK MOVIES!!', JSON.parse(res.text));
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


    request(baseUrl)
    .post('/homepage/user/create')
    .field('username', `test+${randomNumber}@gmail.com`)
    .expect(response => {
        expect(response.status).toBe(201)
        expect(response.body).toEqual(randomUser)
        done()
    })
  })

  test('Updates existing user\'s subscriptions', async () => {
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

    let subscriptionUpdate = {
        "Apple iTunes": false,
        "Apple TV Plus": false,
        "Amazon Prime Video": false,
        "Disney Plus": false,
        "Google Play Movies": false,
        "HBO Max": true,
        "Hulu": false,
        "Netflix": false,
        "Paramount Plus": false,
        "Peacock": false,
        "YouTube": false
    }

    let randomUserUpdated = {
        "username": `test+${randomNumber}@gmail.com`,
        "subscriptions": subscriptionUpdate,
        "watchHistory": [],
        "_id": "620ddd4f026e8281fd8ab6b5",
        "createdDate": "2022-02-17T05:29:51.583Z",
        "__v": 0
    }

    request(baseUrl)
    .post('/homepage/user/create/update')
    .field('username', `test+${randomNumber}@gmail.com`)
    .field('subscriptions', `${subscriptionUpdate}`)
    .expect(response => {
        expect(response.status).toBe(201)
        expect(response.body).toEqual(randomUser)
        done()
    })
  })

  test('Sends error if data improper format', async () => {
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

    let subscriptionUpdate = {}

    request(baseUrl)
    .post('/homepage/user/create/update')
    .field('username', `test+${randomNumber}@gmail.com`)
    .field('subscriptions', `${subscriptionUpdate}`)
    .expect(response => {
        expect(response.status).toBe(400)
        expect(response.body).toEqual('Data Improperly Formatted')
        done()
    })
  })

  test('returns "User Already Exists" with 200 status', async () => {
    request(baseUrl)
    .post('/homepage/user/create')
    .field('username', 'chris.lazzarini@gmail.com')
    .expect(response => {
        expect(response.status).toBe(200)
        expect(response.body).toEqual('User Already Exists')
        done()
    })
  })

  test('returns user when visiting a profile page with 200 status', async () => {
    request(baseUrl)
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