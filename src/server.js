require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
)
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', require('./routes/index'))

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`)
})
