const User = require("../models/user");
const asyncHandler = require("../utils/asyncHandler");
const sendToken = require("../utils/sendToken");

exports.home = (req, res) => {
  res.send("Hello World");
};

exports.registerUser = asyncHandler(async (req, res) => {
  console.log(req.body);

  const { firstName, lastName, email, password } = req.body;

  if (password?.length < 8) {
    return res.status(400).json({
      success: false,
      message: "Password must be atleast 8 characters long",
    });
  }

  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required",
    });
  }

  const userExists = await User.findOne({ email });

  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "Email already registered",
    });
  }

  const user = await User.create({ firstName, lastName, email, password });

  user.password = undefined;

  sendToken(res, user, 201);
});

exports.loginUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "All the fields are required",
    });
  }

  const user = await User.findOne({ email }).select("+password");

  if (!user) {
    return res.status(404).json({
      success: false,
      message: "Email and password mismatch or does not exist",
    });
  }

  const isPasswordMatch = await user.isPasswordCorrect(password);

  if (!isPasswordMatch) {
    return res.status(404).json({
      success: false,
      message: "Email and password mismatch or does not exist",
    });
  }

  sendToken(res, user, 200);
});

exports.logoutUser = asyncHandler(async (req, res) => {
  res.status(200).clearCookie("token").json({
    success: true,
    message: "Logged out successfully",
  });
});

exports.getLoggedInUserDetails = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user);

  res.status(200).json({
    success: true,
    user,
  });
});
