const mongoose = require('mongoose')

const { Schema } = mongoose

const animalSchema = new Schema(
  {
    petName: {
      type: String,
      required: [true, 'Pet name is required'],
    },
    petSpecie: {
      type: String,
      required: true,
    },
    petBreed: {
      type: String,
      required: true,
    },
    petGender: {
      type: String,
      required: true,
    },
    petAge: {
      type: Number,
      required: true,
      min: [0, 'Age must be greater than 0'],
      max: 100,
    },
    ownerName: {
      type: String,
      required: [true, 'Owner name is required'],
    },
  },
  { timestamps: true }
)

const Animal = mongoose.model('Animal', animalSchema)

module.exports = { Animal, animalSchema }
