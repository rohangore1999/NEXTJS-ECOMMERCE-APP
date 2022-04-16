import React from 'react'
import { useRouter } from 'next/router'
import Order from '../models/Order'
import mongoose from 'mongoose'

function order({ order }) {
    console.log(order)
    let products = order.products
    console.log(order.products)

    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Order Id: #{order.orderId}</h1>
                        <p className="leading-relaxed mb-4">Your order has been successfully placed. Your Payment status is {order.status}</p>

                        <div className="flex items-center justify-center mb-4">
                            <a className="flex-grow flex items-center justify-center text-gray-500 border-b-2 border-gray-500 py-2 text-lg px-1">Description</a>
                            <a className="flex-grow flex items-center justify-center border-b-2 border-gray-300 py-2 text-lg px-1 pl-5">Quantity</a>
                            <a className="flex-grow flex items-center justify-center border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
                        </div>

                        {Object.keys(products).map((item) => (
                            <div key={item} className="flex items-center justify-center border-gray-200 py-2 px-10 truncate">
                                <span className="text-gray-500 flex items-center justify-center">{products[item].name.slice(0,10)}...({products[item].size})/({products[item].variant})</span>
                                <span className="ml-auto text-gray-500 flex items-center justify-center">{products[item].qty}</span>
                                <span className="ml-auto text-gray-900 flex items-center justify-center">{products[item].price}</span>
                            </div>
                        ))
                        }



                        <div className="flex items-center justify-center mt-5">
                            <span className="title-font font-medium text-2xl text-gray-900 pl-5">Subtotal: {order.amount}</span>
                            <button className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Track Order</button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-full h-64 object-contain object-center rounded" src="https://images.pexels.com/photos/3755706/pexels-photo-3755706.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1" />
                </div>
            </div>
        </section>
    )
}

export default order

export async function getServerSideProps(context) {

    if (!mongoose.connections[0].readyState) {
        // if no existing connection
        // to make new connection
        await mongoose.connect(process.env.MONGO_URI)
    }

    // getting the order based on order id
    let order = await Order.findById(context.query.id)


    return {
        // as ID field giving object error, so we are stringifying the products and then converting to JSON object
        props: {
            order: JSON.parse(JSON.stringify(order))
        }, // will be passed to the page component as props
    }
}