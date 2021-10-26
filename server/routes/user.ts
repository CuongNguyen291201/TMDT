import express from 'express'
import userController from '../controller/UserController'

const Router = express.Router()

Router.post('/register', userController.register)

export { Router as userRouters }