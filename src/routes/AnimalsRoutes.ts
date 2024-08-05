import { Router, Request, Response } from 'express'
import animalController from '../controllers/animalController'

const router = Router()

router.post('/animals', (req: Request, res: Response) => {
  return new animalController().create(req, res)
})

router.get('/animals', (req: Request, res: Response) => {
  return new animalController().getAll(req, res)
})

router.get('/animals/:id', (req: Request, res: Response) => {
  return new animalController().getById(req, res)
})

router.get('/animals/category/:category', (req: Request, res: Response) => {
  return new animalController().getByCategory(req, res)
})

router.put('/animals/:id', (req: Request, res: Response) => {
  return new animalController().update(req, res)
})

router.delete('/animals/:id', (req: Request, res: Response) => {
  return new animalController().delete(req, res)
})
router.get('/animals/user/:id', (req: Request, res: Response) => {
  return new animalController().getAllByUserId(req, res)
})

export default router
