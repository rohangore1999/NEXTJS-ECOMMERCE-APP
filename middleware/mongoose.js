import mongoose from "mongoose";

// to make/check the connection with MONGODB

const connectDb = handler => async (req, res) => {
    if (mongoose.connections[0].readyState) {
        // already connected
        return handler(req, res)
    }
    // to make new connection
    await mongoose.connect(process.env.MONGO_URI)
    return handler(req, res)
}

export default connectDb