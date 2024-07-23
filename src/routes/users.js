const router = require('express').Router()
const userController = require('../controllers/userController')

router.route('/register').post((req, res) => userController.create(req, res))
router.route('/users').get((req, res) => userController.getAll(req, res))

module.exports = router
