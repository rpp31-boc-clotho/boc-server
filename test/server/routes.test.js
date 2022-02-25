/**
 * @jest-environment node
 */

const request = require('supertest');
const { app , server } = require('../../server/server');
const { movie, user, homepageResponse, mediaDetailsResponse } = require('../testData/testData');

const baseUrl = 'http://boc-backend-ALB-1007494829.us-east-2.elb.amazonaws.com'

describe("StreamFinder Routes", () => {

  beforeAll(() => {
    const app = require('../../server/server');
  });

  afterAll(() => {
    server.close();
  });

  describe("Homepage Endpoints", () => {
    
    test('responds to /homepage with a status code of 200 and correct data shape', async () => {
      let res = await request(app).get('/homepage');
  
      expect(res.statusCode).toBe(200);
      expect(res.body.movies[0]).toMatchObject({ popular: true });
      expect(res.body.movies).toHaveLength(20);
    })
  
    test('responds to /homepage/search:mediaType with 200 status and a list of searched movies', async () => {
      let searchInfo = {
        mediaType: 'movie',
        search: 'jurrasic park'
      };
  
      let res = await request(app).get(`/homepage/search/${searchInfo.mediaType}?media=${searchInfo.search}`);
  
      expect(res.statusCode).toBe(200);
      // console.log('JURASSIC PARK MOVIES!!', JSON.parse(res.text));
    })
  })

  describe("User Endpoints", () => {

    describe("User Get Endpoints", () => {
      
      test('Returns user profile with 200 status when visiting a user page', async () => {
        let res = await request(app)
          .get('/homepage/user?username=chris.lazzarini+5@gmail.com')
    
        expect(res.status).toBe(200);
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('subscriptions');
        expect(res.body).toHaveProperty('watchHistory');
        expect(res.body).toHaveProperty('createdDate');
        expect(res.body.username).toEqual('chris.lazzarini+5@gmail.com');
      })
    
      test('Returns No User Found if user not in db', async () => {
        let res = await request(app)
          .get('/homepage/user?username=chris.lazzarini+5')
    
        expect(res.status).toBe(200);
        expect(res.body).toEqual('No User Found');
      })

    })
    
    describe("User Post Endpoints", () => {
      describe("Posting A User", () => {
    
        test('Posts A New User', async () => {
          function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
      
          let randomNumber = getRandomInt(0, 9999999)
      
      
          let res = await request(app)
            .post('/homepage/user/create')
            .send({
              username: `test+${randomNumber}@gmail.com`
            })
          
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('username')
          expect(res.body).toHaveProperty('subscriptions')
          expect(res.body).toHaveProperty('watchHistory')
          expect(res.body).toHaveProperty('createdDate')
          expect(res.body.username).toEqual(`test+${randomNumber}@gmail.com`)
              
        })

        test('returns "User Already Exists" with 200 status', async () => {
          let res = await request(app)
            .post('/homepage/user/create')
            .send({
              username: 'chris.lazzarini+5@gmail.com'
            })
      
          expect(res.status).toBe(200);
          expect(res.body.status).toEqual('User Already Exists');
          expect(res.body.userProfile).toHaveProperty('username')
          expect(res.body.userProfile).toHaveProperty('subscriptions')
          expect(res.body.userProfile).toHaveProperty('watchHistory')
          expect(res.body.userProfile).toHaveProperty('createdDate')
          expect(res.body.userProfile.username).toEqual('chris.lazzarini+5@gmail.com');
        })
      })

      describe("Updating User Profile Subscriptions", () => {

        test('Updates existing user\'s subscriptions', async () => {
          let subscriptionReset = {
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
      
          await request(app)
            .post('/homepage/user/update')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              subscriptions: subscriptionReset
          })
      
          let res = await request(app)
            .post('/homepage/user/update')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              subscriptions: subscriptionUpdate
            })
          
          expect(res.status).toBe(201)
          expect(res.body).toHaveProperty('username')
          expect(res.body).toHaveProperty('subscriptions')
          expect(res.body).toHaveProperty('watchHistory')
          expect(res.body).toHaveProperty('createdDate')
          expect(res.body.subscriptions['HBO Max']).toEqual(true)
          expect(res.body.subscriptions['Apple iTunes']).toEqual(false)
          
        })
      
        test('Sends error if subscriptions object is empty', async () => {
      
          let subscriptionUpdate = {}
      
          let res = await request(app)
            .post('/homepage/user/update')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              subscriptions: subscriptionUpdate
            })
      
          
          expect(res.status).toBe(400)
          expect(res.body).toEqual('Data Improperly Formatted')
          
        })
      
        test('Sends error if subscriptions object is not proper length', async () => {
      
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
              "Peacock": false
          }
      
          let res = await request(app)
            .post('/homepage/user/update')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              subscriptions: subscriptionUpdate
            })
      
          
          expect(res.status).toBe(400)
          expect(res.body).toEqual('Data Improperly Formatted')
          
        })
      })
      
      describe("Updating User Profile Watch History Arrays", () => {

        test('Updates user\'s watch history movies\' array when movie watched', async () => {
          function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
      
          let randomNumber = getRandomInt(0, 99999999)
      
          let res = await request(app)
            .post('/homepage/user/watched')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              watchedType: 'movies',
              watchedId: randomNumber
            })
      
          expect(res.status).toBe(201);
          expect(res.body.watchHistory.movies.pop()).toEqual(randomNumber);
        })
      
        test('Updates user\'s watch history shows\' array when show watched', async () => {
          function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
      
          let randomNumber = getRandomInt(0, 99999999)
      
          let res = await request(app)
            .post('/homepage/user/watched')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              watchedType: 'shows',
              watchedId: randomNumber
            })
      
          expect(res.status).toBe(201);
          expect(res.body.watchHistory.shows.pop()).toEqual(randomNumber);
        })
      
        test('Updates user\'s watch history shows\' array fails when data improperly formatted', async () => {
          function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
      
          let randomNumber = getRandomInt(0, 99999999)
      
          let res = await request(app)
            .post('/homepage/user/watched')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              watchedType: 'tvShows',
              watchedId: randomNumber
            })
      
          expect(res.status).toBe(400)
          expect(res.body).toEqual('Data Improperly Formatted')
        })
      
        test('Responds with ID already present if the ID exists in the user\'s watch history array', async () => {
          let res = await request(app)
            .post('/homepage/user/watched')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              watchedType: 'shows',
              watchedId: 123
            })
      
          
          expect(res.status).toBe(200)
          expect(res.body).toEqual('ID already added to shows watch history.')
        })
      })

      describe("Updating user profile watchList endpoint", () => {

        test('Updates user\'s watch list movies\' array when movie added to watch list', async () => {
          function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
      
          let randomNumber = getRandomInt(0, 99999999)
      
          let res = await request(app)
            .post('/homepage/user/watchlist')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              watchType: 'movies',
              watchId: randomNumber
            })
      
          expect(res.status).toBe(201);
          expect(res.body.watchList.movies.pop()).toEqual(randomNumber);
        })
      
        test('Updates user\'s watch list shows\' array when show added to watch list', async () => {
          function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
      
          let randomNumber = getRandomInt(0, 99999999)
      
          let res = await request(app)
            .post('/homepage/user/watchlist')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              watchType: 'shows',
              watchId: randomNumber
            })
      
          expect(res.status).toBe(201);
          expect(res.body.watchList.shows.pop()).toEqual(randomNumber);
        })
      
        test('Updates user\'s watch list shows\' array fails when data improperly formatted', async () => {
          function getRandomInt(min, max) {
              min = Math.ceil(min);
              max = Math.floor(max);
              return Math.floor(Math.random() * (max - min + 1)) + min;
          }
      
          let randomNumber = getRandomInt(0, 99999999)
      
          let res = await request(app)
            .post('/homepage/user/watchlist')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              watchType: 'tvShows',
              watchId: randomNumber
            })
      
          expect(res.status).toBe(400)
          expect(res.body).toEqual('Data Improperly Formatted')
        })
      
        test('Responds with ID already present if the ID exists in the user\'s watch list array', async () => {
          let res = await request(app)
            .post('/homepage/user/watchlist')
            .send({
              username: 'chris.lazzarini+5@gmail.com',
              watchType: 'shows',
              watchId: 123
            })
      
          
          expect(res.status).toBe(200)
          expect(res.body).toEqual('ID already added to shows watch list.')
        })
      })

    })
  })

  describe("Review Endpoints", () => {

    test('Responds with Data Improperly Formatted if object not in the correct shape', async () => {
      let review = {
        username: 'chris.lazzarini+5@gmail.com',
        contentType: 'shows',
        contentId: 999999999,
        recommend: true,
        reviewContent: 'This movie rocked!'
      }

      let res = await request(app)
        .post('/homepage/review/create')
        .send(review)
  
        expect(res.status).toBe(201);
        expect(res.body).toHaveProperty('username');
        expect(res.body).toHaveProperty('contentType');
        expect(res.body).toHaveProperty('contentId');
        expect(res.body).toHaveProperty('recommend');
        expect(res.body).toHaveProperty('reviewContent');
        expect(res.body).toHaveProperty('reported');
        expect(res.body).toHaveProperty('createdDate');
        expect(res.body.reviewContent).toEqual('This movie rocked!');
    })
    
    test('Responds with Data Improperly Formatted if object not in the correct shape', async () => {
      let res = await request(app)
        .post('/homepage/review/create')
        .send({
          username: 'test@gmail.com',
          contentType: 'shows',
          contentId: 123
        })
  
      
      expect(res.status).toBe(400);
      expect(res.body).toEqual('Data Improperly Formatted');
    })
  })

});