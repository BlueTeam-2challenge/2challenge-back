const { PrismaClient } = require('@prisma/client')

const animalClient = new PrismaClient().animal

const animalController = {
  async create(req, res) {
    try {
      const { name, description, address, category, createdBy } = req.body
      const response = await animalClient.create({
        data: {
          name,
          description,
          address,
          category,
          creatorId: createdBy,
        },
      })
      res.status(201).json(response)
    } catch (error) {
      res.status(400).json(error)
      console.log(error)
    }
  },
  async getAll(req, res) {
    try {
      const response = await animalClient.findMany({})
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json(error)
      console.log(error)
    }
  },
  async getById(req, res) {
    try {
      const response = await animalClient.findUnique({
        where: { id: req.params.id },
      })
      if (!response) {
        res.status(404).json({ message: 'Animal not found' })
        return
      }
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async getAllByUserId(req, res) {
    try {
      const response = await animalClient.findMany({
        where: { creatorId: req.params.id },
      })
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async delete(req, res) {
    try {
      const response = await animalClient.delete({
        where: { id: req.params.id },
      })
      if (!response) {
        res.status(404).json({ message: 'Animal not found' })
        return
      }
      res.status(200).json({ message: 'Animal deleted' })
    } catch (error) {
      res.status(400).json(error)
    }
  },
  async update(req, res) {
    try {
      const { id } = req.params
      const { name, description, address, category, createdBy } = req.body
      const response = await animalClient.update({
        where: { id },
        data: {
          name,
          description,
          address,
          category,
          creatorId: createdBy,
        },
      })
      if (!response) {
        res.status(404).json({ message: 'Animal not found' })
        return
      }
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json(error)
    }
  },
}

module.exports = animalController
