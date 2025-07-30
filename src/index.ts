import 'reflect-metadata'
import { AppDataSource } from './config/data-source'
import app from './app'
import dotenv from 'dotenv'

dotenv.config()

const PORT = process.env.PORT || 3000

AppDataSource.initialize()
  .then(() => {
    console.log('Connected to database')
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`)
    })
  })
  .catch((error) => {
    console.error('Error during Data Source initialization:', error)
  })
