import express from 'express'
import cartController from '../controller/CartController'

const Router = express.Router()

Router.post('/create-cart', cartController.createCart)

Router.post('/get-cart', cartController.getCart)

Router.post('/update-cart', cartController.updateCart)


export { Router as cartRouters }