import React from 'react'
import '../css/login.css'
import '../css/btn.css'
import login from '../images/login.jpg'

export const Login = () => {
  return (
    <div className='login-h'>
      <div className="contain">
        <div className='conatinerone'>
          <img src={login} alt="" />
        </div>
        <div className="containertwo">
          <h1>Welcome Back</h1>
          <div className="cc">
            <h2>Login Your account</h2>
            <div className='comp'>
              
              <input type="email" placeholder='Email' />
            </div>
            <div className='comp'>
              
              <input type="password" placeholder='Password' />
            </div>
            <button className='btn2 btnlog'>Login</button>
            
            <h3>Create an account</h3>
            <h4>Forgot password?</h4>
          </div>
          
        </div>
      </div>
      
    </div>
  )
}
