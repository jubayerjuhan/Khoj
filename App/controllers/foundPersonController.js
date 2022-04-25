const { default: axios } = require("axios");
const { json } = require("express/lib/response");
const FoundDocument = require("../models/foundDocument.js");
const FoundPerson = require("../models/foundPersonModel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");
const { cloundinary } = require("../Utils/cloudinary.js");
const ErrorHandler = require("../Utils/Errorhandler.js");
const multer = require('multer')
const upload = multer({ dest: 'uploads/' })



exports.createfoundPerson = catchAsyncError(async (req, res, next) => {
  const {
    name,
    photo,
    address,
    phone,
    caption
  } = req.body;

  cloundinary.uploader.upload(photo, async (err, result) => {
    if (err) return next(new ErrorHandler(err.message, 400));
    const foundPerson = await FoundPerson.create({
      name,
      photo: result.secure_url,
      address,
      phone,
      caption,
      user: req?.user,
    });
    res.status(201).json({
      success: true,
      foundPerson
    });
  }
  );
})


// documrent
exports.createFoundDocument = catchAsyncError(async (req, res, next) => {
  const {
    name,
    documentType,
    photo,
    address,
    phone,
    caption
  } = req.body;

  cloundinary.uploader.upload(photo, async (err, result) => {
    if (err) return next(new ErrorHandler(err.message, 400));
    const foundDocument = await FoundDocument.create({
      name,
      documentType,
      photo: result.secure_url,
      address,
      phone,
      caption
    });
    res.status(201).json({
      success: true,
      foundDocument
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


exports.searchFoundPerson = catchAsyncError(async (req, res, next) => {
  const { keyword } = req.params;
  const foundPersons = await FoundPerson.find({
    $or: [
      { name: { $regex: keyword, $options: "i" } },
      { address: { $regex: keyword, $options: "i" } },
      { caption: { $regex: keyword, $options: "i" } }
    ]
  });
  res.status(200).json({
    success: true,
    result: foundPersons
  });
})


// document
exports.getAllFoundDocument = catchAsyncError(async (req, res, next) => {
  const foundDocuments = await FoundDocument.find();
  res.status(200).json({
    success: true,
    foundDocuments
  });
})




exports.getImageLink = catchAsyncError(async (req, res, next) => {
  const { photo } = req.body;
  // console.log(photo)
  cloundinary.uploader.upload(photo, async (err, result) => {
    console.log(result, err)
    if (err) return next(new ErrorHandler(err.message, 400));
    res.status(201).json({
      success: true,
      photo: result.secure_url
    });
  }
  );
})


// get single found Person
exports.getSingleFoundPerson = catchAsyncError(async (req, res, next) => {
  const { id } = req.params;
  const foundPerson = await FoundPerson.findById(id);
  res.status(200).json({
    success: true,
    foundPerson
  });
})