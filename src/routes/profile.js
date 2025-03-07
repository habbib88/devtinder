const express = require('express');
const profileRouter = express.Router();
const { userAuth } = require("../middleware/auth");

profileRouter.get("/profile/view", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Error retrieving the profile: " + err.message);
  }
});

module.exports = profileRouter;