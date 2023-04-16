import mongoose from 'mongoose'
import { IOrder } from './interface/IOrder'

const OrderSchema = new mongoose.Schema({
    idUser: String,
    idPayment: String,
    products: Array
}, {
    timestamps: true
})

export default mongoose.model<IOrder>('order', OrderSchema)