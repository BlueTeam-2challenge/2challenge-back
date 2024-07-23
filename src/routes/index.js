const router = require('express').Router()

const animalsRouter = require('./animals')

router.use('/', animalsRouter)

module.exports = router
