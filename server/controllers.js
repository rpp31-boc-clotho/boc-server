const {
  getPopularMoviesFromDB,
  getMovieFromDB
} = require('./models');

module.exports = {
  getHomePageInfo: async (req, res) => {
    const data = await getPopularMoviesFromDB();
    res.status(200).send(data);
  },
  getLoggedInInfo: (req, res) => {

  },
  getMovieDetails: async (req, res) => {

  },
  getTVShowDetails: (req, res) => {

  },
  getUserDetails: (req, res) => {

  },
  getSearchedMedia: async (req, res) => {
    const { mediaString, mediaType } = req.query;
    const data = await getMovieFromDB(mediaString, mediaType);
    res.status(200).send(data);
  }
}