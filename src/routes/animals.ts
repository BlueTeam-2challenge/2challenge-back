import { Router } from 'express'
import animalController from '../controllers/animalController'

const router = Router()

router.route('/animals').post((req, res) => animalController.create(req, res))
router.route('/animals').get((req, res) => animalController.getAll(req, res))
router
  .route('/animals/:id')
  .get((req, res) => animalController.getById(req, res))
router
  .route('/animals/category/:category')
  .get((req, res) => animalController.getByCategory(req, res))
router
  .route('/animals/:id')
  .delete((req, res) => animalController.delete(req, res))

router
  .route('/animals/:id')
  .put((req, res) => animalController.update(req, res))

router
  .route('/animals/user/:id')
  .get((req, res) => animalController.getAllByUserId(req, res))
export default router
