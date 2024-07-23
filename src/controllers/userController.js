const { User: UserModel } = require('../models/User')

const userController = {
  async create(req, res) {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      }
      const userFound = await UserModel.findOne({ email: user.email })
      if (userFound) {
        res.status(400).send({ message: 'Email already registered' })
        return
      }
      const response = await UserModel.create(user)
      await response.save()
      res.status(201).send(response)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async getAll(req, res) {
    try {
      const response = await UserModel.find()
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async getUser(req, res) {
    try {
      const response = await UserModel.findById(req.params.id)
      if (!response) {
        res.status(404).send({ message: 'User not found' })
        return
      }
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async delete(req, res) {
    try {
      const response = await UserModel.findByIdAndDelete(req.params.id)
      if (!response) {
        res.status(404).send({ message: 'User not found' })
        return
      }
      res.status(200).send({ message: 'User deleted' })
    } catch (error) {
      res.status(400).send(error)
    }
  },
  async update(req, res) {
    try {
      const user = {
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        role: req.body.role,
      }
      const response = await UserModel.findByIdAndUpdate(req.params.id, user, {
        new: true,
      })
      if (!response) {
        res.status(404).send({ message: 'User not found' })
        return
      }
      res.status(200).send(response)
    } catch (error) {
      res.status(400).send(error)
    }
  },
}

module.exports = userController
