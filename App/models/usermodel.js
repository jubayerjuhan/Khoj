const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const crypto = require('crypto')

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    select: false,
    type: String,
    unique: true,
    required: true,
    select: false,
  },
  bio: {
    type: String,
  },
  profilePicture: {
    type: String,
  },
  role: {
    type: String,
    default: 'user',
  },
  joined: {
    type: Date,
    default: Date.now(),
  },

  passwordResetToken: String,
  passwordResetTokenExpires: Date,
})

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  const hashedPassword = await bcrypt.hash(this.password, 10);
  this.password = hashedPassword;
})


userSchema.methods.getJwtToken = function () {
  const token = jwt.sign({ id: this._id }, process.env.JWTSECRET);
  return token;
}

userSchema.methods.validatePassword = async function (password) {
  const isValid = await bcrypt.compare(password, this.password);
  return isValid;
}

userSchema.methods.getPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(16).toString('hex');
  this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest('hex');
  this.passwordResetTokenExpires = Date.now() + 10 * 60 * 1000;

  return resetToken;
}


module.exports = mongoose.model('User', userSchema);