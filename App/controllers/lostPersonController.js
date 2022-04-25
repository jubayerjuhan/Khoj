const catchAsyncError = require("../Utils/catchAsyncError.js");
const LostPerson = require("../models/lostpersonModel.js");
const { cloundinary } = require("../Utils/cloudinary.js");
const ErrorHandler = require("../Utils/Errorhandler.js");

exports.createLostPerson = catchAsyncError(async (req, res, next) => {
  const {
    name,
    photo,
    address,
    returnAddress,
    phone,
    nidNo,
    relation,
    gdNo,
    caption
  } = req.body;

  cloundinary.uploader.upload(photo, async (err, result) => {
    console.log(result, err);
    if (err) return next(new ErrorHandler(err.message, 400));
    const lostPerson = await LostPerson.create({
      name,
      photo: result.secure_url,
      address,
      returnAddress,
      phone,
      nidNo,
      relation,
      gdNo,
      caption,
      user: req.user,
    });

    res.status(201).json({
      success: true,
      lostPerson
    });
  }
  );
})


// get all lost person
exports.getAllLostPerson = catchAsyncError(async (req, res, next) => {
  const lostPerson = await LostPerson.find();
  res.status(200).json({
    success: true,
    lostPerson
  });
});


exports.lostPersonSearch = catchAsyncError(async (req, res, next) => {
  const { keyword } = req.params;
  const lostPerson = await LostPerson.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { address: { $regex: keyword, $options: "i" } },
      { returnAddress: { $regex: keyword, $options: "i" } },
      { relation: { $regex: keyword, $options: "i" } },
      { gdNo: { $regex: keyword, $options: "i" } },
      { caption: { $regex: keyword, $options: "i" } }
    ]
  });
  res.status(200).json({
    success: true,
    result: lostPerson
  });
});