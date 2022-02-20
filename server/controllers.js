const {
  getPopularMoviesFromDB,
  getMediaFromDB,
  getUser,
  postUser,
  updateUser
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
    console.log('req body', req.body.username);
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

  postUserProfile: async (req, res) => {
    let username = req.body.username;

    postUser(username)
    .then((data) => {
      if (data === 'User Already Exists') {
        res.status(200).json(data);
      } else {
        res.status(201).json(data);
      }
    })
    .catch((err) => {console.log(err)})
  },

  updateUserProfile: async (req, res) => {
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

    updateUser(username, subscriptions)
    .then((data) => {
      res.status(201).json(data);
    })
    .catch((err) => {
      console.log(err)
      res.status(400).json('Data Improperly Formatted')
    })

  }


}