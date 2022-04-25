const admin = require('../Firebase/firebase-config.js');
const ErrorHandler = require('../Utils/Errorhandler.js');

exports.verifyUser = async (req, res, next) => {
  const uid = req.headers.uid;
  try {
    const user = await admin.auth().getUser(uid);
    req.user = user;
    next();
  } catch (error) {
    req.user = null;
    return next(new ErrorHandler('User not Authorized', 403));
  }
}