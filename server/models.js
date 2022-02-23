const moment = require('moment');
moment().format();

const { db, User, Review, Movie } = require('../db/connection');
const {
  getMediaAPI,
  getMovieProvidersAPI,
  getMovieRecommendationsAPI,
  getPopularMoviesAPI,
  getGenresAPI
} = require('./apiHelpers/movieHelpers');

const setMovieRecommendations = async (movie) => {
  const results = await getMovieRecommendationsAPI(movie.id);
  movie.recommended = results;
}

const setMediaGenres = async (media, mediaType) => {
  const genres = await getGenresAPI(media.id, mediaType);
  media.genres = genres;
}

module.exports = {
  getPopularMoviesFromDB: async () => {
    const popularMovies = await Movie.find({ popular: true });

    if (popularMovies.length) {
      return popularMovies;
    }

    // if movies are not in DB, retrieve from API & save to DB
    const movies = await getPopularMoviesAPI();

    // reset the expiration time to the ttl index on createdAt
    await db.db.command({
      collMod: 'movies',
      index: {keyPattern: {createdAt: 1}, expireAfterSeconds: moment().endOf('day').diff(moment(), 'seconds')}
    });

    await Promise.all(movies.map(async (movie) => {
      movie.popular = true;
      movie.createdAt = new Date();

      await setMediaGenres(movie, 'movie');

      let newMovie = new Movie(movie);

      try {
        await newMovie.save();
      } catch (error) {
        console.log(error);
      }
    }));

    return movies;
  },
  getMediaFromDB: async (media, mediaType) => {
    // media = media.replace(/-/g, '');
    // let regex = new RegExp(media, 'i');
    // const mediaData = await Movie.find({ "title" : regex });
    //console.log(media, mediaType);

    const mediaData = await Movie
      .find(
        { $text: { $search: media } },
        { score: { $meta: 'textScore' } }
      ).sort(
        { score: { $meta: 'textScore' } }
      );

    if (mediaData.length > 1) {
      //console.log('found in DB');
      return mediaData;
    }

    //if movie not found in DB, retrieve from API
    const mediaList = await getMediaAPI(media, mediaType);

    await Promise.all(mediaList.map(async (media) => {
      // check if movie is already in DB, before saving
      let movieFound = await Movie.find({ id: media.id });

      if (!movieFound.length) {
        await setMediaGenres(media, mediaType);

        let newMedia = new Movie(media);

        try {
          await newMedia.save();
        } catch (error) {
          console.log(error);
        }
      }

    }));

    return mediaList;
  },

  getUser: async (username) => {
    return await User.find({username: username});
  },

  postNewUser: async (username) => {
    let checkCurrentUser = await User.find({username: username});

    if (checkCurrentUser.length !== 0) {
      return 'User Already Exists';
    } else {
      let user = new User({username: username});
      return await user.save();
    }
  },

  updateUserSubscriptions: async (username, subscriptions) => {
    await User.bulkWrite([
      {
        updateOne: {
          filter: { username: username },
          // If you were using the MongoDB driver directly, you'd need to do
          // `update: { $set: { title: ... } }` but mongoose adds $set for
          // you.
          update: { $set: { subscriptions: subscriptions } }
        }
      }
    ])

    return await User.find({username: username})
  },

  updateUserWatched: async (username, watchedType, watchedId) => {
    let pushObj = {};
    pushObj['watchHistory' + `.${watchedType}`] = watchedId;

    let user = await User.find({username: username})
    let added = false;

    user[0].watchHistory[watchedType].forEach((id) => {
      if (id === watchedId) {
        added = true;
      }
    })
    
    if (added) {
      return 'ID already added to ' + watchedType + ' watch list.';
    } else {
      await User.updateOne(
        { username: username }, 
        { $push: pushObj }
      );
  
      return await User.find({username: username})
    }
  },

  postNewReview: async (contentId, contentType, review) => {
    let checkCurrentUser = await User.find({username: username});

    if (checkCurrentUser.length !== 0) {
      return 'User Already Exists';
    } else {
      let user = new User({username: username});
      return await user.save();
    }
  }

}

// const deleteDB = async () => {
//   await Movie.deleteMany();
// }

// deleteDB();


