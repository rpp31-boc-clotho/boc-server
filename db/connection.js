const mongoose = require('mongoose');

require('dotenv').config({ path:__dirname+'/./../.env' })

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect(`mongodb://${process.env.auth}@${process.env.mongoIp}/streamFinder?authSource=admin`);
}

let db = mongoose.connection;

const UserSchema = new mongoose.Schema({
  username: { type: String, index: true },
  subscriptions:
    {type: Object, default: {
      'Apple iTunes': false,
      'Apple TV Plus': false,
      'Amazon Prime Video': false,
      'Disney Plus': false,
      'Google Play Movies': false,
      'HBO Max': false,
      'Hulu': false,
      'Netflix': false,
      'Paramount Plus': false,
      'Peacock': false,
      'YouTube': false
  }},
  watchHistory: { type: Object, default: {
    shows: [],
    movies: []
  }},
  watchList: { type: Object, default: {
    shows: [],
    movies: []
  }},
  createdDate: { type: Date, default: Date.now }
});

const User = mongoose.model('User', UserSchema);

const ReviewSchema = new mongoose.Schema({
  contentId: { type: Number, index: true },
  contentType: {type: String, index: true},
  username: { type: String, index: true },
  recommend: { type: Boolean, default: false },
  reviewContent: String,
  reported: { type: Boolean, default: false },
  createdDate: { type: Date, default: Date.now }
});

const Review = mongoose.model('Review', ReviewSchema);

const MovieSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  mediaType: String,
  title: { type: String, text: true },
  rating: Number,
  ratingCount: Number,
  summary: { type: String, text: true },
  release_date: String,
  imgUrl: String,
  genres: Array,
  popular: { type: Boolean, default: false }
});


const Movie = mongoose.model('Movie', MovieSchema);

const TvShowSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  mediaType: String,
  title: { type: String, text: true },
  rating: Number,
  ratingCount: Number,
  summary: { type: String, text: true },
  release_date: String,
  imgUrl: String,
  genres: Array,
  popular: { type: Boolean, default: false }
});

const TVShow = mongoose.model('TVShow', TvShowSchema);

const ProvidersSchema = new mongoose.Schema({
  movieId: { type: Number, index: true },
  results: Object
})

const Providers = mongoose.model('Providers', ProvidersSchema)

module.exports = {
  db, User, Review, Movie, TVShow, Providers
};

