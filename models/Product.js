// importing mongoose
const mongoose = require('mongoose')

// creating the schema (declaring the type of data will contain in ProductSchema)
const ProductSchema = new mongoose.Schema({
    title: { type: String, required: true },
    slug: { type: String, required: true,unique:true },
    decs: { type: String, required: true },
    img: { type: String, required: true },
    category: { type: String, required: true },
    size: { type: String},
    color: { type: String},
    price: { type: Number, required: true },
    availableQty: { type: Number, required: true },
    
}, { timestamps: true }) //it will give the created and modified date/time

mongoose.models = {} //whenever the Product.js imported it will try to create and model and give error "cannot overwrite" so we are creating empty model to avoide that error

// exporting so that we can use
export default mongoose.model("Product", ProductSchema)