// importing mongoose
const mongoose = require('mongoose')


// creating the schema (declaring the type of data will contain in OrderSchema)
const OrderSchema = new mongoose.Schema({
    userId: { type: String, required: true },
    products: [{
        productId: { type: String },
        quantity: { type: Number, default: 1 }
    }],
    address: { type: String, required: true },
    amount: { type: Number, required: true },
    status: { type: String, default: 'Pending', required: true }
}, { timestamps: true }) //it will give the created and modified date/time

mongoose.models = {} //whenever the Product.js imported it will try to create and model and give error "cannot overwrite" so we are creating empty model to avoide that error

// exporting so that we can use
export default mongoose.model("Order", OrderSchema)