import { animalClient } from '../../controllers/animalController'

export interface CreateAnimalProps {
  petName: string
  description: string
  address: string
  category: string
  createdBy: string
  location: {
    lat: number
    lng: number
  }
}

export class CreateAnimalService {
  async execute({
    petName,
    description,
    address,
    category,
    createdBy,
    location,
  }: CreateAnimalProps) {
    const locationResponse = await animalClient.location.create({
      data: {
        lat: location.lat,
        lng: location.lng,
      },
    })
    const animal = await animalClient.animal.create({
      data: {
        petName,
        description,
        address,
        category,
        creatorId: createdBy,
        locationId: locationResponse.id,
      },
    })
    if (!animal) {
      throw new Error('Animal not created')
    }
    return animal
  }
}
