require('dotenv').config({ path:__dirname+'/./../../.env'})
// console.log(process.env);

const axios = require('axios');
// const API_KEY = process.env.API_KEY;

module.exports = {
  getTvShows: async (tvShow) => {
    const URL = `https://api.themoviedb.org/3/search/tv?api_key=${process.env.apikey}&language=en-US&page=1&query=${tvShow}&include_adult=false`;

    try {
      const { data } = await axios.get(URL);

      console.log(data);
    } catch (error) {
      console.log(error);
    }
  },
  getTvProviders: async (tvId) => {
    const URL = `https://api.themoviedb.org/3/tv/${tvId}/watch/providers?api_key=${process.env.apikey}`;

    try {
      const { data } = await axios.get(URL);

      let TVShowProviders = {
        TVShowId: data.id,
        results: data.results.US
      };

      return TVShowProviders;

    } catch (error) {
      console.log(error);
    }
  },
  getTvRecommendations: async (tvId) => {
    const URL = `https://api.themoviedb.org/3/tv/${2423}/recommendations?api_key=${process.env.API_KEY}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(URL);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getPopularTvShows: async () => {
    const URL =  `https://api.themoviedb.org/3/tv/popular?api_key=${process.env.apikey}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(URL);
      console.log(data);
      let topTenTvShows = data.results
        .map((tv, i) => {
          if (i <= 9) {
            return {
              id: tv.id,
              mediaType: 'TV',
              title: tv.name,
              rating: tv.vote_average,
              ratingCount: tv.vote_count,
              summary: tv.overview,
              imgUrl: `https://www.thetvdb.org/t/p/w1280${tv.poster_path}`
            }
          }
        }).filter(tv => tv !== undefined);

      console.log(topTenTvShows)
    } catch (error) {
      console.log(error);
    }
  }
};

module.exports.getTvProviders(42343);