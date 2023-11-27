const mongoose = require("mongoose");
const { currency, movieGenre } = require("../services/helper");

const movieSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      unique: true,
      required: true,
    },
    slug: {
      type: String,
      unique: true,
      required: true,
    },
    status: {
      type: Boolean,
      default: 1,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      enum: currency,
      default: "CAD",
      required: true,
    },
    rating: {
      type: Number,
      required: true,
    },
    genre: {
      type: String,
      enum: movieGenre,
      required: true,
    },
    director: {
      type: String,
      required: true,
    },
    star_casts: {
      type: String,
      required: true,
    },
    play_time: {
      type: String,
      required: true,
    },
    release_year: {
      type: String,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Movie = mongoose.model("Movie", movieSchema);

module.exports = Movie;
