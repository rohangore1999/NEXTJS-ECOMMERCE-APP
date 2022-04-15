// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import Order from "../../models/Order"
import connectDb from "../../middleware/mongoose"


const handler = async (req, res) => {
    // validate paytm checksum

    // Update into orders table after checking the transaction status

    // if the status from the paytm gateway is success then only update to success
    if (req.body.STATUS == 'TXN_SUCCESS') {
        // findOneAndUpdate(filter, update)
        await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Paid', paymentInfo: JSON.stringify(req.body) }) //we are finding the order and updating the status with the help of id
    }
    // else make it pending only
    else if (req.body.STATUS == 'PENDING') {
        await Order.findOneAndUpdate({ orderId: req.body.ORDERID }, { status: 'Pending', paymentInfo: JSON.stringify(req.body) }) //we are finding the order and updating the status with the help of id

    }
    // initiate shipping
    // redirect user to order confirmation page
    res.redirect('/order', 200) //redirect on 200 status to order page

    res.status(200).json({ body: req.body })
}

export default connectDb(handler) // while exporting the handle we are passing it through connectDb so it will make sure that our database is connected or not