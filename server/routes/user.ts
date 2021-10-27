import express from 'express'
import userController from '../controller/UserController'

const Router = express.Router()

Router.post('/register', userController.register)
Router.post('/login', userController.login)
Router.get('/logout', userController.logout)

export { Router as userRouters }