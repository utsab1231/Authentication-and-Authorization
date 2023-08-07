const mongoose = require("mongoose");
require("dotenv").config();

exports.connectTODB = async () => {
  try {
    mongoose
      .connect(process.env.MongoURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(console.log("Connected to database"));
  } catch (err) {
    console.log("DB connection error");
    console.log(err);
    process.exit(1);
  }
};
