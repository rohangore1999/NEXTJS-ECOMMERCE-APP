import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"
import jsonwebtoken from "jsonwebtoken"

const handler = async (req, res) => {
    const token = req.body.token
    const data = jsonwebtoken.verify(token, process.env.JWT_SECRET)
    //console.log(data) >>>  // with the help of token we can get the user's email id
    let orders = await Order.find({ email: data.email }) // and based on that email id we will search the order made by that user
    res.status(200).json({ orders })
}

export default connectDb(handler) // while exporting the handle we are passing it through connectDb so it will make sure that our database is connected or not