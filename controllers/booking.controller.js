const Booking = require("../model/booking.model");

// list all the booking
exports.index = async (req, res) => {
  try {
    const bookings = await Booking.find({}).populate("movie_id");
    res.status(200).json(bookings);
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
