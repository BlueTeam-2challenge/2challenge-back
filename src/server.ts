import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes/index'
import swaggerUI from 'swagger-ui-express'
import swaggerDocument from '../swagger.json'
dotenv.config()
const app = express()

app.use(
  cors({
    origin: process.env.CORS_ORIGIN,
    optionsSuccessStatus: 200,
  })
)
app.use('/api/docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument))
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use('/api', routes)

app.listen(process.env.PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${process.env.PORT}`)
})
