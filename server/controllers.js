const {
  getPopularMoviesFromDB,
  getMovieFromDB,
  getUser,
  postUser
} = require('./models');

module.exports = {

  getHomePageInfo: async (req, res) => {
    const data = await getPopularMoviesFromDB();
    res.status(200).send(data);
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
    const { mediaString, mediaType } = req.query;
    const data = await getMovieFromDB(mediaString, mediaType);
    res.status(200).send(data);
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


  }

}