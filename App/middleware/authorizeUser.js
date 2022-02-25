const ErrorHandler = require("../Utils/Errorhandler.js");
const jwt = require('jsonwebtoken')
const User = require('../models/usermodel.js')


exports.authorizeUser = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) return next(new ErrorHandler('User Not Valid', 400));

  const token = authHeader.split(' ')[1];
  const user = jwt.verify(token, process.env.JWTSECRET)
  req.user = user.id;
  next();
}

exports.authorizeAdmin = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return next(new ErrorHandler('User Not Valid', 400));

  const token = authHeader.split(' ')[1];
  const user = jwt.verify(token, process.env.JWTSECRET)
  const dbUser = await User.findById(user.id);
  if (dbUser.role !== 'admin') return next(new ErrorHandler('User Not Valid', 400));

  req.user = user.id;
  next();
}