//const URI = "mongodb+srv://devtinder:mRoBuHrAAXxPYac6@devtinder.yllv8.mongodb.net/"

//pwd:mRoBuHrAAXxPYac6
//user name :devtinder
const mongoose = require('mongoose');
const connectDB = async () => {
    await mongoose.connect("mongodb+srv://devtinder:mRoBuHrAAXxPYac6@tinder.yllv8.mongodb.net/testAdmin");
};
module.exports = connectDB;

