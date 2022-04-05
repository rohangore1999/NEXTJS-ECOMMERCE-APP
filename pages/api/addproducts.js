// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

// role of getproduct api is to simply returning the products when they call
// so for that we need to first fetch the products data from our mongodb database, then return it when api call

const handler = async (req, res) => {
    if (req.method === "POST") {
        // if the methond is post then, add product

        // created new object and passing the required data, to create data
        // in req.body will be list so we are iterating through each product and saving each product

        /*
            in the body of POST request we will send:
            [{
                    "title": "req.body[i].title",
                    "slug": "req.body[i].slug",
                    "decs": "req.body[i].decs",
                    "img": "req.body[i].img",
                    "category": "req.body[i].category",
                    "size": "req.body[i].size",
                    "color": "req.body[i].color",
                    "price": 499,
                    "availableQty": 1
                }]
        */

        for (let i = 0; i < req.body.length; i++) {
            let p = new Product({
                title: req.body[i].title,
                slug: req.body[i].slug,
                decs: req.body[i].decs,
                img: req.body[i].img,
                category: req.body[i].category,
                size: req.body[i].size,
                color: req.body[i].color,
                price: req.body[i].price,
                availableQty: req.body[i].availableQty
            })

            // to save the created product
            await p.save()
        }

        res.status(200).json({ success: "success" }) //returning all the products

    }
    else {
        // dont deal, show bad req >> 400
        res.status(400).json({ error: "This method is not allowed" }) //returning all the products

    }
}

export default connectDb(handler) // while exporting the handle we are passing it through connectDb so it will make sure that our database is connected or not
