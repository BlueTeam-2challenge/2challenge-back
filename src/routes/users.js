const router = require('express').Router()
const userController = require('../controllers/userController')

router.route('/register').post((req, res) => userController.create(req, res))
router.route('/users').get((req, res) => userController.getAll(req, res))
router.route('/users/:uid').get((req, res) => userController.getUser(req, res))
router
  .route('/users/:uid')
  .delete((req, res) => userController.delete(req, res))
router.route('/users/:uid').put((req, res) => userController.update(req, res))

module.exports = router
