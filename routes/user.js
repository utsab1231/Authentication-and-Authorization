const express = require("express");
const router = express.Router();
const { login, signup } = require("../controllers/Auth");
const { auth, isStudent, isAdmin } = require("../middleware/auth");

router.post("/login", login);
router.post("/signup", signup);
router.get("/", () => {
  console.log("This is default route");
});

//Protected routes using middlewares
router.get("/student", auth, isStudent, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to protected student route",
  });
});
router.get("/admin", auth, isAdmin, (req, res) => {
  res.json({
    success: true,
    message: "Welcome to protected student route",
  });
});

module.exports = router;
