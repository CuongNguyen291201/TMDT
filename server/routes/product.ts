import express from 'express'
import productController from '../controller/ProductController'

const Router = express.Router()

Router.post('/get-products', productController.getProducts)

Router.post('/get-product', productController.getProductById)

Router.post('/create-product', productController.createProduct)

Router.post('/update-product', productController.updateProduct)

Router.post('/delete-product', productController.deleteProduct)

export { Router as productRouters }