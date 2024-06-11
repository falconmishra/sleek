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
      <div className="flex-1 flex gap-4 flex-col h-full  items-center   lg:items-start justify-center">
        <h1 className="lg:text-3xl text-2xl  font-semibold">
          {" "}
          Min 30% off on <span className="text-gd font-semibold">Dresses</span>
        </h1>
        <p className="lg:text-[14px] text-[12px] ">
          Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eaque cum ad
          inventore similique asperiores tempora aspernatur quidem cupiditate,
          laborum quae atque quos sequi assumenda adipisci laboriosam deleniti
          sapiente obcaecati ipsum doloremque, commodi saepe? Consequuntur,
          reprehenderit ipsam optio quaerat nostrum a.
        </p>
        <button className="  hover:bg-purple-500/90 transition-all duration-300 gap-1 rounded-lg text-white bg-purple-600">
          <Link to="/explore" className="p-2 flex items-center">
            Explore Now
            <GiClick />
          </Link>
        </button>
      </div>
    </div>
  );
}
