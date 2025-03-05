const express = require('express');
const authRouter = express.Router();
const { validateSignUpData } = require("../utils/validation");
const User = require("../models/user");

authRouter.post("/signup", async (req, res) => {
    const user = new User(req.body);
    try {
        //validating the data 
        validateSignUpData(req);
        await user.save();
        res.send('user added');
    } catch (err) {
        res.status(400).send("Error saving the user" + err.message);
    }
});
authRouter.post("/login", async (req, res) => {
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
authRouter.post("/logout",async (req,res) =>{
    res.cookie("token", null
        , {
            expires: new Date(Date.now()  ),
        }
    );
    res.send("Logout successful");
})
module.exports = authRouter;