import { userClient } from '../../controllers/userController'

interface UpdateUserServiceProps {
  uid: string
  name: string
  email: string
}
class UpdateUserService {
  async execute({ uid, name, email }: UpdateUserServiceProps) {
    const user = await userClient.update({
      where: { uid },
      data: {
        name,
        email,
      },
    })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
export { UpdateUserService }
