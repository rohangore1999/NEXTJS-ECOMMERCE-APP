import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { AiOutlineShoppingCart, AiFillCloseCircle, AiOutlineMinus } from 'react-icons/ai';
import { MdOutlineAccountCircle } from 'react-icons/md';

import { GrAdd } from 'react-icons/gr';
import { useRef } from 'react';


function Navbar({ cart, addCart, removeCart, clearCart, subTotal }) {
    // it will point to our sidebar of the cart
    const ref = useRef(null)

    const toggleCart = () => {
        if (Object.keys(cart).length !== 0) {
            ref.current.classList.remove("translate-x-full")
            ref.current.classList.add("translate-x-0")
        }

        // to toggle the sidebar for the cart
        if (ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-full")
            ref.current.classList.add("translate-x-0")
        }
        else if (!ref.current.classList.contains("translate-x-full")) {
            ref.current.classList.remove("translate-x-0")
            ref.current.classList.add("translate-x-full")
        }

    }

    // console.log(Object.keys(cart).length)
    return (
        <div className='navbar flex flex-col md:flex-row md:justify-start justify-center items-center px-5 py-2 md:py-0 bg-white sticky top-0 z-40 shadow-md'>

            <div className="logo mr-5">
                <Link href={'/'}><a><Image src='/logo.png' alt='' width={100} height={80} objectFit='contain' /></a></Link>
            </div>

            <div className="nav">
                <ul className='flex space-x-5 font-bold'>
                    <Link href={'/tshirts'}><a><li>Tshirts</li></a></Link>
                    <Link href={'/mugs'}><a><li>Mugs</li></a></Link>
                    <Link href={'/hoodies'}><a><li>Hoodies</li></a></Link>
                </ul>
            </div>

            {/* account icon */}
            <div className='absolute right-12 mx-5 top-4'>
                <Link href={'/login'}>
                    <a>
                        <MdOutlineAccountCircle className='text-3xl' />
                    </a>
                </Link>
            </div>

            <div onClick={toggleCart} className='cart absolute right-0 mx-5 top-4'>
                {
                    Object.keys(cart).length >= 1 && (<span className='absolute -top-3 animate-bounce duration-700 -right-2 bg-gray-400 rounded-full w-6 flex justify-center items-center'>{Object.keys(cart).length}</span>)
                }
                <AiOutlineShoppingCart className='text-3xl cursor-pointer hover:scale-125 transition transform ease-out' />
            </div>


            {/* Cart sidebar */}

            <div ref={ref} className={`sidebar absolute top-0 right-0 bg-gray-100 p-10 transition transform translate-x-full ease-in-out duration-300 h-[100vh] z-50 ${Object.keys(cart).length !== 0 && 'translate-x-0'}`}>
                <h2 className='font-bold text-lg text-center pb-5'>Shopping Cart</h2>
                <span onClick={toggleCart} className='absolute top-5 right-5 text-2xl cursor-pointer hover:scale-125 transition transform ease-out'><AiFillCloseCircle /></span>
                <ul className='space-y-3'>
                    {
                        Object.keys(cart).map((item, idx) => (
                            <li key={idx} className='space-x-10 flex items-center justify-center'>
                                <span>{cart[item].name} ({cart[item].size}/{cart[item].variant})</span> {/* cart >>>  console.log(cart['wear-the-code'].name) */}

                                <div className='flex space-x-2 items-center justify-center'>
                                    <span className=' flex items-center justify-center cursor-pointer hover:bg-gray-400 rounded-full p-2 hover:scale-125 transition transform ease-out' onClick={() => removeCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant)}><AiOutlineMinus className='text-xs' /></span>
                                    <span className='text-xl  flex items-center justify-center'>{cart[item].qty}</span>
                                    <span className=' flex items-center justify-center hover:bg-gray-400 rounded-full p-2 cursor-pointer hover:scale-125 transition transform ease-out' onClick={() => addCart(item, 1, cart[item].price, cart[item].name, cart[item].size, cart[item].variant)}><GrAdd className='text-xs' /></span>
                                </div>
                            </li>
                        ))
                    }
                </ul>

                <div className='font-semibold text-xl mt-5'>Subtotal: {subTotal}</div>

                {
                    Object.keys(cart).length >= 1 ? (
                        <div className='flex'>
                            <Link href={'/checkout'}><a>
                                <button className="flex mx-auto mt-7 text-black border-2 border-black bg-transparent 
                                py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base"><AiOutlineShoppingCart className='mt-1 mr-2 text-xl' />Check Out</button></a>
                            </Link>

                            <button onClick={clearCart} className="flex mx-auto mt-7 text-black border-2 border-black bg-transparent py-2 px-4 focus:outline-none hover:bg-gray-200 rounded text-base">Clear</button>
                        </div>
                    ) : (
                        <div className='text-sm text-gray-500'>Your cart is empty</div>
                    )
                }

            </div>
        </div>
    )
}

export default Navbar
