require('dotenv').config()

const axios = require('axios');
const API_KEY = process.env.API_KEY;

module.exports = {
  getTvShows: async (tvShow) => {
    const URL = `https://api.themoviedb.org/3/search/tv?api_key=${API_KEY}&language=en-US&page=1&query=${tvShow}&include_adult=false`;

    try {
      const { data } = await axios.get(URL);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getTvProviders: async (tvId) => {
    const URL = `https://api.themoviedb.org/3/tv/${tvId}/watch/providers?api_key=${API_KEY}`;

    try {
      const { data } = await axios.get(URL);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
  getTvRecommendations: async (tvId) => {
    const URL = `https://api.themoviedb.org/3/tv/${2423}/recommendations?api_key=${API_KEY}&language=en-US&page=1`;

    try {
      const { data } = await axios.get(URL);
      return data;
    } catch (error) {
      console.log(error);
    }
  },
};

