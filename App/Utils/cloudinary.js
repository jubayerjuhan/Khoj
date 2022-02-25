const cloundinary = require('cloudinary').v2

cloundinary.config({
  api_key: process.env.CLOUDINARY_API_KEY,
  cloud_name: process.env.CLOUD_NAME,
  api_secret: process.env.CLOUDINARY_API_SECRET,
})

module.exports = { cloundinary };