import { Request, Response } from 'express';
import Product from '../model/Product';

const productController = {
    getProducts: async (req: Request, res: Response) => {
        try {
            const data = await Product.find()
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getProductById: async (req: Request, res: Response) => {
        try {
            const _id = req.body;
            const data = await Product.findOne({ _id })
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    getProductByCollection: async (req: Request, res: Response) => {
        try {
            const { category } = req.body;
            const data = await Product.find({ category: category })
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    createProduct: async (req: Request, res: Response) => {
        try {
            const { product } = req.body;
            const data = await Product.create(product);
            await data.save();

            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    updateProduct: async (req: Request, res: Response) => {
        try {
            const { product } = req.body;
            const { _id } = product;
            const data = await Product.findByIdAndUpdate(_id, { $set: product }, { new: true })
            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    },
    deleteProduct: async (req: Request, res: Response) => {
        try {
            const _id = req.body;
            const data = await Product.findByIdAndDelete(_id)

            return res.status(200).json(data)
        } catch (error: any) {
            return res.status(500).json({ msg: error.message })
        }
    }
}

export default productController