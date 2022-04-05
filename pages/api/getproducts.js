// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

// role of getproduct api is to simply returning the products when they call
// so for that we need to first fetch the products data from our mongodb database, then return it when api call

const handler = async (req, res) => {
    // finding all the products using Product.find() method from mongodb
    let products = await Product.find()
    res.status(200).json({ products }) //returning all the products
}

export default connectDb(handler) // while exporting the handle we are passing it through connectDb so it will make sure that our database is connected or not
