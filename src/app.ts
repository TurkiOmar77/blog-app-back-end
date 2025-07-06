import express from 'express'
import routes from './routes'
import cors from 'cors'
import corsOptions from './config/corsOptions'
import morgan from 'morgan'
import helmet from 'helmet'
import rateLimiter from './config/rateLimitOptions'
import { errorHandler } from './middlewares/errorHandler.middleware'
const app = express()

app.use(helmet())
app.use(cors(corsOptions))
app.use(morgan('dev'))
app.use(rateLimiter)
app.use(express.json())

app.use('/api',routes)

app.use(errorHandler)

export default app