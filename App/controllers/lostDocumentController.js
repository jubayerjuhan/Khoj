const LostDocument = require("../models/lostdocumentModel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");
const { cloundinary } = require("../Utils/cloudinary.js");
const ErrorHandler = require("../Utils/Errorhandler.js");

exports.createLostDocument = catchAsyncError(async (req, res, next) => {
  const {
    name,
    documentType,
    photo,
    documentNumber,
    address,
    phone,
    nidNo,
    gdNo
  } = req.body;

  cloundinary.uploader.upload(photo, async (err, result) => {
    if (err) next(new ErrorHandler(err.message, 400));

    const lostDocument = await LostDocument.create({
      name,
      photo: result.secure_url,
      documentType,
      documentNumber,
      address,
      phone,
      nidNo,
      gdNo
    });

    res.status(201).json({
      success: true,
      lostDocument
    });
  });
})


// get lost document
exports.getAllLostDocument = catchAsyncError(async (req, res, next) => {
  const lostDocuments = await LostDocument.find();

  res.status(200).json({
    success: true,
    lostDocuments
  });

})