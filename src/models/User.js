const mongoose = require('mongoose')

const { Schema } = mongoose

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'],
      minLength: [3, 'Name must be at least 2 characters'],
    },
    email: {
      type: String,
      required: [true, 'Email is required'],
      unique: true,
      validate: {
        validator: (value) => {
          return /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)
        },
        message: (props) => `${props.value} is not a valid email address`,
      },
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
