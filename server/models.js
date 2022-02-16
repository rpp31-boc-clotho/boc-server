let { User, Review, Movie } = require('../db/connection');
const {
  getMovieAPI,
  getMovieProvidersAPI,
  getMovieRecommendationsAPI,
  getPopularMoviesAPI
} = require('./apiHelpers/movieHelpers');

const setMovieRecommendations = async (movie) => {
  const results = await getMovieRecommendationsAPI(movie.id);
  movie.recommended = results;
}

module.exports = {
  getPopularMoviesFromDB: async () => {
    const popularMovies = await Movie.find({ popular: true });

    if (popularMovies.length) {
      return popularMovies;
    }

    // if popular movies not found in DB, retrieve from API
    const movies = await getPopularMoviesAPI();

    await Promise.all(movies.map(async (movie) => {
      // transform movie data
      movie.popular = true;
      await setMovieRecommendations(movie);

      let newMovie = new Movie(movie);

      try {
        await newMovie.save();
      } catch (error) {
        console.log(error);
      }
    }));

    return movies;
  },
  getMovieFromDB: async (movie) => {
    const movieData = await getMovieAPI(movie);

    if (movieData.length) {
      return movieData;
    }

    // if movie not found in DB, retrieve from API
    const movieDetails = await getMovieAPI(movie);
    await setMovieRecommendations(movie);

    let newMovie = new Movie(movieDetails);

    try {
      await newMovie.save();
    } catch (error) {
      console.log(error);
    }

  }
}

// const deleteDB = async () => {
//   await Movie.deleteMany();
// }

// deleteDB();
