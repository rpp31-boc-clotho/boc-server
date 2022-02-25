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
router.get('/homepage/media/:mediaType/:id', controllers.getMediaDetails);

// tv page
// router.get('/homepage/tv/:id', controllers.getTVShowDetails);

//user page
router.get('/homepage/user', controllers.getUserDetails);

router.get('/homepage/search/:mediaType', controllers.getSearchedMedia);

//create user
router.post('/homepage/user/create', controllers.postNewUserProfile);

//update user profile subscriptions
router.post('/homepage/user/update', controllers.updateUserSubscriptions);

//update user profile watch history
router.post('/homepage/user/watched', controllers.postUserWatchHistory);

//update user profile watch list
router.post('/homepage/user/watchlist', controllers.postUserWatchList);

//post review
router.post('/homepage/review/create', controllers.createReview);



module.exports = router;