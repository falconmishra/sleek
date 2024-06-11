import React from "react";
import { GiClick } from "react-icons/gi";
import fashion from "./Assest-Subcomponents/fashion.jpeg";
import { Link } from "react-router-dom";

export default function SpecialProduct() {
  return (
    <div className="flex gap-4 pl-4 text-center lg:text-left py-8 lg:gap-24 lg:p-24 h-[35rem] bg-purple-300/25">
      <div className="flex-1 ">
        <img
          className="w-full rounded-xl h-full object-cover object-center aspect-square"
          src={fashion}
          alt=""
        />
      </div>
      <div className="flex-1 flex gap-4 flex-col h-full  items-center lg:p-6  lg:items-start justify-center">
        <h1 className="lg:text-3xl text-2xl  font-semibold">
          {" "}
          Min 30% off on <span className="text-gd font-semibold">Dresses</span>
        </h1>
        <p className="lg:text-[14px] text-[12px] text-gray-600 lg:leading-7 ">
          Discover incredible savings with our limited-time offer: 40% off on
          all dresses! Whether you're looking for a casual day dress or
          something elegant for a special occasion, now is the perfect time to
          refresh your wardrobe. Don't miss out on these amazing discounts. Shop
          now and find your new favorite dress at a fraction of the price!
        </p>
        <button className=" lg:text-[14px] text-[12px] w-fit hover:bg-purple-500/90 transition-all duration-300 gap-1 rounded-lg text-white bg-purple-600">
          <Link
            to="getProductByCategory?category=Woman"
            className="p-2 flex items-center"
          >
            Explore Now
            <GiClick />
          </Link>
        </button>
      </div>
    </div>
  );
}
