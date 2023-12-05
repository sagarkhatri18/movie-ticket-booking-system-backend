const Booking = require("../model/booking.model");

// list all the booking
exports.index = async (req, res) => {
  try {
    const bookings = await Booking.find({})
      .populate({
        path: "movie_id",
        populate: { path: "theatre_id" },
      })
      .sort({ created_at: "descending" });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// find particular booking details
exports.getBookingFromId = async (req, res) => {
  const _id = req.params.id;

  try {
    const booking = await Booking.findOne({ _id }).populate({
      path: "movie_id",
      populate: { path: "theatre_id" },
    });
    if (!booking) {
      return res.status(400).json({
        success: false,
        message: "Sorry no any booking found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Data found",
        data: booking,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// add new booking data
exports.addNewBooking = async (req, res) => {
  const reqParam = req.body;
  await Booking.create({
    name: reqParam.name,
    status: reqParam.status,
    email: reqParam.email,
    contact: reqParam.contact,
    booking_date: reqParam.booking_date,
    quantity: reqParam.quantity,
    selected_seats: reqParam.selected_seats,
    sub_total: reqParam.sub_total,
    tax: reqParam.tax,
    total: reqParam.total,
    movie_id: reqParam.movie_id,
  })
    .then((data) => {
      res
        .status(200)
        .json({ message: "Booking has been successfully made", success: true });
    })
    .catch((error) => {
      res
        .status(400)
        .json({ message: "Failed to made the booking", success: false });
    });
};

// make status inactive
exports.markAsInactive = async (req, res) => {
  const _id = req.params.id;
  try {
    await Booking.findOneAndUpdate({ _id: _id }, { status: false })
      .exec()
      .then((booking) => {
        return res.status(200).json({
          success: true,
          message: "Booking has been succesfully cancelled",
          data: booking,
        });
      })
      .catch((err) => {
        return res.status(500).json({
          success: false,
          message: "Failed to cancel the selected booking",
        });
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// get booked seats from date and movie_id
exports.getBookedSeats = async (req, res) => {
  const reqParam = req.body;
  let bookedDate = reqParam.booking_date;
  let movieId = reqParam.movie_id;

  try {
    const bookings = await Booking.find({
      movie_id: movieId,
      booking_date: bookedDate,
      status: true,
    }).select("selected_seats");
    let seatsArray = [];
    bookings.map((data) => {
      seatsArray = seatsArray.concat(data.selected_seats);
    });

    seatsArray = seatsArray.map(Number);
    return res.status(200).json({
      success: true,
      message: "Success",
      data: seatsArray,
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};
