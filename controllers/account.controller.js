const bcrypt = require("bcryptjs");
const UserModel = require("../model/user.model");
const { tokenSign } = require("../services/helper");

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // Check if email and password is provided
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email or Password not present",
      });
    }

    // check if the email is valid
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Email or password is invalid",
      });
    }

    // compare the user's password with the one provided from the user from login form
    bcrypt.compare(password, user.password).then(function (result) {
      if (result) {
        const token = tokenSign(user);

        // res.cookie("jwt", token, {
        //   httpOnly: true,
        //   maxAge: maxAge * 1000, // 3hrs in ms
        // });
        return res.status(200).json({
          message: "User successfully Logged in",
          success: true,
          user: user._id,
          role: user.role,
          token: token,
        });
      } else {
        return res
          .status(400)
          .json({ message: "Email or password is invalid" });
      }
    });
  } catch (error) {
    return res.status(400).json({
      message: "An error occurred",
      error: error.message,
    });
  }
};
