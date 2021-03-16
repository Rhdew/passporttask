const User = require("../models/userRegistration");
const bcrypt = require("bcrypt");

const userLogin = async (req, res) => {
  try {
    let username = req.body.username;
    let password = req.body.password;
    const user = await User.findOne({ userName: username });
    if (!user) {
      throw "user not found";
    }
    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      throw "not a valid password";
    }

    res.json({
      error: 0,
      message: "successfully login",
      data: [
        {
          token: accessToken,
          userId: user._id,
        },
      ],
    });
  } catch (error) {
    res.json({
      err: 1,
      message: error.message,
      error,
    });
  }
};

module.exports = userLogin;
