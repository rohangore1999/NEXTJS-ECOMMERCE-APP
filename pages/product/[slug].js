import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/router'
import Product from '../../models/Product'
import mongoose from "mongoose";

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Slug({ buyNow, cart, addCart, removeCart, clearCart, subTotal, product, varients }) {
  console.log(product)
  console.log(varients)

  // product >> the one which we have selected slug
  const [color, setColor] = useState(product.color)
  const [size, setSize] = useState(product.size)


  const router = useRouter()
  const { slug } = router.query

  const [pin, setPin] = useState()
  const [service, setService] = useState(null)

  const checkPins = async () => {
    // get all the pins from the API pincode.js
    let p = await fetch(`${process.env.NEXT_PUBLIC_HOST}/api/pincode`)
      .then((res) => res.json()) //get the list of apis from our pincode api
      .then((res1) => {
        // we are checking if the entered pin is present in our list which we got from api
        if (Object.keys(res1).includes(pin)) {
          setService(true)
          toast.success('Your pincode is serviceable!', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
        else {
          setService(false)
          toast.error('Sorry your pincode is not serviceable!', {
            position: "bottom-center",
            autoClose: 1000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        }
      })
  }

  const onChangePins = (e) => {
    setPin(e.target.value)
  }


  // to refresh when size/color selected
  const refreshVarient = (newsize, newcolor) => {
    let url = `${process.env.NEXT_PUBLIC_HOST}/product/${varients[newcolor][newsize]['slug']}`
    window.location = url //it will visit by reloading to same url
  }

  console.log("color", color)
  console.log("size", size)


  return (
    <div>
      <section className="text-gray-600 body-font overflow-hidden">

        <ToastContainer
          position="bottom-center"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />

        <div className="container px-5 py-14 mx-auto">
          <div className="lg:w-4/5 mx-auto flex flex-wrap">
            <img alt="ecommerce" className="lg:w-1/2 w-full lg:h-auto h-64 object-top px-20 object-contain rounded"
              src={product.img} />
            <div className="lg:w-1/2 w-full lg:pl-10 lg:py-6 mt-6 lg:mt-0">
              <h2 className="text-sm title-font text-gray-500 tracking-widest">CODESWEAR</h2>
              <h1 className="text-gray-900 text-3xl title-font font-medium mb-1">{product.title} ({product.size}/{product.color})</h1>
              <div className="flex mb-4">
                <span className="flex items-center">
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="currentColor" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 text-gray-500" viewBox="0 0 24 24">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <span className="text-gray-600 ml-3">4 Reviews</span>
                </span>
                <span className="flex ml-3 pl-3 py-2 border-l-2 border-gray-200 space-x-2s">
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path>
                    </svg>
                  </a>
                  <a className="text-gray-500">
                    <svg fill="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-5 h-5" viewBox="0 0 24 24">
                      <path d="M21 11.5a8.38 8.38 0 01-.9 3.8 8.5 8.5 0 01-7.6 4.7 8.38 8.38 0 01-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 01-.9-3.8 8.5 8.5 0 014.7-7.6 8.38 8.38 0 013.8-.9h.5a8.48 8.48 0 018 8v.5z"></path>
                    </svg>
                  </a>
                </span>
              </div>
              <p className="leading-relaxed">Fam locavore kickstarter distillery. Mixtape chillwave tumeric sriracha taximy chia microdosing tilde DIY. XOXO fam indxgo juiceramps cornhole raw denim forage brooklyn. Everyday carry +1 seitan poutine tumeric. Gastropub blue bottle austin listicle pour-over, neutra jean shorts keytar banjo tattooed umami cardigan.</p>
              <div className="flex mt-6 items-center pb-5 border-b-2 border-gray-100 mb-5">
                <div className="flex">
                  <span className="mr-3">Color</span>

                  {/* checking 1: in the varients do we have color. 2: In that color do we have that size */}
                  {/* Example Varients Obj: { red: { xl: { slug:'wear-the-code' } } } */}
                  {Object.keys(varients).includes('white') && Object.keys(varients['white']).includes(size) && <button onClick={() => refreshVarient(size, 'white')} className={`border-2  
                  rounded-full w-6 h-6 focus:outline-none ${color === 'white' ? 'border-black' : 'border-gray-300'} `}></button>}

                  {Object.keys(varients).includes('red') && Object.keys(varients['red']).includes(size) && <button onClick={() => refreshVarient(size, 'red')} 
                  className={`border-2  ml-1
                   bg-red-700 rounded-full w-6 h-6 focus:outline-none ${color === 'red' ? 'border-black' : 'border-gray-300'} `}></button>}

                  {Object.keys(varients).includes('blue') && Object.keys(varients['blue']).includes(size) && <button onClick={() => refreshVarient(size, 'blue')} className={`border-2  ml-1 bg-blue-700 rounded-full w-6 h-6 focus:outline-none ${color === 'blue' ? 'border-black' : 'border-gray-300'} `}>
                    </button>}

                  {Object.keys(varients).includes('green') && Object.keys(varients['green']).includes(size) && <button onClick={() => refreshVarient(size, 'green')} className={`border-2  ml-1 bg-green-700 rounded-full w-6 h-6 focus:outline-none ${color === 'green' ? 'border-black' : 'border-gray-300'} `}>
                    </button>}

                </div>

                <div className="flex ml-6 items-center">
                  <span className="mr-3">Size</span>
                  <div className="relative">
                    <select value={size} onChange={(e) => refreshVarient(e.target.value, color)} className="rounded border appearance-none border-gray-300 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200 
                    focus:border-gray-500 text-base pl-3 pr-10">

                      {/* in the varients[color] has that size then only show */}
                      {/* Example Varients Obj: { red: { xl: { slug:'wear-the-code' } } } */}

                      {Object.keys(varients[color]).includes('S') && <option value={'S'} >S</option>}
                      {Object.keys(varients[color]).includes('M') && <option value={'M'} >M</option>}
                      {Object.keys(varients[color]).includes('L') && <option value={'L'} >L</option>}
                      {Object.keys(varients[color]).includes('X') && <option value={'X'} >X</option>}
                      {Object.keys(varients[color]).includes('XL') && <option value={'XL'} >XL</option>}
                      {Object.keys(varients[color]).includes('XXL') && <option value={'XXL'} >XXL</option>}


                    </select>
                    <span className="absolute right-0 top-0 h-full w-10 text-center text-gray-600 pointer-events-none flex items-center justify-center">
                      <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4" viewBox="0 0 24 24">
                        <path d="M6 9l6 6 6-6"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div className="flex">
                <span className="title-font font-medium text-2xl text-gray-900">Rs. {product.price}</span>
                <button className="flex ml-auto text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded"
                  onClick={() => addCart(slug, 1, product.price, product.title, size, color)}> Add </button>
                <button onClick={() => buyNow(slug, 1, product.price, product.title, size, color)} className="flex mx-2 text-white bg-gray-500 border-0 py-2 px-6 focus:outline-none hover:bg-gray-600 rounded">
                  Buy Now
                </button>
              </div>

              {/* to check pincode is available or not */}
              <div className='flex flex-col items-start justify-start my-5 pin space-y-2'>
                <input onChange={onChangePins} className='flex w-52 border border-black rounded-md p-1' placeholder='Pin available?' type={'text'} />
                <button className="flex text-white bg-gray-500 border-0 py-1 px-4 focus:outline-none hover:bg-gray-600 rounded" onClick={checkPins}>Check</button>
              </div>

              {(service && service !== null) && (
                <div className='text-green-700 text-sm'>
                  We deliver to this pincode
                </div>
              )
              }

              {(!service && service !== null) && (
                <div className='text-red-700 text-sm'>
                  We do not deliver to this pincode
                </div>
              )
              }

            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Slug


export async function getServerSideProps(context) {

  if (!mongoose.connections[0].readyState) {
    // if no existing connection
    // to make new connection
    await mongoose.connect(process.env.MONGO_URI)
  }

  // getting all the products[product using Find() of mongodb
  let product = await Product.findOne({ slug: context.query.slug }) // give one product as per the slug which filtered >> findOne
  let varients = await Product.find({ title: product.title, category: product.category }) //to get all the product of same title and same category

  let colorSizeSlug = {} // { red: { xl: { slug:'wear-the-code' } } }
  console.log("Varients >>> ", varients)
  for (let item of varients) {
    if (Object.keys(colorSizeSlug).includes(item.color)) {
      // if color exist
      // if in colorSizeSlug the color present then in that store the slug
      colorSizeSlug[item.color][item.size] = { slug: item.slug }
    }
    else {
      // if color not exist
      colorSizeSlug[item.color] = {}
      colorSizeSlug[item.color][item.size] = { slug: item.slug }

    }
  }

  return {
    // as ID field giving object error, so we are stringifying the products and then converting to JSON object
    props: {
      product: JSON.parse(JSON.stringify(product)),
      varients: JSON.parse(JSON.stringify(colorSizeSlug))
    }, // will be passed to the page component as props
  }
}