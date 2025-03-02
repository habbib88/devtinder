const express = require('express');
const app = express();
const User = require("./models/user");
const connectDB = require("./config/database");
app.use(express.json());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send('user added');
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});
app.get("/user", async (req, res) => {
  try {
    const user = await User.find({ emailId: req.body.emailId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Error retrieving the user: " + err.message);
  }
});
app.delete("/user", async (req, res) => {
  try {
    const user = await User.findByIdAndDelete({ _id: req.body.userId });

    res.send('User deleted ');
  } catch (err) {
    res.status(500).send("Error retrieving the user: " + err.message);
  }
});
app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;
  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data);
    res.send('User updated ');
  } catch (err) {
    res.status(500).send("Error retrieving the user: " + err.message);
  }
});
app.get("/feed", async (req, res) => {
  try {
    const user = await User.find({});
    if (!user) {
      return res.status(404).send("User not found");
    }
    res.send(user);
  } catch (err) {
    res.status(500).send("Error retrieving the user: " + err.message);
  }
});
connectDB()
  .then(() => {
    console.log('db conneted   ');
    app.listen(8888, () => {
      console.log('Server is successfully listening on port 8888...');
    });
  }).catch((err) => {
    console.error('db is not connected');
  });


