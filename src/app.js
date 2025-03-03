const express = require('express');
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const jwt = require("jsonwebtoken");
app.use(express.json());
app.use(cookieParser());
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  try {
    await user.save();
    res.send('user added');
  } catch (err) {
    res.status(400).send("Error saving the user" + err.message);
  }
});
app.post("/login", async (req, res) => {
  try {
    const { emailId, password } = req.body;
    const user = await User.findOne({ emailId });
    if (!user) {
      return res.status(404).send("User not found");
    }
    if (user.password !== password) {
      return res.status(400).send("Invalid credentials");
    }
    if (user.password === password) {
      const token = await jwt.sign({_id:user._id},"DEV@TINDER88");
      res.cookie("token", token);
      res.send("Login successful");
    }
  } catch (err) {
    res.status(500).send("Error logging in: " + err.message);
  }
});
app.get("/profile", async (req, res) => {
  try {
    const cookie = req.cookies; //get cookie
    const {token} = cookie; 
    //validate the token  and decode it
    const decodedMessage = await jwt.verify(token, "DEV@TINDER88");
    const { _id } = decodedMessage;
    const user = await User.findById(_id);
    res.send(user);
  } catch (err) {
    res.status(500).send("Error retrieving the profile: " + err.message);
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


