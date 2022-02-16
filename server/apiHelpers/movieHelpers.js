require('dotenv').config({ path:__dirname+'/./../../.env' })

const axios = require('axios');

const transformMovieList = (movieList) => {
 let list = movieList
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

  return list;
}

module.exports = {
  getMovieAPI: async (movie) => {
    const URL = `https://api.themoviedb.org/3/search/movie?api_key=${process.env.apikey}&language=en-US&query=${movie}&page=1&include_adult=false`;

    try {
      const { data } = await axios.get(URL);

      let movies = transformMovieList(data.results);
      return movies;

    } catch (error) {
      console.log(error);
    }
  },
  getMovieProvidersAPI: async (movieId) => {
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/watch/providers?api_key=${process.env.apikey}`;

    try {
      const { data } = await axios.get(URL);

      let movieProviders = {
        movieId: data.id,
        results: data.results.US
      };

      return movieProviders;

    } catch (error) {
      console.log(error);
    }
  },
  getMovieRecommendationsAPI: async(movieId) => {
    const URL = `https://api.themoviedb.org/3/movie/${movieId}/recommendations?api_key=${process.env.apikey}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(URL);

      let recommendations = transformMovieList(data.results);
      return recommendations;

    } catch (error) {
      console.log(error);
    }
  },
  getPopularMoviesAPI: async() => {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apikey}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(URL);

      let topTenMovies = transformMovieList(data.results);
      return topTenMovies;

    } catch (error) {
      console.log(error);
    }
  }
};

module.exports.getMovieRecommendationsAPI(568124);