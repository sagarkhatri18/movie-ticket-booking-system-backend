const Movie = require("../model/movie.model");
const { slugify } = require("../services/helper");

// list all the movies
exports.index = async (req, res) => {
  try {
    const movies = await Movie.find({}).populate('theatre_id');
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// add new movie data
exports.addNewMovie = async (req, res) => {
  const reqParam = req.body;
  await Movie.create({
    title: reqParam.title,
    slug: slugify(reqParam.title),
    status: reqParam.status,
    description: reqParam.description,
    price: reqParam.price,
    currency: reqParam.currency,
    rating: reqParam.rating,
    genre: reqParam.genre,
    director: reqParam.director,
    star_casts: reqParam.star_casts,
    play_time: reqParam.play_time,
    release_year: reqParam.release_year,
    theatre_id: reqParam.theatre_id,
  })
    .then((data) => {
      res
        .status(200)
        .send({ message: "Movie has been successfully added", success: true });
    })
    .catch((error) => {
      res
        .status(400)
        .send({ message: "Failed to add the movie", success: false });
    });
};

// find movie from id
exports.getMovieFromId = async (req, res) => {
  const _id = req.params.id;

  try {
    const movie = await Movie.findOne({ _id });
    if (!movie) {
      return res.status(400).json({
        success: false,
        message: "Sorry no any movie found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Data found",
        data: movie,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// delete movie from id
exports.deleteMovie = async (req, res) => {
  const id = req.params.id;

  try {
    await Movie.deleteOne({ _id: id });
    return res.status(200).json({
      success: true,
      message: "Movie has been successfully deleted",
    });
  } catch {
    return res.status(500).json({
      success: false,
      message: "Failed to delete the selected movie",
    });
  }
};

// update movie from slug
exports.updateMovie = async (req, res) => {
  const _id = req.params.id;
  const reqParam = req.body;

  const updateData = {
    title: reqParam.title,
    slug: slugify(reqParam.title),
    status: reqParam.status,
    description: reqParam.description,
    price: reqParam.price,
    currency: reqParam.currency,
    rating: reqParam.rating,
    genre: reqParam.genre,
    director: reqParam.director,
    star_casts: reqParam.star_casts,
    play_time: reqParam.play_time,
    release_year: reqParam.release_year,
  };

  try {
    await Movie.findOneAndUpdate({ _id: _id }, updateData)
      .exec()
      .then((movie) => {
        return res.status(200).json({
          success: true,
          message: "Movie has been successfully updated",
          data: movie,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Failed to update the selected movie",
        });
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// find movie from LIKE title
exports.searchMovieFromTitle = async (req, res) => {
  try {
    const colName = req.params.title;

    const searchMovies = await Movie.find({
      slug: { $regex: ".*" + colName + ".*" },
    }).populate('theatre_id');
    let foundMoviesLength = searchMovies.length;
    if (foundMoviesLength > 0) {
      res.status(200).json({
        message: "Movies found successfully",
        data: searchMovies,
        length: foundMoviesLength,
      });
    } else {
      res.status(200).json({
        message: "Sorry, no any movie found",
        data: [],
        length: foundMoviesLength,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};
