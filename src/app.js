const express = require('express');
const app = express();
const User = require("./models/user");
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");
const { userAuth } = require("./middleware/auth");
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
      const token = await user.getJWT();
      res.cookie("token", token
        , {
          expires: new Date(Date.now() + 8 * 3600000),
        }
      );
      res.send("Login successful");
    }
  } catch (err) {
    res.status(500).send("Error logging in: " + err.message);
  }
});
app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user;
    res.send(user);
  } catch (err) {
    res.status(500).send("Error retrieving the profile: " + err.message);
  }
});
app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + "sending a connection request   ")
})





connectDB()
  .then(() => {
    console.log('database connected   ');
    app.listen(8888, () => {
      console.log('Server is listening on port 8888...');
    });
  }).catch((err) => {
    console.error('database is not connected');
  });


