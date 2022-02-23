const {
  getPopularMoviesFromDB,
  getMediaFromDB,
  getUser,
  postNewUser,
  updateUserSubscriptions,
  updateUserWatched,
  postNewReview
} = require('./models');

module.exports = {

  getHomePageInfo: async (req, res) => {
    try {
      const data = await getPopularMoviesFromDB();
      res.status(200).send({ movies: data, tvShows: [] });
    } catch (error) {
      console.log(error);
    }
  },

  getLoggedInInfo: (req, res) => {

  },

  getUserDetails: (req, res) => {
    let username = req.body.username;

    getUser(username)
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {console.log(err)})
  },

  getMovieDetails: async (req, res) => {

  },

  getTVShowDetails: (req, res) => {

  },

  getSearchedMedia: async (req, res) => {
    const { media } = req.query;
    const { mediaType } = req.params;

    try {
      const data = await getMediaFromDB(media, mediaType);

      res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
  },

  postNewUserProfile: async (req, res) => {
    let username = req.body.username;

    postNewUser(username)
    .then((data) => {
      if (data === 'User Already Exists') {
        res.status(200).json(data);
      } else {
        res.status(201).json(data);
      }
    })
    .catch((err) => {console.log(err)})
  },

  updateUserSubscriptions: async (req, res) => {
    let username = req.body.username;
    let subscriptions = req.body.subscriptions;
    if (subscriptions === undefined) {
      res.status(400).json('Data Improperly Formatted')
    }

    for (let subscription in subscriptions) {
      if (subscriptions[subscription] === "true") {
        subscriptions[subscription] = true;
      } else {
        subscriptions[subscription] = false;
      }
    }

    updateUserSubscriptions(username, subscriptions)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json('Data Improperly Formatted')
    })

  },

  updateUserWatchedList: async (req, res) => {
    let username = req.body.username;
    let watchedType = req.body.watchedType;
    let watchedId = parseInt(req.body.watchedId);

    console.log('watchedType:', watchedType);
    console.log('watchedId:', watchedId);

    if (watchedType === 'movies' || watchedType === 'shows') {
      updateUserWatched(username, watchedType, watchedId)
      .then((data) => {
        if (typeof data === 'string') {
          res.status(200).json(data);
        } else {
          res.status(201).json(data);
        }
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json('Data Improperly Formatted')
      })
    } else {
      res.status(400).json('Data Improperly Formatted');
    }
  },

  createReview: async (req, res) => {
    let contentId = parseInt(req.body.review.contentId);
    let contentType = req.body.review.contentType;
    
    console.log('contentId: ', contentId);

    postNewReview(contentId, contentType, review)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json('Data Improperly Formatted')
    })
  }
}