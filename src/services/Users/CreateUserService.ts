import { userClient } from '../../controllers/userController'
import { ObjectId } from 'mongodb'

interface CreateUserServiceProps {
  name: string
  email: string
}
class CreateUserService {
  async execute({ name, email }: CreateUserServiceProps) {
    const uid = new ObjectId().toString()
    const userFound = await userClient.findUnique({ where: { email } })
    if (userFound) {
      throw new Error('Email already registered')
    }
    const user = await userClient.create({
      data: {
        uid,
        name,
        email,
      },
    })
    if (!user) {
      throw new Error('User not created')
    }
    return user
  }
}
export { CreateUserService }
