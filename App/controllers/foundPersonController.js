const FoundPerson = require("../models/foundPersonModel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");
const { cloundinary } = require("../Utils/cloudinary.js");
const ErrorHandler = require("../Utils/Errorhandler.js");

exports.createfoundPerson = catchAsyncError(async (req, res, next) => {
  const {
    name,
    photo,
    address,
    phone
  } = req.body;

  cloundinary.uploader.upload(photo, async (err, result) => {
    if (err) return next(new ErrorHandler(err.message, 400));
    const foundPerson = await FoundPerson.create({
      name,
      photo: result.secure_url,
      address,
      phone
    });

    res.status(201).json({
      success: true,
      foundPerson
    });
  }
  );
})

exports.getAllFoundPerson = catchAsyncError(async (req, res, next) => {
  const foundPersons = await FoundPerson.find();
  res.status(200).json({
    success: true,
    foundPersons
  });
})
