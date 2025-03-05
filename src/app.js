const express = require('express');
const app = express();
const cookieParser = require("cookie-parser");
const connectDB = require("./config/database");

app.use(express.json());
app.use(cookieParser());

const authRouter = require("./routes/auth");
const profileRouter = require("./routes/profile");
const requestRouter = require("./routes/request");

app.use("/", authRouter)
app.use("/", profileRouter)
app.use("/", requestRouter)

connectDB()
  .then(() => {
    console.log('database connection estalished...   ');
    app.listen(8888, () => {
      console.log('Server is listening on port 8888...');
    });
  }).catch((err) => {
    console.error('database is not connected');
  });


