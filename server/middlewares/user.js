const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const jwt = require("jsonwebtoken");

exports.isLoggedIn = asyncHandler(async (req, res, next) => {
  const token =
    req.cookies.token || req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Login first to access this page",
    });
  }

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  req.user = await User.findById(decoded.id);

  next();
});
