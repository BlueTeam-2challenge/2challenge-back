const { Animal: AnimalModel } = require('../models/Animal')

const animalController = {
  async create(req, res) {
    try {
      const animal = {
        petName: req.body.petName,
        petSpecie: req.body.petSpecie,
        petBreed: req.body.petBreed,
        petGender: req.body.petGender,
        petAge: req.body.petAge,
        ownerName: req.body.ownerName,
      }
      const response = await AnimalModel.create(animal)
      await response.save()
      res.status(201).send(response)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async getAll(req, res) {
    try {
      const response = await AnimalModel.find()
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async getById(req, res) {
    try {
      const response = await AnimalModel.findById(req.params.id)
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error)
    }
  },
}

module.exports = animalController
