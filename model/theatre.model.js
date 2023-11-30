const mongoose = require("mongoose");

const theatreSchema = new mongoose.Schema(
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
    seat_capacity: {
      type: Number,
      required: true,
    },
    no_of_rows: {
      type: Number,
      required: true,
    },
    seats_in_each_row: {
      type: Number,
      required: true,
    },
  },
  { timestamps: { createdAt: "created_at", updatedAt: "updated_at" } }
);

const Theatre = mongoose.model("Theatre", theatreSchema);

module.exports = Theatre;
