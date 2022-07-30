const mongoose = require("mongoose");

const usersSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  profilePicture: {
    type: String,
  },
  email: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    default: "",
  },
  phone: {
    type: Number,
    default: 0,
  },
  blood: {
    type: String,
    default: "",
  },
  dateOfBirth: {
    type: Date,
    default: "",
  },
});

module.exports = mongoose.model("users", usersSchema);
