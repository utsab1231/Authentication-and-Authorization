const jwt = require("jsonwebtoken");
require("dotenv").config();
exports.auth = (req, res, next) => {
  try {
    //Extract jwt token
    const token = req.body.token;
    if (!token) {
      return res.status(401).json({
        sucess: false,
        message: "token missing",
      });
    }
    try {
      const decode = jwt.verify(token, process.env.JWT_KEY);
      console.log(decode);
      req.user = decode;
    } catch (error) {
      return res.status(400).json({
        sucess: false,
        message: error.message,
      });
    }
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
  next();
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "Student") {
      return res.status(400).json({
        sucess: false,
        message: "This is protected route for student only",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};

exports.isStudent = (req, res, next) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(400).json({
        sucess: false,
        message: "This is protected route for admin only",
      });
    }
    next();
  } catch (error) {
    return res.status(400).json({
      sucess: false,
      message: error.message,
    });
  }
};
