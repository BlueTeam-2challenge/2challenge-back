import { animalClient } from '../../controllers/animalController'

export interface UpdateAnimalServiceProps {
  id: string
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

class UpdateAnimalService {
  async execute({
    id,
    petName,
    description,
    address,
    category,
    location,
    createdBy,
  }: UpdateAnimalServiceProps) {
    const animal = await animalClient.animal.findUnique({
      where: { id },
    })
    if (!animal) {
      throw new Error('Animal not found')
    }
    const locationResponse = await animalClient.location.update({
      where: { id: animal.locationId },
      data: {
        lat: location.lat,
        lng: location.lng,
      },
    })
    const response = await animalClient.animal.update({
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
    if (!response) {
      throw new Error('Animal not updated')
    }
    return response
  }
}
export { UpdateAnimalService }
