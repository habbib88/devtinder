// const { default: mongoose } = require("mongoose")

const  mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    firstName:{
        type:String
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
module.exports = mongoose.model("User",userSchema);