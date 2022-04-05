import React from 'react'

function order() {
    return (
        <section className="text-gray-600 body-font overflow-hidden">
            <div className="container px-5 py-24 mx-auto">
                <div className="lg:w-4/5 mx-auto flex flex-wrap">
                    <div className="lg:w-1/2 w-full lg:pr-10 lg:py-6 mb-6 lg:mb-0">
                        <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR.COM</h2>
                        <h1 className="text-gray-900 text-3xl title-font font-medium mb-4">Orders</h1>
                        <p className="leading-relaxed mb-4">Your order has been successfully placed.</p>

                        <div className="flex items-center justify-center mb-4">
                            <a className="flex-grow flex items-center justify-center text-gray-500 border-b-2 border-gray-500 py-2 text-lg px-1">Description</a>
                            <a className="flex-grow flex items-center justify-center border-b-2 border-gray-300 py-2 text-lg px-1 pl-5">Quantity</a>
                            <a className="flex-grow flex items-center justify-center border-b-2 border-gray-300 py-2 text-lg px-1">Item Total</a>
                        </div>
                        <div className="flex items-center justify-center border-gray-200 py-2 px-10">
                            <span className="text-gray-500 flex items-center justify-center">Wear the Code</span>
                            <span className="ml-auto text-gray-500 flex items-center justify-center">1</span>
                            <span className="ml-auto text-gray-900 flex items-center justify-center">499</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2 px-10">
                            <span className="text-gray-500">Wear the Code</span>
                            <span className="ml-auto text-gray-500">1</span>
                            <span className="ml-auto text-gray-900">499</span>
                        </div>
                        <div className="flex border-t border-gray-200 py-2 px-10">
                            <span className="text-gray-500">Wear the Code</span>
                            <span className="ml-auto text-gray-500">1</span>
                            <span className="ml-auto text-gray-900">499</span>
                        </div>

                        <div className="flex items-center justify-center mt-5">
                            <span className="title-font font-medium text-2xl text-gray-900 pl-5">Subtotal: $58.00</span>
                            <button className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">Track Order</button>
                        </div>
                    </div>
                    <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded" src="https://dummyimage.com/400x400" />
                </div>
            </div>
        </section>
    )
}

export default order
