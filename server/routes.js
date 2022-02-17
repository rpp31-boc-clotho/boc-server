const express = require('express');
const router = express.Router();
const path = require('path');
const controllers = require('./controllers.js');


router.get('/', async (req, res) => {
  res.send('Server Responding')
});

router.get('/homepage', controllers.getHomePageInfo);

// recommendations & watch list
router.get('/homepage/loggedIn', controllers.getLoggedInInfo);

// movie page
router.get('/homepage/movie/:id', controllers.getMovieDetails);

// tv page
router.get('/homepage/tv/:id', controllers.getTVShowDetails);

// // tv page
// router.get('/homepage/tv/:id', controllers.getTvDetails);

//user page
router.get('/homepage/user', controllers.getUserDetails);

//create user
router.post('/homepage/user/create', controllers.postUserProfile);

// router.get('homepage/search/tv/:searchString, controllers.searchMedia);

// router.get('homepage/search/movie/:searchString, controllers.searchMedia);
router.get('/homepage/search/media', controllers.getSearchedMedia);


module.exports = router;