module.exports = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const message = err.message || 'Something Went Wrong'

  if (err.message === 'invalid signature') {
    res.status(statusCode).json({
      success: false,
      message: 'Invalid Signature On JWT'
    })
  }

  res.status(statusCode).json({
    success: false,
    message
  })
}