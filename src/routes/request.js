const express = require("express");
const { userAuth } = require("../middlewares/auth");

const requestRouter = express.Router();

requestRouter.post(
  "/request/send/interested/:userId",
  userAuth,
  async (req, res) => {
    const user = req.user;
    console.log("Sending a connection request.");
    res.send(user.firstName + " send the connection request!");
  }
);

module.exports = requestRouter;
