import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import {
  CreateAnimalService,
  CreateAnimalProps,
} from '../services/Animals/CreateAnimalService'
import { ListAnimalsService } from '../services/Animals/ListAnimalService'
import { DeleteAnimalService } from '../services/Animals/DeleteAnimalService'
import { UpdateAnimalService } from '../services/Animals/UpdateAnimalService'
export const animalClient = new PrismaClient()

class AnimalController {
  async create(req: Request, res: Response) {
    const { petName, description, address, category, createdBy, location } =
      req.body as CreateAnimalProps

    const animalService = new CreateAnimalService()
    const animal = await animalService.execute({
      petName,
      description,
      address,
      category,
      createdBy,
      location,
    })

    res.status(201).json(animal)
  }

  async getAll(req: Request, res: Response) {
    try {
      const animalsService = new ListAnimalsService()
      const animals = await animalsService.getAll()
      res.status(200).json(animals)
    } catch (error) {
      res.status(400).json({ error: error.message })
      console.log(error)
    }
  }
  async getById(req: Request, res: Response) {
    const { id } = req.params as { id: string }
    const animalsService = new ListAnimalsService()
    const animal = await animalsService.getById(id)
    res.status(200).json(animal)
  }

  async getByCategory(req: Request, res: Response) {
    const { category } = req.params as { category: string }
    const animalsService = new ListAnimalsService()
    const animals = await animalsService.getByCategory(category)
    res.status(200).json(animals)
  }

  async getAllByUserId(req: Request, res: Response) {
    const { id } = req.params as { id: string }
    const animalsService = new ListAnimalsService()
    const animals = await animalsService.getAllByUserId(id)
    res.status(200).json(animals)
  }

  async delete(req: Request, res: Response) {
    const { id } = req.params as { id: string }
    const deleteService = new DeleteAnimalService()
    await deleteService.execute(id)
    res.status(200).json({ message: 'Animal deleted' })
  }

  async update(req: Request, res: Response) {
    const { id } = req.params as { id: string }
    const { petName, description, address, category, createdBy, location } =
      req.body as CreateAnimalProps
    const updateService = new UpdateAnimalService()
    const animal = await updateService.execute({
      id,
      petName,
      description,
      address,
      category,
      createdBy,
      location,
    })
    res.status(200).json(animal)
  }
}

export default AnimalController
