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

//user page
router.get('/homepage/user', controllers.getUserDetails);

router.get('/homepage/search/:mediaType', controllers.getSearchedMedia);


module.exports = router;