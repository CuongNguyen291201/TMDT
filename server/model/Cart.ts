import mongoose from 'mongoose'
import { ICart } from './interface/ICart'
import Product from './Product'
import User from './User'

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
    ref: User
  },
  products: {
    type: Object,
    ref: Product
  }
}, {
  timestamps: true
})

export default mongoose.model<ICart>('cart', CartSchema)