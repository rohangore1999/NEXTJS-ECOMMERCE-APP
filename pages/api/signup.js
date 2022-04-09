// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
// role of getproduct api is to simply returning the products when they call
// so for that we need to first fetch the products data from our mongodb database, then return it when api call

const handler = async (req, res) => {
    if (req.method === "POST") {
        // if the methond is post then, do signup
        console.log(req.body)

        let { name, email } = req.body
        let signup = new User({ name, email, password: CryptoJS.AES.encrypt(req.body.password, 'secretkey123').toString() })
        // to save the created product
        await signup.save()

        res.status(200).json({ success: "success" }) //returning all the products
    }
    else {
        // dont deal, show bad req >> 400
        res.status(400).json({ error: "This method is not allowed" }) //returning all the products
    }
}

export default connectDb(handler) // while exporting the handle we are passing it through connectDb so it will make sure that our database is connected or not
