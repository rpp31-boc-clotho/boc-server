const moment = require('moment');
moment().format();

const cron = require('node-cron');
const { db, User, Review, Movie } = require('../db/connection');
const {
  getMediaAPI,
  getMovieProvidersAPI,
  getMovieRecommendationsAPI,
  getPopularMoviesAPI,
  getGenresAPI
} = require('./apiHelpers/movieHelpers');

cron.schedule("0 0 * * * *", async () => {
  const popularMovies = await Movie.find({ popular: true });

  await Promise.all(popularMovies.map(async (movie) => {
    let query = { 'id': movie.id };
    let update = { 'popular': false };

    try {
      await Movie.findOneAndUpdate(query, update)
    } catch (error) {
      console.log(error);
    }
  }));
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

    // reset the expiration time to the ttl index on createdAt
    /*
    await db.db.command({
      collMod: 'movies',
      index: {keyPattern: {createdAt: 1}, expireAfterSeconds: moment().endOf('day').diff(moment(), 'seconds')}
    });
    */

    await Promise.all(movies.map(async (movie) => {
      // movie.popular = true;
      // movie.createdAt = new Date();

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

      // // let newMovie = new Movie(movie);

      try {
        await Movie.findOneAndUpdate(filter, update, options);
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
    console.log(media, mediaType);

    const mediaData = await Movie
      .find(
        { $text: { $search: media } },
        { score: { $meta: 'textScore' } }
      ).sort(
        { score: { $meta: 'textScore' } }
      );

    if (mediaData.length > 5) {
      console.log('found in DB');
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
    const mediaDetais = await Movie.find({ id: mediaId });

  },

  getUser: async (username) => {
    return await User.find({username: username});
  },

  postUser: async (username) => {
    let checkCurrentUser = await User.find({username: username});
    console.log(checkCurrentUser);

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


