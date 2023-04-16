import express from 'express'
import orderController from '../controller/OrderController'

const Router = express.Router()

Router.get('/get-order-by-user', orderController.getOrderByUser)
Router.get('/get-all-orders', orderController.getAllOrders)
Router.post('/create-order', orderController.createOrder)
Router.post('/delete-event', orderController.deleteOrder)

export { Router as orderRouters }