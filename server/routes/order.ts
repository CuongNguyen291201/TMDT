import express from 'express'
import orderController from '../controller/OrderController'

const Router = express.Router()

Router.post('/get-order-by-user', orderController.getOrderByUser)
Router.post('/get-all-orders', orderController.getAllOrders)
Router.post('/create-order', orderController.createOrder)
Router.post('/delete-order', orderController.deleteOrder)
Router.post('/statistic-order', orderController.statisticOrder)

export { Router as orderRouters }