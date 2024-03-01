import React from 'react'
import '../css/dashboard.css'
import order from '../images/order.png'
import logint from '../images/logint.png'
import adress from '../images/adress.png'
import paymento from '../images/paymento.png'
import contact from '../images/contact.png'
import offer from '../images/offer.png'
export const Dashboard = () => {
  return (
    <div className="count">
      <div className="hello">
        <h1>Hello, Ashutosh</h1>
      </div>
      <div className="div">
        <div className="box">
          <div className="firstbox">
            <img src={order}/>
            <div className="inn">
              <h2>Your Orders</h2>
              <h4>Track, return, or buy things again</h4>
            </div>
          </div>
          <div className="firstbox">
            <img src={logint}/>
            <div className="inn">
              <h2>Login & security</h2>
              <h4>Edit login, name, and mobile number</h4>
            </div>
          </div>
          <div className="firstbox">
            <img src={adress}/>
            <div className="inn">
              <h2>Your Addresses</h2>
              <h4>Edit addresses for orders and gifts</h4>
            </div>
          </div>
        </div>
        <div className="box">
          <div className="firstbox">
            <img src={paymento}/>
            <div className="inn">
              <h2>Payment options</h2>
              <h4>Edit or add payment methods</h4>
            </div>
          </div>
          <div className="firstbox">
            <img src={contact}/>
            <div className="inn">
              <h2>Contact us</h2>
              <h4></h4>
            </div>
          </div>
          <div className="firstbox">
            <img src={offer}/>
            <div className="inn">
              <h2>Offers</h2>
              <h4>Get latest offers and discounts</h4>
            </div>
          </div>
        </div>
        
      </div>
    </div>
  )
}
