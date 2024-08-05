import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const animalController = {
  async create(req, res) {
    try {
      const { petName, description, address, category, createdBy, location } =
        req.body

      const locationResponse = await prisma.location.create({
        data: {
          lat: location.lat,
          lng: location.lng,
        },
      })
      const response = await prisma.animal.create({
        data: {
          petName,
          description,
          address,
          category,
          locationId: locationResponse.id,
          creatorId: createdBy,
        },
      })

      res.status(201).json(response)
    } catch (error) {
      res.status(400).json({ error: error.message })
      console.log(error)
    }
  },

  async getAll(req, res) {
    try {
      const animals = await prisma.animal.findMany({
        include: {
          location: true,
        },
      })
      res.status(200).json(animals)
    } catch (error) {
      res.status(400).json({ error: error.message })
      console.log(error)
    }
  },

  async getById(req, res) {
    try {
      const response = await prisma.animal.findUnique({
        where: { id: req.params.id },
        include: {
          location: true,
        },
      })
      if (!response) {
        res.status(404).json({ message: 'Animal not found' })
        return
      }
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async getByCategory(req, res) {
    try {
      const response = await prisma.animal.findMany({
        where: { category: req.params.category },
        include: {
          location: true,
        },
      })
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async getAllByUserId(req, res) {
    try {
      const response = await prisma.animal.findMany({
        where: { creatorId: req.params.id },
        include: {
          location: true,
        },
      })
      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async delete(req, res) {
    try {
      const response = await prisma.animal.delete({
        where: { id: req.params.id },
      })
      if (!response) {
        res.status(404).json({ message: 'Animal not found' })
        return
      }
      res.status(200).json({ message: 'Animal deleted' })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const { petName, description, address, category, createdBy, location } =
        req.body

      const animal = await prisma.animal.findUnique({
        where: { id },
      })

      if (!animal) {
        res.status(404).json({ message: 'Animal not found' })
        return
      }

      const locationResponse = await prisma.location.update({
        where: { id: animal.locationId },
        data: {
          lat: location.lat,
          lng: location.lng,
        },
      })

      const response = await prisma.animal.update({
        where: { id },
        data: {
          petName,
          description,
          address,
          category,
          creatorId: createdBy,
          locationId: locationResponse.id,
        },
      })

      res.status(200).json(response)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },
}

export default animalController
