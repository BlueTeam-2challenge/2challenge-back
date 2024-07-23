const router = require('express').Router()

const animalsRouter = require('./animals')
const userRouter = require('./users')

router.use('/', animalsRouter)
router.use('/', userRouter)

module.exports = router
