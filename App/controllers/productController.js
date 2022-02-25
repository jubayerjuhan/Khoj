const Product = require("../models/productmodel.js");
const catchAsyncError = require("../Utils/catchAsyncError.js");
const { cloundinary } = require("../Utils/cloudinary.js");

exports.addProduct = catchAsyncError(async (req, res, next) => {
  const {
    name,
    purchasePrice,
    salePrice,
    image,
    category,
    categoryName
  } = req.body;

  if (image) {
    cloundinary.uploader.upload(image, async (err, result) => {
      if (err) {
        return next(err);
      }
      const product = new Product({
        name,
        image: result.url,
        stock: 0,
        category,
        purchasePrice,
        salePrice,
        categoryName
      });
      await product.save();
      res.status(201).json({
        success: true,
        product,
      })
    })
  } else {

    const product = new Product({
      name,
      stock: 0,
      category,
      purchasePrice,
      salePrice,
    });
    await product.save();
    res.status(201).json({
      success: true,
      product,
    })
  }
})


exports.getProducts = catchAsyncError(async (req, res, next) => {
  const { category, time } = req.query;

  if (category) {
    const products = await Product.find({ categoryId: category });
    res.status(200).json({
      success: true,
      products,
    })
  }
  else if (time) {
    const products = await Product.find({ createdAt: { $gte: Date.now() - time * 24 * 60 * 60 * 1000 } }).populate("categoryId");
    res.status(200).json({
      success: true,
      products,
    })
  }
  const products = await Product.find();
  res.status(200).json({
    success: true,
    products,
  });
})

exports.getSingleProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findById(req.params.id)
  res.status(200).json({
    success: true,
    product,
  });
})


// update products

exports.updateProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true,
    product,
  });
})


exports.deleteProduct = catchAsyncError(async (req, res, next) => {
  const product = await Product.findByIdAndDelete(req.params.id, {
    new: true,
    runValidators: true,
    useFindAndModify: false
  });
  res.status(200).json({
    success: true,
  });
})


