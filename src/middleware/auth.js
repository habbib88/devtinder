const jwt = require('jsonwebtoken');
const User = require("../models/user");
userAuth = async (req, res, next) => {

    try {
        const { token } = req.cookies;
        if (!token) {
            throw new Error("Invalid token");
        }
        const docodedObj = await jwt.verify(token, "DEV@TINDER88")
        const { _id } = docodedObj;
        const user = await User.findById(_id);
        if (!user) {
            throw new Error("User not found");
        }
        req.user = user;
        next();
    } catch (err) {
        res.status(400).send("Error" + err.message);
    }

}

module.exports = { userAuth };