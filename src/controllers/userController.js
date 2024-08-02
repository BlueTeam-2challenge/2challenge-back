const { PrismaClient } = require('@prisma/client')
const { ObjectId } = require('mongodb')
const userClient = new PrismaClient().user

const userController = {
  async create(req, res) {
    try {
      const { name, email } = req.body
      const uid = new ObjectId().toString()
      const userFound = await userClient.findUnique({ where: { email } })
      if (userFound) {
        res.status(400).json({ message: 'Email already registered' })
        return
      }

      const user = await userClient.create({
        data: {
          uid,
          name,
          email,
        },
      })

      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async getAll(req, res) {
    try {
      const users = await userClient.findMany()
      res.status(200).json(users)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async getUser(req, res) {
    try {
      const { uid } = req.params
      const user = await userClient.findUnique({
        where: { uid },
      })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async delete(req, res) {
    try {
      const { uid } = req.params
      if (!uid) {
        res.status(400).json({ message: 'User ID is required' })
        return
      }

      const user = await userClient.delete({
        where: { uid },
      })

      res.status(200).json({ message: 'User deleted', user })
    } catch (error) {
      if (error.code === 'P2025') {
        res.status(404).json({ message: 'User not found' })
      } else {
        res.status(400).json({ error: error.message })
      }
    }
  },

  async update(req, res) {
    try {
      const { uid } = req.params
      const { name, email } = req.body

      const user = await userClient.update({
        where: { uid },
        data: {
          name,
          email,
        },
      })

      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },
}

module.exports = userController
