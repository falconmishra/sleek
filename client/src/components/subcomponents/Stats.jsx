import React from "react";
import { TbTruckDelivery } from "react-icons/tb";
import { RiExchangeDollarFill } from "react-icons/ri";

export default function Stats() {
  return (
    <div className="w-full flex my-16 px-2 justify-center lg:gap-16 gap-3  ">
      <div className="flex w-fit gap-2  items-center ">
        <h4 className="lg:text-5xl text-2xl font-bold text-slate-700">160+</h4>
        <p className="text-wrap text-gray-600  text-[14px]">Cities serverd</p>
      </div>
      <div className="flex w-fit gap-2 items-center  ">
        <h4 className="lg:text-7xl text-4xl font-bold text-slate-700">
          <TbTruckDelivery />
        </h4>
        <p className="text-wrap text-gray-600  text-[14px]">Fastest delivery</p>
      </div>
      <div className="flex w-fit gap-2 items-center  ">
        <h4 className="lg:text-7xl text-4xl font-bold text-slate-700">
          <RiExchangeDollarFill />
        </h4>
        <p className="text-wrap text-gray-600 text-[14px]">7 Day replacement</p>
      </div>
    </div>
  );
}
