import { Router } from 'express'
import animalsRouter from './AnimalsRoutes'
import userRouter from './UsersRoutes'

const router = Router()

router.use('/', animalsRouter)
router.use('/', userRouter)

export default router
