import React from 'react'
import { FaPaw } from "react-icons/fa";

export const PageUnavailable = () => {
  return (
    <div className='flex flex-col-reverse justify-center items-center gap-6'>
      <h2 className='text-[1.25rem]'>Page Not Found!</h2>
      <FaPaw style={{color: '#8F00FF', fontSize: '100px'}}/>
    </div>
  )
}
