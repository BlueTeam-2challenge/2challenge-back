require('dotenv').config()
const express = require('express')
const app = express()
const db = require('./database/db')

app.use(express.json())
app.use(express.urlencoded({ extended: false }))

db()

app.use('/', require('./routes/index'))

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`)
})
