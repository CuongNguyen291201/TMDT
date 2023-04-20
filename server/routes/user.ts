import express from 'express'
import authController from '../controller/AuthController'

const Router = express.Router()

Router.post('/register', authController.register)
Router.post('/login', authController.login)
Router.post('/logout', authController.logout)
Router.post('/refresh_token', authController.generateAccessToken)
Router.post('/add-cart', authController.addCart)
Router.post('/get-user-by-id', authController.getUserFromId)
Router.post('/update-user-info', authController.updateInfo)

export { Router as userRouters }