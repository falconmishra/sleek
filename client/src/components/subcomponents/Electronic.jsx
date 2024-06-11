import React from "react";
import s from "./Assest-Subcomponents/Electronic_Main.jpg";
import Row2 from "../Row2";
import { Link } from "react-router-dom";
import { GiClick } from "react-icons/gi";

export default function Electronic() {
  return (
    <div className="w-full bg-gradient-to-r to-[#FED8FF]  from-[#D1EEFF] bg-opacity-30 p-6 flex flex-col gap-8 ">
      <div className="flex gap-8 lg:px-8 items-center">
        <div className="h-[26rem] flex-1 w-[42rem] rounded-xl">
          <img
            src={s}
            className="w-full rounded-xl h-full object-center object-cover"
            alt=""
          />
        </div>
        <div className="flex-1 h-full lg:p-6 flex gap-2 flex-col justify-center">
          <h2 className="font-semibold text-3xl">
            Deals on <span className="font-semibold text-gd">Electronics</span>{" "}
            like never before
          </h2>
          <p className="lg:text-[14px] text-[12px] text-gray-600 lg:leading-7 ">
            Upgrade your tech game with our unbeatable deals: up to 65% off on
            electronics! From the latest smartphones and laptops to
            high-performance gadgets and accessories, find everything you need
            at a fraction of the cost. Don't wait – these offers won't last
            long. Shop now and enjoy cutting-edge technology at incredible
            prices!
          </p>
          <button className=" lg:text-[14px] w-fit  text-[12px] hover:bg-purple-500/90 transition-all duration-300 gap-1 rounded-lg text-white bg-purple-600">
            <Link
              to="getProductByCategory?category=Electronics"
              className="p-2 flex items-center"
            >
              Explore Now
              <GiClick />
            </Link>
          </button>
        </div>
      </div>
      <div>
        <Row2
          className=""
          title={"Buy your favorite gadgets"}
          category={"Electronics"}
        ></Row2>
      </div>
    </div>
  );
}
