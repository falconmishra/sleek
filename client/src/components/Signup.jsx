import React from 'react'
import '../css/signup.css'
import '../css/btn.css'
import login from '../images/login.jpg'

export const Signup = () => {
  return (
    <div className='login-h'>
      <div className="contain">
        <div className='conatinerone'>
          <img src={login} alt="" />
        </div>
        <div className="containertwo">
          <h1>Welcome</h1>
          <div className="cc">
            <h2>Signup Your account</h2>
            <div className='comp'>
              
              <input type="text" placeholder='Name' />
            </div>
            <div className='comp'>
              
              <input type="email" placeholder='Email' />
            </div>
            <div className='comp'>
              
              <input type="password" placeholder='Password' />
            </div>
            <button className='btn2 btnlog'>Login</button>
            
            <h3>Already have an account?</h3>
            
          </div>
          
        </div>
      </div>
      
    </div>
  )
}
