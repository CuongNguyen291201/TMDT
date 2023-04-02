import express from 'express'
import productController from '../controller/ProductController'
import cloudinary from 'cloudinary';

// Cloudinary
cloudinary.v2.config({
    cloud_name: process.env.CLOUD_NAME,
    api_key: process.env.API_KEY,
    api_secret: process.env.API_SECRET
});


const Router = express.Router()

Router.post('/get-products', productController.getProducts)

Router.post('/get-product', productController.getProductById)

Router.post('/get-product-by-collection', productController.getProductByCollection)

Router.post('/create-product', productController.createProduct)

Router.post('/update-product', productController.updateProduct)

Router.post('/delete-product', productController.deleteProduct)

Router.post('/delete-image-product', async (req, res) => {
    try {
        const { imageId } = req.body;
        await cloudinary.v2.uploader.destroy(imageId)
        return res.status(200).json({ msg: "Delete image success"})
    } catch (error: any) {
        return res.status(500).json({ msg: error.message })
    }
})

export { Router as productRouters }