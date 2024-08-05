import { animalClient } from '../../controllers/animalController'

class ListAnimalsService {
  async getAll() {
    const animals = await animalClient.animal.findMany({
      include: {
        location: true,
      },
    })
    if (!animals) {
      throw new Error('No animals found')
    }
    return animals
  }
  async getById(id: string) {
    const animal = await animalClient.animal.findUnique({
      where: { id },
      include: {
        location: true,
      },
    })
    if (!animal) {
      throw new Error('Animal not found')
    }
    return animal
  }
  async getByCategory(category: string) {
    const animals = await animalClient.animal.findMany({
      where: { category },
      include: {
        location: true,
      },
    })
    if (!animals) {
      throw new Error('No animals found')
    }
    return animals
  }
  async getAllByUserId(userId: string) {
    const animals = await animalClient.animal.findMany({
      where: { creatorId: userId },
      include: {
        location: true,
      },
    })
    if (!animals) {
      throw new Error('No animals found')
    }
    return animals
  }
}
export { ListAnimalsService }
