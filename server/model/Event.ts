import mongoose from 'mongoose'
import { IEvent } from './interface/IEvent'

const EventSchema = new mongoose.Schema({
    name: String,
    shortDescription: String,
    description: String,
    image: String,
    publishDate: Number,
    exprireDate: Number,
    opened: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
})

export default mongoose.model<IEvent>('event', EventSchema)