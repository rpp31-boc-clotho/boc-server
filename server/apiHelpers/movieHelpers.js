require('dotenv').config({ path:__dirname+'/./../../.env' })

const axios = require('axios');

const transformMovieList = (mediaList, mediaType) => {
  let list = mediaList
      .map((media, i) => {
        if (i < 20) {
          return {
            id: media.id,
            mediaType: mediaType,
            title: media.title || media.name,
            rating: media.vote_average,
            ratingCount: media.vote_count,
            summary: media.overview,
            release_date: media.release_date,
            imgUrl: `https://www.themoviedb.org/t/p/w1280${media.poster_path}`
          }
        }
      }).filter(movie => movie !== undefined);

    return list;
}

module.exports = {
  getMediaAPI: async (media, mediaType) => {
    const URL = `https://api.themoviedb.org/3/search/${mediaType}?api_key=${process.env.apikey}&language=en-US&query=${media}&page=1&include_adult=false`;

    try {
      const { data } = await axios.get(URL);
      let movies = transformMovieList(data.results, mediaType);
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

      let recommendations = transformMovieList(data.results, 'movie');
      return recommendations;

    } catch (error) {
      console.log(error);
    }
  },
  getPopularMoviesAPI: async () => {
    const URL = `https://api.themoviedb.org/3/movie/popular?api_key=${process.env.apikey}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(URL);

      let topTenMovies = transformMovieList(data.results, 'movie');
      return topTenMovies;

    } catch (error) {
      console.log(error);
    }
  },
  getGenresAPI: async (movieId, mediaType) => {
    const URL = `https://api.themoviedb.org/3/${mediaType}/${movieId}?api_key=${process.env.apikey}&language=en-US`;

    try {
      const { data } = await axios.get(URL);
      const genres = data.genres.map(genre => genre.name);
      return genres;
    } catch (error) {
      console.log(error);
    }
  }
};

// module.exports.getGenresAPI(634649, 'movie');