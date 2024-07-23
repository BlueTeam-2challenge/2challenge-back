require('dotenv').config()
const express = require('express')
const app = express()
const mongoose = require('mongoose')

mongoose.connect(process.env.MONGODB_URI)

mongoose.connection.on('error', (error) => {
  console.error(error)
})
mongoose.connection.once('open', () => {
  console.log('Connected to MongoDB')
})

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

app.use('/', require('./routes/index'))

app.listen(process.env.PORT, () => {
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})
