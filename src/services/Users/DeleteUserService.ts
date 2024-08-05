import { userClient } from '../../controllers/userController'

class DeleteUserService {
  async execute(uid: string) {
    const user = await userClient.delete({
      where: { uid },
    })
    if (!user) {
      throw new Error('User not found')
    }
    return user
  }
}
export { DeleteUserService }
