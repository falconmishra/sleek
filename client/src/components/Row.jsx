import React from 'react'
import { Card } from './Card'
import '../css/hidder.css'
import '../css/btn.css'

import { FaSortAlphaDown , FaFilter } from "react-icons/fa";

export const Row = ({name}) => {
  return (
    <div className='w-screen color-w1 p-4 px-8 scroll-hide bg-wh1'>
        
        <div className='w-full Row flex justify-between '>
            <span className='text-2xl'>{name}</span>
            <div className='flex gap-4'>
                <span className='cursor-pointer rounded-2xl p-1 hover:bg-[#ccc8c8] flex justify-center items-center gap-1'> <span className='hidder'>Filter</span> <FaFilter /></span>
                <span className='cursor-pointer rounded-2xl p-1 hover:bg-[#ccc8c8] flex justify-center items-center gap-1'><span className='hidder'>Sort</span> <FaSortAlphaDown /></span>
            </div>
        </div>

        <div className='border my-4 flex gap-4 overflow-x-auto overflow-clip w-full scroll-hide '>
            <div className='flex gap-8 border-none cursor-grab'>

            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            <Card></Card>
            </div>
        </div>
    </div>
  )
}
