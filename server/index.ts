import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import morgan from 'morgan'
import { apiRouters } from './routes'


// Middleware
const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan('dev'))
app.use(cookieParser())


// Router
app.use('/api/v1', apiRouters)



// Database
import './config/database'



// Server listening
const port = process.env.port || 5000
app.listen(port, () => {
    console.log("Server is running on port", port);
})