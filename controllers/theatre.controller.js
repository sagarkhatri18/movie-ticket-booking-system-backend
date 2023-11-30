const Theatre = require("../model/theatre.model");
const { slugify } = require("../services/helper");

// list all the theatres
exports.index = async (req, res) => {
  try {
    const theatres = await Theatre.find({});
    res.status(200).json(theatres);
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// add new theatre data
exports.addNewTheatre = async (req, res) => {
  const reqParam = req.body;
  await Theatre.create({
    title: reqParam.title,
    slug: slugify(reqParam.title),
    status: reqParam.status,
    seat_capacity: reqParam.seat_capacity,
    no_of_rows: reqParam.no_of_rows,
    seats_in_each_row: reqParam.seats_in_each_row,
  })
    .then((data) => {
      res.status(200).send({
        message: "Theatre has been successfully added",
        success: true,
      });
    })
    .catch((error) => {
      console.log(error);
      res
        .status(400)
        .send({ message: "Failed to add the theatre", success: false });
    });
};

// find theatre from slug
exports.getTheatreFromSlug = async (req, res) => {
  const slug = req.params.slug;

  try {
    const theatre = await Theatre.findOne({ slug });
    if (!theatre) {
      return res.status(400).json({
        success: false,
        message: "Sorry no any theatre found",
      });
    } else {
      return res.status(200).json({
        success: true,
        message: "Data found",
        data: theatre,
      });
    }
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// delete theatre from slug
exports.deleteTheatre = async (req, res) => {
  const slug = req.params.slug;

  try {
    await Theatre.findOneAndDelete({ slug: slug }).exec();
    return res.status(200).json({
      success: true,
      message: "Theatre has been successfully deleted",
    });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};

// update theatre from slug
exports.updateTheatre = async (req, res) => {
  const _id = req.params.id;
  const reqParam = req.body;

  const updateData = {
    title: reqParam.title,
    slug: slugify(reqParam.title),
    status: reqParam.status,
    seat_capacity: reqParam.seat_capacity,
    no_of_rows: reqParam.no_of_rows,
    seats_in_each_row: reqParam.seats_in_each_row,
  };

  try {
    await Theatre.findOneAndUpdate({ _id: _id }, updateData)
      .exec()
      .then((theatre) => {
        return res.status(200).json({
          success: true,
          message: "Theatre has been successfully updated",
          data: theatre,
        });
      })
      .catch((err) => {
        res.status(500).send({
          success: false,
          message: "Failed to update the selected theatre",
        });
      });
  } catch (error) {
    res.status(500).send({
      success: false,
      message: "Something went Wrong",
    });
  }
};
