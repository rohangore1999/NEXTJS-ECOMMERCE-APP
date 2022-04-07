import React from 'react'
import Link from 'next/link'
import Product from '../models/Product'
import mongoose from "mongoose";

function hoodies({ products }) {
  console.log(products) //HERE THE DATA IS SORTED ACCORDING TO TITLE OF THE PRODUCT
  return (
    <div>
      <section className="text-gray-600 body-font">
        <div className="container px-5 py-24 mx-auto">
          <div className="flex flex-wrap -m-4 items-center justify-center text-center">
            {
              // as we have multiple object so to iterate using their keys
              // products >> keys ... list of hoods
              // product >> each value 
              Object.keys(products).map((product) => (
                <div key={products[product]._id} className="lg:w-1/4 md:w-1/2 p-4 w-full cursor-pointer shadow-lg m-3 hover:scale-105 transform transition ease-out ">
                  <Link href={`/product/${products[product].slug}`}>
                    <a className="block relative rounded overflow-hidden">
                      <img alt="ecommerce" className="h-[36vh] mx-auto" src={products[product].img} />
                    </a>
                  </Link>

                  <div className="mt-4 text-center md:text-left">
                    <h3 className="text-gray-500 text-xs tracking-widest title-font mb-1">{products[product].category}</h3>
                    <h2 className="text-gray-900 title-font text-lg font-medium">{products[product].title}</h2>
                    <p className="mt-1">{products[product].price}</p>
                    <div className='mt-1'>
                      {/* if the size present in particular product then show respective span tag */}
                      {products[product].size.includes('S') && <span className='border border-gray-600 px-1 mx-1'>S</span>}
                      {products[product].size.includes('L') && <span className='border border-gray-600 px-1 mx-1'>L</span>}
                      {products[product].size.includes('X') && <span className='border border-gray-600 px-1 mx-1'>X</span>}
                      {products[product].size.includes('XL') && <span className='border border-gray-600 px-1 mx-1'>XL</span>}
                      {products[product].size.includes('XXL') && <span className='border border-gray-600 px-1 mx-1'>XXL</span>}
                    </div>

                    <div className='mt-1'>
                      {/* if the size present in particular product then show respective span tag */}
                      {products[product].color.includes('red') && <button className="border-2 border-gray-300 ml-1 bg-red-500 rounded-full w-6 h-6"></button>}
                      {products[product].color.includes('blue') && <button className="border-2 border-gray-300 ml-1 bg-blue-500 rounded-full w-6 h-6"></button>}
                      {products[product].color.includes('green') && <button className="border-2 border-gray-300 ml-1 bg-green-500 rounded-full w-6 h-6"></button>}
                    </div>
                  </div>
                </div>
              ))
            }
          </div>
        </div>
      </section>
    </div>
  )
}

export default hoodies

export async function getServerSideProps() {

  if (!mongoose.connections[0].readyState) {
    // if no existing connection
    // to make new connection
    await mongoose.connect(process.env.MONGO_URI)
  }

  // getting all the products[product using Find() of mongodb
  let products = await Product.find({ category: 'hood' })

  // storing hood with key as titles and rest value with size [] color [] 
  let hoods = {}

  for (let item of products) {
    if (item.title in hoods) {
      // means the title is present in hood object; means that hood is present with different size and color so we will add those size and color to respective array

      if (!hoods[item.title].color.includes(item.color) && item.availableQty > 0) {
        // if in the existed title that color is not present then push into color array
        hoods[item.title].color.push(item.color)
      }

      if (!hoods[item.title].size.includes(item.size) && item.availableQty > 0) {
        // if in the existed title that size is not present then push into size array
        hoods[item.title].size.push(item.size)
      }

    }

    else {
      // means the title is not present in hood object
      // then make item.title as a key and rest all value as obj

      // and this is deep copying the object >>> JSON.parse(JSON.stringify(item))
      hoods[item.title] = JSON.parse(JSON.stringify(item))
      if (item.availableQty > 0) {

        // storing color in an array []
        hoods[item.title].color = [item.color]

        // storing size in an array []
        hoods[item.title].size = [item.size]
      }
    }
  }


  return {
    // as ID field giving object error, so we are stringifying the products and then converting to JSON object
    props: {
      products: JSON.parse(JSON.stringify(hoods))
    }, // will be passed to the page component as props
  }
}