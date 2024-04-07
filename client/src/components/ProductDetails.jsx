import React, { useEffect, useState } from "react";
import { FaStar, FaCartPlus, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/css2.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../Slice/cartSlice";
import axios from "../axiosbase";

import { useLocation } from "react-router-dom";

export const ProductDetails = (match) => {
  // const clicked = useSelector((state) => state.clicked.product);
  const [clicked, setClicked] = useState({
    name: "",
    company: "",
    price: 0,
    MRP: 0,
    rating: 0,
    description: "",
    photo: "",
    category: [],
    // Add other properties as needed
  });
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItemToCart(clicked));
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug");

  useEffect(() => {
    let fetchdata = async () => {
      let res = await axios.get(`product/getproduct/${slug}`);
      setClicked(res.data.product);
      console.log(clicked);
    };
    fetchdata();
  }, [slug]);

  return (
    <div className=" bg-white px-32 py-12 my-6 h-fit flex justify-center gap-12 rowcol">
      {!clicked ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="img-container gap-2 flex flex-col ">
            <img className="w-[24rem]" src={clicked.photo} alt="" />
            <div className="flex sub-images"></div>
          </div>

          <div className="details flex flex-col gap-2">
            <div>
              <h2 className="text-2xl font-bold">{clicked.name}</h2>
            </div>
            <div className="text-g1 text-xl">{clicked.company}</div>
            <div className="flex justify-between">
              <div className="flex items-baseline gap-2">
                <span className="text-[1.5rem] text-purp">
                  ${clicked.price}
                </span>
                <span className="line-through text-[grey]">${clicked.MRP}</span>
                <span className="text-green-500">
                  {" "}
                  {Math.floor(100 - (clicked.price / clicked.MRP) * 100) || 5}%
                  off
                </span>
              </div>
              <div className="flex w-fit gap-1 items-center justify-end text-purp text-[1.25rem]">
                {clicked.rating} <FaStar />
              </div>
            </div>
            <div className="w-fill max-w-96 text-[.775rem] flex flex-col gap-2">
              <span className="text-[1rem] font-medium">Product Details</span>
              {clicked.description}
            </div>
            <div className="w-fill max-w-96 text-[.775rem] flex flex-col gap-2">
              <span className="text-[1rem] font-medium">Key Highlights</span>
              <ul className="list-disc">
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Inventore rem vero sit!
                </li>
                <li>
                  Lorem ipsum dolor sit, amet consectetur adipisicing elit.
                  Voluptatem, error.
                </li>
                <li>Lorem, ipsum.</li>
                <li>Lorem ipsum dolor sit amet.</li>
              </ul>
            </div>
            <div>
              Delivery in <span>{clicked.deliverIn || "7"}</span> days
            </div>
            <div className="flex gap-2 justify-center my-2">
              <button
                onClick={addToCart}
                className="btn2 flex flex-1  items-center justify-center  p-1 text-[1.25rem] gap-3 text-wh1 bg-b1 p-3 hover:opacity-90  rounded-full"
              >
                <Link
                  to="/cart"
                  className="flex justify-center items-center gap-3"
                >
                  {" "}
                  Add to cart <FaCartPlus />{" "}
                </Link>
              </button>
              <button className="btn1 flex p-1 text-wh1 text-[1.25rem]  items-center justify-center btn1 p-1 hover:opacity-90 gap-3 flex-1 rounded-full">
                Buy Now <FaDollarSign />
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};
