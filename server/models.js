let { Movie } = require('../db/connection');
console.log(Movie);

module.exports = {
  getMovie: async (movie) => {
    const data = await Movie.find({});
    console.log(data);
  }
}

module.exports.getMovie();