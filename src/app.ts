import express from 'express'
import cors from 'cors'
import morgan from 'morgan'
import helmet from 'helmet'
import swaggerUi from 'swagger-ui-express'
import swaggerSpec from './docs/swagger'

// Routes
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'

const app = express()

// Middlewares 
app.use(cors())
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

// Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec))

// Routes API
app.use('/api/auth', authRoutes)
app.use('/api/users', userRoutes)

export default app
