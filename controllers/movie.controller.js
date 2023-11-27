const Movie = require("../model/movie.model");
const { slugify } = require("../services/helper");

// list all the movies
exports.index = async (req, res) => {
  try {
    const movies = await Movie.find({});
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
  })
    .then((data) => {
      res
        .status(200)
        .send({ message: "Movie has been successfully added", success: true });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .send({ message: "Failed to add the movie", success: false });
    });
};

// find movie from slug
exports.getMovieFromSlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const movie = await Movie.findOne({ slug });
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

// delete movie from slug
exports.deleteMovie = async (req, res) => {
  const slug = req.params.slug;

  try {
    await Movie.findOneAndDelete({ slug: slug })
      .exec()
      .then((movie) => {
        return res.status(200).json({
          success: true,
          message: "Movie has been successfully deleted",
          data: movie,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Something went Wrong",
        });
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
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
