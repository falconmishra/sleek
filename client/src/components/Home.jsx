import React from 'react'
import '../css/css2.css'
import { Row } from './Row'

export const Home = () => {
  
  return (<div className='flex flex-col'>
  
    <div className='landing w-screen h-screen flex flex-col justify-center items-center'>

      <div className={`bottom-5 p-8 rounded-xl cont backdrop-blur-sm `}>
        <h3 className='font-bold text-[2rem] text-wh1'>Welcome to <span className='lobster gdc1 text-[3rem] cursor-pointer'>Sleek</span></h3>
        <p className='font-medium text-wh1 text-[1rem]'> Your Ultimate Shopping Destination!</p>
        <div className='w-full flex justify-center gap-4 m-2'>
          <button className='w-32 text-wh1  btn1 p-3 hover:opacity-90  rounded-full '>Shop Now</button>
          <button className='w-32  text-wh1 bg-b1 p-3 hover:opacity-90  rounded-full '>Explore</button>
        </div>
      </div>

      

    </div>
    <div>
    <Row name={'Winter special'}></Row>
    <Row name={'Summer special'}></Row>
    <Row name={'Playful Vibes'}></Row>
    <Row name={'Halloween special'}></Row>
    <Row name={'Aur kuch special'}></Row>
  </div>
  </div>
  )
}
