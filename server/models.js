const cron = require('node-cron');
const { db, User, Review, Movie, TVShow, Providers, Recommendations } = require('../db/connection');
const {
  getMediaAPI,
  getMediaProvidersAPI,
  getMediaRecommendationsAPI,
  getPopularMediaAPI,
  getGenresAPI
} = require('./apiHelpers/mediaHelpers');

// sets the popular field to false everyday @ midnight
cron.schedule("0 0 * * *", async () => {
  await Movie.updateMany({ popular: true }, { popular: false });
});

const getMediaRecommendations = async (mediaId, mediaType) => {
  const mediaRecommendations = await Recommendations.find({ mediaId, mediaType });

  if (mediaRecommendations.length) {
    const { recommendations } = mediaRecommendations[0];
    return recommendations;
  }

  const results = await getMediaRecommendationsAPI(mediaId, mediaType);
  const recommendList = new Recommendations({ mediaId , mediaType, recommendations: results });

  try {
    await recommendList.save();
  } catch (error) {
    console.log(error);
  }

  const { recommendations } = recommendList;
  return recommendations;
};

const setMediaGenres = async (media, mediaType) => {
  const genres = await getGenresAPI(media.id, mediaType);
  media.genres = genres;
};

const setMediaWatchList = async (mediaIdList, mediaType) => {
  const collection = mediaType === 'movie' ? Movie : TVShow;

  const filter = { $match: { id: { $in: mediaIdList }}};
  const watchList = await collection.aggregate([filter]);
  console.log(watchList.length);
  console.log(watchList);
  return watchList;
};

setMediaWatchList([135397, 351286, 417984, 551372, 424139], 'movie');
// setMediaWatchList([60574, 934111, 85552, 2051, 132712], 'tv');

module.exports = {
  getPopularMediaFromDB: async (mediaType) => {
    let collection = mediaType === 'movie' ? Movie : TVShow;

    const popularMediaList = await collection.find({ popular: true }).sort({ rating: -1});

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
    let collection = mediaType === 'movie' ? Movie : TVShow;

    const mediaData = await collection
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
      let movieFound = await collection.find({ id: media.id });

      if (!movieFound.length) {
        await setMediaGenres(media, mediaType);

        let newMedia = new collection(media);

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

  populateMediaListAndRecommendations: async (movieIdList, tvIdList, recommendations = false) => {

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

  updateUserWatchHistory: async (username, watchedType, watchedId) => {
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
      return 'ID already added to ' + watchedType + ' watch history.';
    } else {
      await User.updateOne(
        { username: username },
        { $push: pushObj }
      );

      return await User.find({username: username})
    }
  },

  updateUserWatchList: async (username, watchType, watchId) => {
    let pushObj = {};
    pushObj['watchList' + `.${watchType}`] = watchId;

    let user = await User.find({username: username})
    let added = false;

    user[0].watchList[watchType].forEach((id) => {
      if (id === watchId) {
        added = true;
      }
    })

    if (added) {
      return 'ID already added to ' + watchType + ' watch list.';
    } else {
      await User.updateOne(
        { username: username },
        { $push: pushObj }
      );

      return await User.find({username: username})
    }
  },

  postNewReview: async (review) => {
    let newReview = new Review(review);

    return await newReview.save();
  },

  getContentReviews: async (contentId, contentType) => {
    return await Review.find({
      contentId: contentId,
      contentType: contentType
    });
  }

}

// const deleteDB = async () => {
//   await Movie.deleteMany({ popular: true });
//   await TVShow.deleteMany({ popular: true });
// }

// deleteDB();

// module.exports.getPopularMediaFromDB('tv');
