const bcrypt = require("bcrypt");
const User = require("../models/User");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        message: "Please provide email and password",
      });
    }
    const user = await User.findOne({ email: email });
    if (!user) {
      return res.status(400).json({
        message: "Sorry, Provided user doesn't exist. Create User",
      });
    }
    let isMatch;
    try {
      isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({
          success: false,
          message: "Sorry, Provided password doesn't match",
        });
      }
      const payload = {
        email: user.email,
        id: user.id,
        role: user.role,
      };

      // Creation of json web token
      const token = jwt.sign(payload, process.env.JWT_KEY, { expiresIn: "2h" });
      user._doc.token = token;
      user.password = undefined;

      //creating cookiesc
      const options = {
        expires: new Date(Date.now() + 3600000),
        httpOnly: true,
      };
      res.cookie("token", token, options).status(200).json({
        success: true,
        token,
        user,
        message: "Sucessfully login",
      });
    } catch (err) {
      return res.status(400).json({
        success: false,
        message: "Sorry,Something went wrong",
      });
    }
  } catch (err) {
    console.log("Something went wrong");
    res.status(500).json({
      success: false,
      message: err.message,
    });
  }
};

exports.signup = async (req, res) => {
  try {
    const { username, password, email, role } = req.body;

    // If user already exist
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User is associated with same username already",
      });
    }

    //Hash password
    let hashedPassword;
    try {
      hashedPassword = await bcrypt.hash(password, 10);
    } catch (err) {
      return res.status(500).json({
        success: false,
        message: "error in hashing password",
      });
    }
    const newUser = await User.create({
      username: username,
      email: email,
      password: hashedPassword,
      role: role,
    });

    res
      .status(200)
      .json({ success: true, message: "User created Sucessfully" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      success: false,
      message: "User cannot be registered try again later",
    });
  }
};
