const Category = require("../models/categorymodel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");
const { cloundinary } = require('../Utils/cloudinary.js')

exports.addCategory = catchAsyncError(async (req, res, next) => {
  const { name, image } = req.body;
  if (image) {
    cloundinary.uploader.upload(image, {
      folder: 'products',
      crop: "scale",
      height: 500,
      width: 500,
    }, async (err, result) => {
      if (err) {
        return next(err);
      }
      const category = await Category.create({
        name,
        image: result.secure_url,
      })
      res.status(201).json({
        success: true,
        data: {
          category
        }
      })
    })
  } else {
    const category = await Category.create({
      name,
    })
    res.status(201).json({
      success: true,
      data: {
        category
      }
    })
  }
})


exports.getAllCategory = catchAsyncError(async (req, res, next) => {
  const category = await Category.find();
  res.status(200).json({
    success: true,
    categories: category,
  })
})
