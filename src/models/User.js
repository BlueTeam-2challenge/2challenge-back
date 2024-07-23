const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
    },
    password: {
      type: String,
      required: [true, 'Password is required'],
    },
    role: {
      type: String,
      required: [true, 'Role is required'],
      enum: ['admin', 'user'],
    },
  },
  { timestamps: true }
)

const User = mongoose.model('User', userSchema)

module.exports = { User, userSchema }
