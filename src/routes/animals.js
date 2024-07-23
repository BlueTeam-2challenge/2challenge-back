const router = require('express').Router()
const animalController = require('../controllers/animalController')

router.route('/animals').post((req, res) => animalController.create(req, res))
router.route('/animals').get((req, res) => animalController.getAll(req, res))
router
  .route('/animals/:id')
  .get((req, res) => animalController.getById(req, res))

module.exports = router
