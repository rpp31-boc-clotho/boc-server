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
  createdDate: { type: Date, default: Date.now }
});

/*
Netflix
Amazon Prime Video
Disney Plus
Google Play Movies
Apple iTunes
Hulu
Paramount Plus
HBO Max
Peacock
Apple TV Plus
YouTube
*/


const User = mongoose.model('User', UserSchema);

const ReviewSchema = new mongoose.Schema({
  username: { type: String, index: true },
  rating: Number,
  content: String,
  date: { type: Date, default: Date.now }
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
  // createdAt: { type: Date, expires: 30}
});


const Movie = mongoose.model('Movie', MovieSchema);

const TvShowSchema = new mongoose.Schema({
  id: { type: Number, index: true },
  title: String,
  mediaType: String,
  recommended: Array,
  summary: String,
  imgUrl: String,
  popular: Boolean
});

const TVShow = mongoose.model('TVShow', TvShowSchema);

const ProvidersSchema = new mongoose.Schema({
  movieId: { type: Number, index: true },
  results: Array
})

const Providers = mongoose.model('Providers', ProvidersSchema)

module.exports = {
  db, User, Review, Movie, Providers
};

