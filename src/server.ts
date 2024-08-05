import express from 'express'
import cors from 'cors'
import bodyParser from 'body-parser'
import { config } from 'dotenv'
import routes from './routes/index'

const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
)
app.use(bodyParser.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`)
})
