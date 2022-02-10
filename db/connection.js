const mongoose = require('mongoose');
require('dotenv').config({ path:__dirname+'/./../.env' })
console.log(process.env)

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${process.env.auth}@${process.env.mongoIp}/streamFinder?authSource=admin`);

}

const UserSchema = new mongoose.Schema({
  username: { type: String, index: true },
  subscriptions: Array,
  history: Array
});

const User = mongoose.model('User', UserSchema);

const ReviewSchema = new mongoose.Schema({
  username: { type: String, index: true },
  rating: Number,
  content: String,
  date: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);

const MovieSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  title: String,
  mediaType: String,
  recommended: Array,
  summary: String,
  imgUrl: String
});

const Movie = mongoose.model('Movie', MovieSchema);

const TvShowSchema = new mongoose.Schema({
  id: {type: Number, index: true},
  title: String,
  mediaType: String,
  recommended: Array,
  summary: String,
  imgUrl: String
});

const TVShow = mongoose.model('TVShow', TvShowSchema);

const ProvidersSchema = new mongoose.Schema({
  movieId: { type: Number, index: true },
  results: Array
})

const Providers = mongoose.model('Providers', ProvidersSchema)

module.exports = {
  User, Review, Movie
};