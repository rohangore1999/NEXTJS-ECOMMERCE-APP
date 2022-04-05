import { useState, useEffect } from 'react'
import Footer from '../components/Footer'
import Navbar from '../components/Navbar'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {

  const [cart, setCart] = useState({}) //empty obj, it will contain the products in the cart data
  const [subTotal, setSubTotal] = useState(0)

  // to save in localstorage
  const saveCart = (mycart) => {
    localStorage.setItem("cart", JSON.stringify(mycart)) //storing in "cart" var

    let subt = 0
    let keys = Object.keys(mycart) //getting all the keys

    for (let i = 0; i < keys.length; i++) {
      // each keys
      // subt + particular products price * particular products qty
      subt += mycart[keys[i]].price * mycart[keys[i]].qty
    }

    setSubTotal(subt)
  }

  // To addCart
  const addCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart // making copy of the cart

    if (itemCode in newCart) {
      // if the item is already present in the cart; then we will only increace the qty from the already present qty(cart[itemCode])
      newCart[itemCode].qty = cart[itemCode].qty + qty
    }

    else {
      // else product is not present so add it
      newCart[itemCode] = { qty: 1, price, name, size, variant }
    }

    setCart(newCart) //updating the original cart
    saveCart(newCart) //saving/persisting the cart in local storage
  }


  // To clear cart
  const clearCart = () => {
    setCart({}) //empty the original cart
    saveCart({}) //empty the local storage
  }


  useEffect(() => {
    // when page refresh

    try {
      if (localStorage.getItem('cart')) {
        // if the localStorage have cart then; set the orginal cart by Parse the json(converting string to json object)
        setCart(JSON.parse(localStorage.getItem('cart')))
        saveCart(JSON.parse(localStorage.getItem('cart')))
      }
    } catch (error) {
      // if error then clear; so that we should not face that error again
      console.error(error)
      localStorage.clear()
    }

  }, [])



  // To remove from cart
  const removeCart = (itemCode, qty, price, name, size, variant) => {
    let newCart = cart // making copy of the cart

    if (itemCode in newCart) {
      // if the item is already present in the cart; then we will only increace the qty from the already present qty(cart[itemCode])
      newCart[itemCode].qty = cart[itemCode].qty - qty
    }

    // if in newCart[itemCode] after decreasing the qty it go to 0 or less than 0; then delete that newCart
    if (newCart[itemCode]["qty"] <= 0) {
      delete newCart[itemCode]
    }

    setCart(newCart) //updating the original cart
    saveCart(newCart) //saving/persisting the cart in local storage
  }

  return (
    <>
      <Navbar cart={cart} addCart={addCart} removeCart={removeCart} clearCart={clearCart} subTotal={subTotal} />
      <Component cart={cart} addCart={addCart} removeCart={removeCart} clearCart={clearCart} subTotal={subTotal} {...pageProps} />
      <Footer />
    </>
  )

}

export default MyApp
