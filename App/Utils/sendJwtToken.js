module.exports = (statusCode, user, res) => {
  const token = user.getJwtToken();

  if (user) {
    res.status(statusCode).json({
      success: true,
      token,
      user
    });
  } else {
    res.status(statusCode).json({
      success: true,
      token,
    });
  }
}