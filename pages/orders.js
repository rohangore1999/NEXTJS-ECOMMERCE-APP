import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'
import { useEffect, useState } from 'react'

function orders() {
    const router = useRouter()
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const fetchOrders = async () => {
            let a = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/myorder`, {
                method: 'POST', // or 'PUT'
                headers: {
                    'Content-Type': 'application/json',
                },
                // in body we are sending stored jwt token
                body: JSON.stringify({ token: localStorage.getItem('token') }),
            })

            let res = await a.json()
            console.log(res)
            setOrders(res.orders)
        }


        // if we didnt get token in our local storage, means user is not logged in so redirect to home page
        if (!localStorage.getItem('token')) {
            router.push('/')
        }
        else {
            // if token available then only call our async function
            fetchOrders()
        }
    }, [])

    console.log(orders)

    return (
        <div className='min-h-screen'>
            <div className='container mx-auto'>
                <div className="flex flex-col my-5 mx-10">
                    <h1 className='font-semibold text-xl text-center my-5'>My Orders</h1>
                    <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                        <div className="py-2 inline-block min-w-full sm:px-6 lg:px-8">
                            <div className="overflow-hidden">
                                <table className="min-w-full">
                                    <thead className="border-b">
                                        <tr>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                #Order ID
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Email
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Amount
                                            </th>
                                            <th scope="col" className="text-sm font-medium text-gray-900 px-6 py-4 text-left">
                                                Details
                                            </th>
                                        </tr>
                                    </thead>
                                    <tbody>

                                        {orders.map((order) => (
                                            <tr key={order._id} className="border-b">
                                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{order._id}</td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.email}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    {order.amount}
                                                </td>
                                                <td className="text-sm text-gray-900 font-light px-6 py-4 whitespace-nowrap">
                                                    <Link href={`/order?id=` + order._id}><a>Details</a></Link>
                                                </td>
                                            </tr>
                                        ))}


                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}

export default orders
