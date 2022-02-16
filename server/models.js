const { Movie, User } = require('../db/connection');
const mongoose = require('mongoose');

module.exports = {
  getMovie: async (movie) => {
    const data = await Movie.find({});
    console.log(data);
  },

  getUser: async (username) => {
    return await User.find({username: username});
  }

}