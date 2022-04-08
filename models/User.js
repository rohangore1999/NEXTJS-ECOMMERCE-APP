// importing mongoose
const mongoose = require('mongoose')


// creating the schema (declaring the type of data will contain in UserSchema)
const UserSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true,unique:true },
    password: { type: String, required: true },
    
}, { timestamps: true }) //it will give the created and modified date/time


mongoose.models = {} //whenever the Product.js imported it will try to create and model and give error "cannot overwrite" so we are creating empty model to avoide that error

// exporting so that we can use
export default mongoose.model("User", UserSchema)