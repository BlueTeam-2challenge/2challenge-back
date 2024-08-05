import { Router, Request, Response } from 'express'
import userController from '../controllers/userController'

const router = Router()

router.post('/register', (req: Request, res: Response) => {
  return new userController().create(req, res)
})
router.get('/users', (req: Request, res: Response) => {
  return new userController().getAll(req, res)
})
router.get('/users/:uid', (req: Request, res: Response) => {
  return new userController().getUser(req, res)
})
router.delete('/users/:uid', (req: Request, res: Response) => {
  return new userController().delete(req, res)
})
router.put('/users/:uid', (req: Request, res: Response) => {
  return new userController().update(req, res)
})

export default router
