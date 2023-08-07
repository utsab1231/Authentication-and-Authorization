const express = require("express");
const userRoute = require("./routes/user");
require("dotenv").config();
require("./config/database").connectTODB();

const app = express();
app.use(express.json());

app.use("/api/v1", userRoute);
app.listen(process.env.PORT, () => {
  console.log("Server started sucessfully");
});
