// const { default: mongoose } = require("mongoose")
const jwt = require('jsonwebtoken');
const  mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type: String,
        required: true,
        minLength: 4,
        maxLength: 50,
    },
    lastName:{
        type:String
    },
    emailId:{
        type:String
    },
    password:{
        type:String
    },
    age: {
        type: Number
    },
    gender: {
        type: String
    },
    about: {
        type: String,
        default: "No information provided"
    },
    skills: {
        type: [String],
        default:['reactjs','js','next js','node js']
    },
    photoUrl: {
        type: String,
        default:"‪C://Users/hamidi/Pictures/9.jpg"
    },
   
}, {
    timestamps: true,
});
userSchema.methods.getJWT = async function () {
    const user = this;
    const token =   await jwt.sign({ _id: user._id }, "DEV@TINDER88", { expiresIn: "40m" });
    return token;
}
module.exports = mongoose.model("User",userSchema);