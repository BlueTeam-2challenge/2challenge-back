import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { CreateUserService } from '../services/Users/CreateUserService'
import { ListUserService } from '../services/Users/ListUserService'
import { DeleteUserService } from '../services/Users/DeleteUserService'
import { UpdateUserService } from '../services/Users/UpdateUserService'

export const userClient = new PrismaClient().user

class userController {
  async create(req: Request, res: Response) {
    try {
      const { name, email } = req.body as { name: string; email: string }
      const usersService = new CreateUserService()
      const user = await usersService.execute({ name, email })
      res.status(201).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getAll(req: Request, res: Response) {
    try {
      const usersService = new ListUserService()
      const users = await usersService.getAll()
      res.status(200).json(users)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async getUser(req: Request, res: Response) {
    try {
      const { uid } = req.params as { uid: string }
      const usersService = new ListUserService()
      const user = await usersService.getUser(uid)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { uid } = req.params as { uid: string }
      const usersService = new DeleteUserService()
      const user = await usersService.execute(uid)
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { uid } = req.params
      const { name, email } = req.body
      const usersService = new UpdateUserService()
      const user = await usersService.execute({ uid, name, email })
      res.status(200).json(user)
    } catch (error) {
      res.status(400).json({ error: error.message })
    }
  }
}

export default userController
