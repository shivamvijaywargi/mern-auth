const sendToken = async (res, user, statusCode = 500) => {
  const token = await user.getJWTToken();

  const options = {
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  };

  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
