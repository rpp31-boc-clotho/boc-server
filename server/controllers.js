const {
  getPopularMoviesFromDB,
  getMediaFromDB,
  getUser
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
  }

}