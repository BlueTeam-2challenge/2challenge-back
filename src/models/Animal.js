const mongoose = require('mongoose')

const { Schema } = mongoose

const animalSchema = new Schema(
  {
    petName: {
      type: String,
      required: true,
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
    },
    ownerName: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
)

const Animal = mongoose.model('Animal', animalSchema)

module.exports = { Animal, animalSchema }
