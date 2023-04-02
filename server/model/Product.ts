import mongoose from 'mongoose'
import { IProduct } from './interface/IProduct'

const ProductSchema = new mongoose.Schema({
    name: String,
    image: String,
    price: Number,
    desc: String,
    shortDesc: String,
    category: Number,
    imageId: String
}, {
    timestamps: true
})

export default mongoose.model<IProduct>('product', ProductSchema)