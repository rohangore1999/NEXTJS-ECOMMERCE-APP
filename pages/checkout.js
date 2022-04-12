import React from 'react'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiOutlineMinus } from 'react-icons/ai';
import { GrAdd } from 'react-icons/gr';
import Head from 'next/head';
import Script from 'next/script';

function checkout({ cart, clearCart, addCart, removeCart, subTotal }) {
    const initiatePayment = async () => {
        let oid = Math.floor(Math.random() * Date.now())

        // get transaction token
        const data = { cart, subTotal, oid, email: "email" }

        let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pretransaction`, {
            method: 'POST', // or 'PUT'
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })

        let txn_token_res = await a.json()
        console.log("txn_token_res >>> ", txn_token_res)
        let txn_token = txn_token_res.txnToken
        console.log(txn_token)

        var config = {
            "root": "",
            "flow": "DEFAULT",
            "data": {
                "orderId": oid, /* update order id */
                "token": txn_token, /* update token value */
                "tokenType": "TXN_TOKEN",
                "amount": subTotal /* update amount */
            },
            "handler": {
                "notifyMerchant": function (eventName, data) {
                    console.log("notifyMerchant handler function called");
                    console.log("eventName => ", eventName);
                    console.log("data => ", data);
                }
            }
        };

        // initialze configuration using init method 
        window.Paytm.CheckoutJS.init(config).then(function onSuccess() {
            // after successfully updating configuration, invoke JS Checkout
            window.Paytm.CheckoutJS.invoke();
        }).catch(function onError(error) {
            console.log("error => ", error);
        });
    }

    return (
        <div className='container m-auto'>
            <Head><meta name="viewport" content="width=device-width, height=device-height, initial-scale=1.0, maximum-scale=1.0" />
            </Head>
            <Script type="application/javascript" crossorigin="anonymous"
                src={`${process.env.NEXT_PUBLIC_PAYTM_HOST}/merchantpgpui/checkoutjs/merchants/${process.env.NEXT_PUBLIC_PAYTM_MID}.js`} />

            <h1 className='font-bold text-3xl text-center my-8'>Checkout</h1>

            <h2 className='font-bold text-xl px-5 my-2'>1. Delivery Details</h2>

            <div className='mx-auto flex px-5'>
                <div className='px-2 w-1/2'>
                    <div className="mb-4">
                        <label htmlFor="name" className="leading-7 text-sm text-gray-600">Name</label>
                        <input type="text" id="name" name="name" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

                <div className='px-2 w-1/2'>
                    <div className="mb-4">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input type="email" id="email" name="email" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className='px-2 w-full px'>
                <div className="mb-4 px-5">
                    <label htmlFor="email" className="leading-7 text-sm text-gray-600">Address</label>
                    <textarea name="address" cols="30" rows="2" className="w-full px-2 bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 leading-8 transition-colors duration-200 ease-in-out"></textarea>
                </div>
            </div>

            <div className='mx-auto flex px-5'>
                <div className='px-2 w-1/2'>
                    <div className="mb-4">
                        <label htmlFor="phone" className="leading-7 text-sm text-gray-600">Phone</label>
                        <input type="text" id="phone" name="phone" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

                <div className='px-2 w-1/2'>
                    <div className="mb-4">
                        <label htmlFor="city" className="leading-7 text-sm text-gray-600">City</label>
                        <input type="text" id="city" name="city" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <div className='mx-auto flex px-5'>
                <div className='px-2 w-1/2'>
                    <div className="mb-4">
                        <label htmlFor="state" className="leading-7 text-sm text-gray-600">State</label>
                        <input type="text" id="state" name="state" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>

                <div className='px-2 w-1/2'>
                    <div className="mb-4">
                        <label htmlFor="pincode" className="leading-7 text-sm text-gray-600">Pincode</label>
                        <input type="number" id="pincode" name="pincode" className="w-full bg-white rounded border border-gray-300 focus:border-gray-500 focus:ring-2 focus:ring-gray-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out" />
                    </div>
                </div>
            </div>

            <h2 className='font-bold text-xl px-5 my-2'>2. Review Cart Items</h2>

            {/* Cart sidebar */}

            <div className="sidebar bg-gray-100 p-10">
                <h2 className='font-bold text-lg text-left pb-5'>Shopping Cart</h2>
                <ul className='space-y-3'>
                    {
                        Object.keys(cart).map((item, idx) => (
                            <li key={idx} className='space-x-10 flex'>
                                <span>{cart[item].name}({cart[item].size}/{cart[item].variant})</span> {/* cart >>>  console.log(cart['wear-the-code'].name) */}

                                <div className='flex space-x-2'>
                                    <span className=' flex items-center justify-center cursor-pointer hover:bg-gray-400 rounded-full p-2 hover:scale-125 transition transform ease-out' onClick={() => removeCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant)}><AiOutlineMinus className='text-xs' /></span>
                                    <span className='text-xl  flex items-center justify-center'>{cart[item].qty}</span>
                                    <span className=' flex items-center justify-center hover:bg-gray-400 rounded-full p-2 cursor-pointer hover:scale-125 transition transform ease-out' onClick={() => addCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant)}><GrAdd className='text-xs' /></span>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <div className='font-semibold text-xl mt-5'>Subtotal: {subTotal}</div>
            </div>

            {
                Object.keys(cart).length >= 1 ? (
                    <div className='flex ml-10'>
                        <Link href={'/order'}><a>
                            <button onClick={initiatePayment} className="flex mt-2 mr-5 text-black border-2 border-black bg-transparent py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base"><AiOutlineShoppingCart className='mt-1 mr-2 text-xl' />Pay {subTotal}</button>
                        </a></Link>
                    </div>
                ) : (
                    <div className='text-sm text-gray-500'>Your cart is empty</div>
                )
            }

        </div>
    )
}

export default checkout