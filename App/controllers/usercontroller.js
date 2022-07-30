const User = require("../models/usermodel.js");
const ErrorHandler = require("../Utils/Errorhandler.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");
const sendJwtToken = require("../Utils/sendJwtToken.js");
const crypto = require("crypto");
const { cloundinary } = require("../Utils/cloudinary.js");

// exports.registerUser = catchAsyncError(async (req, res, next) => {
//   const { name, email, password } = req.body;
//   if (await User.findOne({ email }))
//     return next(new ErrorHandler("Email already exists", 400));

//   const { _id } = await User.create({
//     name,
//     email,
//     password,
//   });

//   const user = await User.findById(_id);
//   sendJwtToken(200, user, res);
// });

// exports.login = catchAsyncError(async (req, res, next) => {
//   const { email, password } = req.body;
//   const user = await User.findOne({ email }).select("+password");
//   console.log(user);

//   if (!user) return next(new ErrorHandler("Invalid email or password", 400));

//   const isValid = await user.validatePassword(password);

//   const fetchUser = await User.findById(user._id);

//   if (isValid) {
//     sendJwtToken(200, fetchUser, res);
//   } else {
//     next(new ErrorHandler("Invalid email or password", 400));
//   }
// });

// exports.forgetPassword = catchAsyncError(async (req, res, next) => {
//   const { email } = req.body;
//   const user = await User.findOne({ email });

//   if (!user) return next(new ErrorHandler("User Not Found", 400));

//   const resetToken = user.getPasswordResetToken();

//   await user.save({ validateBeforeSave: false });
//   res.status(200).json({
//     success: true,
//     resetToken,
//   });
// });

// exports.resetPassword = catchAsyncError(async (req, res, next) => {
//   const { token } = req.params;
//   const { password } = req.body;

//   if (!token) return next(new ErrorHandler("Token Not Valid", 400));

//   const passwordResetToken = crypto
//     .createHash("sha256")
//     .update(token)
//     .digest("hex");

//   const user = await User.findOne({ passwordResetToken });
//   if (!user) return next(new ErrorHandler("Token Not Valid", 400));

//   user.password = password;
//   user.passwordResetToken = null;
//   user.passwordResetTokenExpires = null;

//   await user.save({ validateBeforeSave: false });

//   sendJwtToken(200, user, res);
// });

// exports.updateBio = catchAsyncError(async (req, res, next) => {
//   const { bio } = req.body;
//   const user = await User.findByIdAndUpdate(
//     req.user,
//     { bio },
//     { new: true, runValidators: true }
//   );

//   res.status(200).json({
//     success: true,
//     user,
//   });
// });

exports.updateProfilePicture = catchAsyncError(async (req, res, next) => {
  const { profilePicture } = req.body;
  console.log(profilePicture);

  const image = await cloundinary.uploader.upload(
    profilePicture,
    {
      folder: "profile-pictures",
      use_filename: true,
    },
    async (error, result) => {
      if (error) return next(new ErrorHandler("Error Uploading Image", 400));
    }
  );

  console.log(image);

  const user = await User.findOneAndUpdate(
    { email: req.body.email },
    { profilePicture: image.secure_url }
  );

  const updatedUser = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("User Not Found", 400));
  res.status(200).json({
    success: true,
    user: updatedUser,
  });
});

// exports.singleUser = catchAsyncError(async (req, res, next) => {
//   const { id } = req.params;
//   const user = await User.findById(id);
//   if (!user && !id) return next(new ErrorHandler('User Not Found', 400));

//   const post = await Posts.find({ user: id });
//   res.status(200).json({
//     success: true,
//     user,
//     post
//   });
// })

exports.loadUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user) return next(new ErrorHandler("User Not Found", 400));

  res.status(200).json({
    success: true,
    user,
  });
});

exports.storeUserInfo = catchAsyncError(async (req, res, next) => {
  const { name, email } = req.body;

  const user = await User.create({
    name,
    email,
  });

  res.status(200).json({
    success: true,
    user,
  });
});

exports.updateUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findOneAndUpdate({ email: req.body.email }, req.body);

  res.status(200).json({
    success: true,
    user,
  });
});
