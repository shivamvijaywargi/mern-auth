const express = require("express");
const {
  home,
  registerUser,
  loginUser,
  logoutUser,
  getLoggedInUserDetails,
} = require("../controllers/userController");
const { isLoggedIn } = require("../middlewares/user");

const router = express.Router();

router.get("/", home);
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/logout", logoutUser);
router.get("/userDashboard", isLoggedIn, getLoggedInUserDetails);

module.exports = router;
