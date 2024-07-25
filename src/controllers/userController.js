const { PrismaClient } = require('@prisma/client')

const userClient = new PrismaClient().user

const userController = {
  async create(req, res) {
    try {
      const { name, email, password, role } = req.body
      const userFound = await userClient.findUnique({ where: { email } })
      if (userFound) {
        res.status(400).json({ message: 'Email already registered' })
        return
      }

      const user = await userClient.create({
        data: {
          name,
          email,
          password,
          role,
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
      const { id } = req.params
      const user = await userClient.findUnique({
        where: { id },
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
      const { id } = req.params
      const user = await userClient.delete({
        where: { id },
      })
      if (!user) {
        res.status(404).json({ message: 'User not found' })
        return
      }
      res.status(200).json({ message: 'User deleted', user })
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  },

  async update(req, res) {
    try {
      const { id } = req.params
      const { name, email, password, role } = req.body

      const user = await userClient.update({
        where: { id },
        data: {
          name,
          email,
          password,
          role,
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
