// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import User from "../../models/User"
import connectDb from "../../middleware/mongoose"
var CryptoJS = require("crypto-js");
var jwt = require('jsonwebtoken');


// role of getproduct api is to simply returning the products when they call
// so for that we need to first fetch the products data from our mongodb database, then return it when api call

const handler = async (req, res) => {
    if (req.method === "POST") {
        // if the methond is post then, do signup
        console.log(req.body)

        let user = await User.findOne({ "email": req.body.email })
        if (user) {
            console.log("found user >>> ", user)
            if (req.body.email === user.email && req.body.password === CryptoJS.AES.decrypt(user.password, 'secretkey123').toString(CryptoJS.enc.Utf8)) {
                var token = jwt.sign({ email: user.email, name: user.name }, 'jwttoken', {expiresIn:'2d'}); //making the jwt token, so that we can store it in local storage. From jwt token we know that user is sign in
                // and it will expires in 2day

                // passing the token and the success message
                res.status(200).json({ success: "success", token }) //returning all the products

            }
            res.status(400).json({ error: "Invalid Credentials" }) //returning all the products

        }
        res.status(400).json({ error: "No user found" }) //returning all the products


    }
    else {
        // dont deal, show bad req >> 400
        res.status(400).json({ error: "This method is not allowed" }) //returning all the products
    }
}

export default connectDb(handler) // while exporting the handle we are passing it through connectDb so it will make sure that our database is connected or not
