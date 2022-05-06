import mongoose from 'mongoose'
import { ICart } from './interface/ICart'
import User from './User'

const CartSchema = new mongoose.Schema({
  userId: {
    type: String,
  },
  products: Array
}, {
  timestamps: true
})

export default mongoose.model<ICart>('cart', CartSchema)