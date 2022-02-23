const cron = require('node-cron');
const { db, User, Review, Movie, Providers } = require('../db/connection');
const {
  getMediaAPI,
  getMovieProvidersAPI,
  getMovieRecommendationsAPI,
  getPopularMoviesAPI,
  getGenresAPI
} = require('./apiHelpers/movieHelpers');

// sets the popular field to false everyday @ midnight
cron.schedule("0 0 * * *", async () => {
  await Movie.updateMany({ popular: true }, { popular: false });
});

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

    await Promise.all(movies.map(async (movie) => {

      await setMediaGenres(movie, 'movie');

      let filter = { 'id': movie.id };
      let update = {
        mediaType: movie.mediaType,
        title: movie.title,
        rating: movie.rating,
        ratingCount: movie.ratingCount,
        summary: movie.summary,
        release_date: movie.release_date,
        imgUrl: movie.imgUrl,
        genres: movie.genres,
        popular: true
      };
      let options = { new: true, upsert: true };

      try {
        await Movie.findOneAndUpdate(filter, update, options);
      } catch (error) {
        console.log(error);
      }
    }));

    return movies;
  },

  getMediaFromDB: async (media, mediaType) => {
    const mediaData = await Movie
      .find(
        { $text: { $search: media } },
        { score: { $meta: 'textScore' } }
      ).sort(
        { score: { $meta: 'textScore' } }
      );

    if (mediaData.length > 5) {
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

  getMediaDetailsFromDB: async (mediaId, mediaType) => {
    const mediaDetails = await Movie.find({ id: mediaId });
    const providers = await Providers.find({ id: mediaId });

    if (providers.length) {
      console.log('mediaDetails', mediaDetails);
      // console.log('providers', providers.map(p => { p.results}));
    }

    const { results } = await getMovieProvidersAPI(mediaId);å

    let mediaProviders = new Providers({ movieId: mediaId, results: results.US?.flatrate || [] })

    // try {
    //   await mediaProviders.save()
    // } catch (error) {
    //   console.log(error);
    // }

    // let movieDetails = await Movie.aggregate([
    //   {
    //     '$match':  { 'id': mediaId }
    //   },
    //   {
    //     '$lookup' : {
    //       'from': 'providers',
    //       'localField': 'id',
    //       'foreignField': 'movieId',
    //       'as': 'providers'
    //     }
    //   }
    // ]);

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
  }
}

// const deleteDB = async () => {
//   await Movie.deleteMany();
// }

// deleteDB();

//634649 spiderman
//632727 texas chain
// module.exports.getMediaDetailsFromDB(632727);
