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
}

module.exports = userController
