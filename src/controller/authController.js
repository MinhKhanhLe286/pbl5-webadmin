const { json } = require("body-parser");
const User = require("../model/userModel");
const bcrypt = require("bcrypt");

const authController = {
    // Register [POST]/authentication/register
    registerUser: async (req, res) => {
        try {
            const salt = await bcrypt.genSalt(10);
            const hash = await bcrypt.hash(req.body.password, salt);

            const newUser = new User({
                username: req.body.username,
                email: req.body.email,
                password: hash
            });
            // Save
            const user = await newUser.save();
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    },

    loginUser: async (req, res) => {
        try {
            const user = await User.findOne({
                username: req.body.username
            });
            if (!user) {
                return res.status(404).json("Wrong user!");
            }
            const validPass = await bcrypt.compare(req.body.password, user.password);
            if (!validPass) {
                return res.status(404).json("Wrong password");
            }
            res.status(200).json(user);
        } catch (error) {
            res.status(500).json(error);
        }
    }
};

module.exports = authController;
