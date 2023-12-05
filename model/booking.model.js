const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      unique: true,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    contact: {
      type: Number,
      required: true,
    },
    status: {
      type: Boolean,
      default: true,
      required: true,
    },
    booking_date: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    selected_seats: {
      type: Array,
      required: true,
    },
    sub_total: {
      type: Number,
      required: true,
    },
    tax: {
      type: Number,
      required: true,
    },
    total: {
      type: Number,
      required: true,
    },
    movie_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Movie",
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Booking = mongoose.model("Booking", bookingSchema);

module.exports = Booking;
