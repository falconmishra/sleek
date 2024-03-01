import React, { useState } from 'react'
import { FaStar, FaCartPlus , FaDollarSign  } from "react-icons/fa";
import {Link} from "react-router-dom"
import "../css/css2.css"

export const ProductDetails = () => {
   const [mainsrc,setMainsrc] = useState('https://imagescdn.planetfashion.in/img/app/product/7/785477-9138247.jpg?auto=format&w=494.40000000000003')
   let src1='https://imagescdn.planetfashion.in/img/app/product/8/857371-10070889.jpg?auto=format&w=494.40000000000003'
   let src2='https://images.bestsellerclothing.in/data/selected/09-Aug-2023/250135204_1.jpg?width=1080&height=1355&mode=fill&fill=blur&format=auto'
   let src3='https://www.bushirt.in/cdn/shop/products/1_a667a902-9fe8-454a-8335-b6f87cf4e0fb.jpg?v=1642834022'
   let src4='https://rukminim2.flixcart.com/image/850/1000/l31x2fk0/t-shirt/d/8/f/xl-ct04221509-rigo-original-image8yhaqfpapnr.jpeg?q=90'
  return (
    <div className=' bg-white px-32 py-12 my-6 h-fit flex justify-center gap-12 rowcol'>
        <div className='img-container gap-2 flex flex-col '>
            <img className='w-[24rem]' src={mainsrc} alt="" />
            <div className='flex'>
                <img className='hover:opacity-70 h-24 w-24 object-cover object-center' src={src1} onClick={()=>setMainsrc(src1)} alt="" />
                <img className='hover:opacity-70 h-24 w-24 object-cover object-center' src={src2} onClick={()=>setMainsrc(src2)} alt="" />
                <img className='hover:opacity-70 h-24 w-24 object-cover object-center' src={src3} onClick={()=>setMainsrc(src3)} alt="" />
                <img className='hover:opacity-70 h-24 w-24 object-cover object-center' src={src4} onClick={()=>setMainsrc(src4)} alt="" />
               
            </div>

        </div>
       
        <div className="details flex flex-col gap-2">
            <div>
              <h2 className='text-2xl font-bold'>The 
              Grace Sweatshirt</h2>
            </div>
            <div className='text-g1 text-xl'>
              Subinformatic Inc.
            </div>
            <div className='flex justify-between'>
            <div className='flex items-baseline gap-2'>
            <span className="text-[1.5rem] text-purp" >$250</span>
            <span className="line-through text-[grey]">$400</span>
            <span className="text-green-500">34% off</span>
            </div>
            <div className="flex w-fit gap-1 items-center justify-end text-purp text-[1.25rem]">
            4.0 <FaStar />
          </div>
            </div>
            <div className='w-fill max-w-96 text-[.775rem] flex flex-col gap-2'>
              <span className='text-[1rem] font-medium'>Product Details</span>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Minus eius ea illo! A aut accusamus aperiam voluptas quae, voluptatibus, perferendis odio, repudiandae libero voluptates dicta?
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolore, provident fuga excepturi accusantium nostrum tenetur in, et minus at quas inventore recusandae eius sunt est nobis molestiae amet numquam <br />
               Dignissimos esse quia reprehenderit. Eum aut consectetur quidem iste, sit obcaecati voluptatum. Eaque natus non doloribus.''
            </div>
            <div className='w-fill max-w-96 text-[.775rem] flex flex-col gap-2'>
              <span className='text-[1rem] font-medium'>Key Highlights</span>
              <ul className='list-disc'>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Inventore rem vero sit!</li>
                <li>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Voluptatem, error.</li>
                <li>Lorem, ipsum.</li>
                <li>Lorem ipsum dolor sit amet.

                </li>
              </ul>
            </div>
            <div>
              Delivery in 3 days
            </div>
            <div className="flex gap-2 justify-center my-2">
            
          <button className="btn2 flex flex-1  items-center justify-center  p-1 text-[1.25rem] gap-3 text-wh1 bg-b1 p-3 hover:opacity-90  rounded-full"><Link to='/cart' className='flex justify-center items-center gap-3'> Add to cart <FaCartPlus/> </Link></button>
          <button className="btn1 flex p-1 text-wh1 text-[1.25rem]  items-center justify-center btn1 p-1 hover:opacity-90 gap-3 flex-1 rounded-full">Buy Now <FaDollarSign /></button>
        </div>
        </div>
    </div>
  )
}
