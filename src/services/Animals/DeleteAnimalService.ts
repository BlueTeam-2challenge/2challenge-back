import { animalClient } from '../../controllers/animalController'

class DeleteAnimalService {
  async execute(id: string) {
    const animal = await animalClient.animal.delete({
      where: { id },
    })
    if (!animal) {
      throw new Error('Animal not found')
    }
    return animal
  }
}
export { DeleteAnimalService }
