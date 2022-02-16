const {
  getPopularMoviesFromDB,
  getMovieFromDB,
  getUser
} = require('./models');

module.exports = {

  getHomePageInfo: async (req, res) => {
    const data = await getPopularMoviesFromDB();
    res.status(200).send({ movies: data, tvShows: [] });
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
  }

}