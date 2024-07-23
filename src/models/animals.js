const mongoose = require('mongoose')

const animalModel = new mongoose.model('Animal', {
  name: String,
  specie: String,
  breed: String,
  gender: String,
  age: Number,
})

module.exports = animalModel
