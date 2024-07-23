const express = require('express')
const router = express.Router()
const Animal = require('../models/animals')

router.get('/', (req, res) => {
  res.send('Hello World!')
})

router.post('/animals', async (req, res) => {
  const animal = new Animal({
    name: req.body.name,
    specie: req.body.specie,
    breed: req.body.breed,
    gender: req.body.gender,
    age: req.body.age,
  })
  await animal.save()
  res.send(animal)
})

module.exports = router
