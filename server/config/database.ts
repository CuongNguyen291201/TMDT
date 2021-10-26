import mongoose from 'mongoose'

const URI = process.env.MONGODB_URL

mongoose.connect(`${URI}`, {
    // useNewUrlParser: true,
    // useUnifiedTopology: true
}, (err) => {
    if (err) throw err;
    console.log("MongoDB connected!!");
})