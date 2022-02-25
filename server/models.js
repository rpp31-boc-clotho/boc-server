const cron = require('node-cron');
const { db, User, Review, Movie, TVShow, Providers } = require('../db/connection');
const {
  getMediaAPI,
  getMediaProvidersAPI,
  getMovieRecommendationsAPI,
  getPopularMediaAPI,
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
  getPopularMediaFromDB: async (mediaType) => {
    let collection = mediaType === 'movie' ? Movie : TVShow;

    const popularMediaList = await collection.find({ popular: true });

    if (popularMediaList.length) {
      return popularMediaList;
    }

    // if movies are not in DB, retrieve from API & save to DB
    const popularMedia = await getPopularMediaAPI(mediaType);

    await Promise.all(popularMedia.map(async (media) => {

      await setMediaGenres(media, mediaType);

      let filter = { 'id': media.id };
      let update = {
        mediaType: media.mediaType,
        title: media.title,
        rating: media.rating,
        ratingCount: media.ratingCount,
        summary: media.summary,
        release_date: media.release_date,
        imgUrl: media.imgUrl,
        genres: media.genres,
        popular: true
      };
      let options = { new: true, upsert: true };

      try {
        await collection.findOneAndUpdate(filter, update, options);
      } catch (error) {
        console.log(error);
      }
    }));

    return popularMedia;
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
    let collection = mediaType === 'movie' ? Movie : TVShow;

    const mediaDetails = await collection.find({ id: mediaId });
    const mediaProviders = await Providers.find({ movieId: mediaId });

    if (mediaProviders.length) {
      return { mediaDetails: mediaDetails[0], providers: mediaProviders[0].results || {} };
    }

    const providers = await getMediaProvidersAPI(mediaType, mediaId);

    let mediaProvidersData = new Providers({ movieId: mediaId, results: providers });

    try {
      await mediaProvidersData.save()
    } catch (error) {
      console.log(error);
    }

    return { mediaDetails: mediaDetails[0], providers: providers };
  },

  getUser: async (username) => {
    return await User.find({username: username});
  },

  postNewUser: async (username) => {
    let userProfile = await User.find({username: username});

    if (userProfile.length !== 0) {
      return {
        status: 'User Already Exists',
        userProfile: userProfile[0]
      };
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
//   await Movie.deleteMany({ popular: true });
//   await TVShow.deleteMany({ popular: true });
// }

// deleteDB();

// module.exports.getPopularMediaFromDB('tv');
