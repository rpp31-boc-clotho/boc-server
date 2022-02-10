require('dotenv').config({ path:__dirname+'/./../../.env' })

const axios = require('axios');
// const API_KEY = process.env.API_KEY;


module.exports = {
  getMovieAPI: async (movie) => {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apikey}&language=en-US&query=${movie}&page=1&include_adult=false`;

    try {
      const { data } = await axios.get(URL);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getMovieProvidersAPI: async (movieId) => {
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.apikey}`;

    try {
      const { data } = await axios.get(URL);
      // console.log(data.results.US);
      let movieProviders = {
        movieId: data.id,
        results: data.results.US
      }

      return movieProviders;
    } catch (error) {
      console.log(error);
    }
  },
  getMovieRecommendations: async(movieId) => {
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(URL);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
  getPopularMoviesAPI: async() => {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.API_KEY}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(URL);

      let topTenMovies = data.results
        .map((movie, i) => {
          if (i <= 9) {
            return {
              id: movie.id,
              mediaType: 'Movie',
              title: movie.title,
              rating: movie.vote_average,
              ratingCount: movie.vote_count,
              summary: movie.overview,
              imgUrl: `https://www.themoviedb.org/t/p/w1280${movie.poster_path}`
            }
          }
        }).filter(movie => movie !== undefined);

      return topTenMovies;

    } catch (error) {
      console.log(error);
    }
  }
};

module.exports.getMovieProvidersAPI(550);