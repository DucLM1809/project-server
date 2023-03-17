const mongoose = require('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { schemaOptions } = require('./modelOptions')

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide name'],
      minLength: 3,
      maxLength: 50
    },
    email: {
      type: String,
      required: [true, 'Please provide email'],
      match: [/\S+@\S+\.\S+/, 'Please provide valid email'],
      unique: true
    },
    password: {
      type: String,
      required: [true, 'Please provide password'],
      match: [
        /^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?\W).*$/,
        'Password must contain at least one lower character, one upper character, digit or special symbol'
      ]
    },
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  schemaOptions
)

UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10)
  this.password = await bcrypt.hash(this.password, salt)
})

UserSchema.methods.createJWT = function () {
  return jwt.sign(
    { userId: this._id, name: this.name, isAdmin: this.isAdmin },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_LIFETIME
    }
  )
}

UserSchema.methods.comparePassword = async function (candidatePassword) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password)
  return isMatch
}

module.exports = mongoose.model('User', UserSchema)
