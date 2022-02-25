const {
  getPopularMediaFromDB,
  getMediaFromDB,
  getMediaDetailsFromDB,
  getUser,
  postNewUser,
  updateUserSubscriptions,
  updateUserWatched,
  postNewReview
} = require('./models');

module.exports = {

  getHomePageInfo: async (req, res) => {
    try {
      const movies = await getPopularMediaFromDB('movie');
      const shows = await getPopularMediaFromDB('tv');

      res.status(200).send({ movies, shows });
    } catch (error) {
      console.log(error);
    }
  },

  getLoggedInInfo: (req, res) => {

  },

  getUserDetails: (req, res) => {
    let username = req.query.username.replace(' ', '+');

    getUser(username)
    .then((data) => {
      if (data.length !== 0) {
        res.status(200).json(data[0]);
      } else {
        res.status(200).json('No User Found');
      }

    })
    .catch((err) => {console.log(err)})
  },

  getMediaDetails: async (req, res) => {
    const { mediaType, id } = req.params;

    try {
      const data = await getMediaDetailsFromDB(id, mediaType);
      res.status(200).send(data);
    } catch (error) {
      console.log(error);
    }
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
      if (data.status === 'User Already Exists') {
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
    if (subscriptions === undefined || Object.keys(subscriptions).length !== 11) {
      res.status(400).json('Data Improperly Formatted')
    } else {

      for (let subscription in subscriptions) {
        if (subscriptions[subscription] === "true" || subscriptions[subscription] === true) {
          subscriptions[subscription] = true;
        } else {
          subscriptions[subscription] = false;
        }
      }

      updateUserSubscriptions(username, subscriptions)
      .then((data) => {
        if (data.length === 0) {
          data[0] = 'User Not Found'
        }

        res.status(201).json(data[0]);
      })
      .catch((err) => {
        console.log(err)
        res.status(400).json('Data Improperly Formatted')
      })
    }
  },

  updateUserWatchedList: async (req, res) => {
    let username = req.body.username;
    let watchedType = req.body.watchedType;
    let watchedId = typeof req.body.watchedId === 'number' ? req.body.watchedId : parseInt(req.body.watchedId);

    if (watchedType === 'movies' || watchedType === 'shows') {
      updateUserWatched(username, watchedType, watchedId)
      .then((data) => {
        if (typeof data === 'string') {
          res.status(200).json(data);
        } else {
          res.status(201).json(data[0]);
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
