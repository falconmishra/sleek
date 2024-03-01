import React from "react";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { Link } from 'react-router-dom'
import '../css/btn.css'

export const Card = () => {
  return (
    <div className="bg-white h-fit w-72 p-2 rounded-xl cursor-default">
      <div>
        <img
          className=" w-full h-64 object-cover object-center rounded-lg"
          src="https://assets.ajio.com/medias/sys_master/root/20230914/UziT/650330f0afa4cf41f5e5587f/-473Wx593H-443014402-black-MODEL.jpg"
          alt="Sweater wearing model"
        />
      </div>

      <div>
        <div className="flex mt-3">
          <span className="flex-auto text-[1.15rem] font-semibold">
          <Link to='/productdetails'>
            Women's Sweater
          </Link>
          </span>
          <div className="flex w-fit gap-1 items-center justify-end text-purp">
            4.0 <FaStar />
          </div>
        </div>

        <div>
          <p className="text-g1">Subinformatica Inc.</p>
          <div className="flex gap-1 items-center">
              <span className="text-[1.25rem] text-purp" >$250</span>
            <span className="line-through text-[grey]">$400</span>
            <span className="text-green-500">34% off</span>
          </div>
        </div>

        <div className="flex gap-2 justify-center my-2">
          <button className="btn2 flex flex-1  items-center justify-center  p-1 text-[1.5rem]  text-wh1 bg-b1 p-3 hover:opacity-90  rounded-full"><Link to='/cart'>
          <FaCartPlus  />
          </Link>
          </button>
          <button className="btn1  flex-1 p-1 text-wh1  btn1 p-3 hover:opacity-90  rounded-full">Buy Now</button>
        </div>
      </div>
    </div>
  );
};
