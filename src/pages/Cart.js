import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCartThunk, deleteItemCartThunk, removeCartEmpetyThunk, addOneQuantityThunk, addOneCart } from '../redux/actions'
import { Link } from 'react-router-dom'
import '../styles/styles-cart.css'

const Cart = () => {

  const dispatch = useDispatch()
  const cart = useSelector(state => state.cart)
  const [cant, setCant] = useState(0)
  // console.log(cart)

  useEffect(() => {
    dispatch(getCartThunk())   
  }, [ dispatch ])

  const deleteProduct = id =>{
    dispatch(deleteItemCartThunk(id))       
  } 

  const removeCart = () => {
    dispatch(removeCartEmpetyThunk())    
  }

  const modifyQuantity = (x, y) => {
    if(y === 0 ){      
      dispatch(deleteItemCartThunk(x))
      alert("Su carrito esta vacio")
    }else if( y>0 ) {
      dispatch(addOneQuantityThunk(x, y))
    }    
    
  }
  

  const prices = (cart.map( cart => Math.floor(cart.product.price * cart.quantity)))
  const totalPrice = prices.reduce( (anterior, actual)=> anterior + actual, 0 )

  // console.log(prices)
  
  return (
      <div className='container-cart'>
        <h1>Cart</h1>

        <div className='row'>  
            
            <div className='list'>
              <div className='titulo'> <span>Imagen</span><span>Producto</span><span>Precio</span> <span>Cantidad</span><span>Subtotal</span></div>
              {
                cart.map(cart => (
                  <div key={cart.id} className='list-card'>
                    <div className='list-info'>  
                      <img src={cart.product.images[0].url} alt=""  style={{width: "100px"}}/>   
                      <Link className='text'  to={`/shop/${cart.product.name}`}> {cart.product?.name} </Link>                
                      <p className='text'>$ {cart.product.price}</p>
                      <p className='text'>{cart.quantity}</p>
                      <p className='text'>$ {cart.product.price * cart.quantity}</p>
                      <button className='text' onClick={() => deleteProduct(cart.id)}>Borrar</button>
                      <button onClick={() => modifyQuantity(cart.id, (cart.quantity + 1))}>+</button>
                      <button onClick={() => modifyQuantity(cart.id, (cart.quantity - 1))}>-</button>
                      {/* <button onClick={() => dispatch(addOneQuantityThunk(cart.id, (cart.quantity - 1)))}>-</button> */}
                    </div>
                  </div>
                ))
              }
            </div>
        </div> 
        {

          cart.quantity && <button className='btn-trash' onClick={removeCart}>Vaciar carrito</button>
          
        }
        
        
        
        <h2>{totalPrice}</h2>
      </div>
  )}

export default Cart
