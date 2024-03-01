import React from 'react'
import '../css/cart.css'
import '../css/btn.css'
export const Cart = () => {
  return (
    <div className='cover'>
      <div className='container'>
        <div className="cont1">
          <div className="yourcart"><h2>your cart</h2></div>
          
        </div>
        <div className="cont2">
          <div className="cartorder">
            <h1>Order Summary</h1>
          </div>
          <hr />
          <div className="subcc">
          <div className="left">
            <div className='item'>
              <h2>Items</h2>
            </div>
            <div className="cost"><h2>Cost</h2></div>
            <div className="tax">
              <h2>Tax</h2>
            </div>
            <div className="shipping">
              <h2>Shipping cost</h2>
            </div>
            <div className='toatlcost'>
              <h2>Total Cost</h2><hr />
            </div>
          </div>
          <div className="cost">
            <div className="item"><h2>$</h2></div>
            <div className="cost"><h2>$</h2></div>
            <div className="tax"><h2>$</h2></div>
            <div className="shipping"><h2>$</h2></div>
            <div className="toatlcost"><h2>$</h2></div>
            

          </div>
          </div>
            
          
          <div className="checkout"><button className='btn2 btnlog'>Checkout</button></div>

        </div>
      </div>

    </div>
  )
}
