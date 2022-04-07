// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import Product from "../../models/Product"
import connectDb from "../../middleware/mongoose"

// role of getproduct api is to simply returning the products when they call
// so for that we need to first fetch the products data from our mongodb database, then return it when api call

const handler = async (req, res) => {
    // finding all the products using Product.find() method from mongodb
    let products = await Product.find()

    // storing tshirt with key as titles and rest value with size [] color [] 
    let tshirts = {}

    for (let item of products) {
        if (item.title in tshirts) {
            // means the title is present in tshirt object; means that tshirt is present with different size and color so we will add those size and color to respective array

            if (!tshirts[item.title].color.includes(item.color) && item.availableQty > 0) {
                // if in the existed title that color is not present then push into color array
                tshirts[item.title].color.push(item.color)
            }

            if (!tshirts[item.title].size.includes(item.size) && item.availableQty > 0) {
                // if in the existed title that size is not present then push into size array
                tshirts[item.title].size.push(item.size)
            }

        }

        else {
            // means the title is not present in tshirt object
            // then make item.title as a key and rest all value as obj

            // and this is deep copying the object >>> JSON.parse(JSON.stringify(item))
            tshirts[item.title] = JSON.parse(JSON.stringify(item))
            if (item.availableQty > 0) {

                // storing color in an array []
                tshirts[item.title].color = [item.color]

                // storing size in an array []
                tshirts[item.title].size = [item.size]
            }
        }
    }

    res.status(200).json({ tshirts }) //returning all the products
}

export default connectDb(handler) // while exporting the handle we are passing it through connectDb so it will make sure that our database is connected or not
