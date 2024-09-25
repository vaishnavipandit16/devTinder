const jwt = require("jsonwebtoken");
const User = require("../models/user");

const userAuth = async (req, res, next) => {
  try {
    const { token } = req.cookies;
    if (!token) {
      throw new Error("Token not valid.");
    }

    const decodedMessage = await jwt.verify(token, "DEV@Tinder$790");

    const { _id } = decodedMessage;

    const user = await User.findById(_id);
    if (!user) {
      throw new Error("User not found.");
    }
    req.user = user;
    next();
  } catch (err) {
    res.status(400).send("ERR: " + err.message);
  }
};

module.exports = { userAuth };
