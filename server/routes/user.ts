import express from 'express'
import authController from '../controller/AuthController'
import userController from '../controller/UserController'


const Router = express.Router()

Router.post('/register', authController.register)
Router.post('/login', authController.login)
Router.post('/logout', authController.logout)
Router.get('/refresh_token', authController.generateAccessToken)
Router.post('/add-cart', authController.addCart)
Router.post('/get-user-by-id', authController.getUserFromId)

export { Router as userRouters }