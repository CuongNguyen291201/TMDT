import mongoose from 'mongoose'
import { IUser } from './interface/IUser'

const UserSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: Number,
        default: 0      // 0: user, 1: admin
    },
    avatar: {
        type: String,
        default: "https://lh3.googleusercontent.com/ogw/ADea4I5HltMLHyKGnQ8ARJrW_zV1xR46TP1iSvBPkOofHQ=s83-c-mo"
    }
}, {
    timestamps: true
})

export default mongoose.model<IUser>('user', UserSchema)