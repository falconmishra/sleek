import React from "react";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/btn.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../Slice/cartSlice";
import { setClickedProduct } from "../Slice/clickedProductSlice";

export const Card = ({ product }) => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);
  const addToCart = () => {
    dispatch(addItemToCart(product));
  };
  const setClick = () => {
    dispatch(setClickedProduct(product));
  };

  return (
    <div className="bg-white h-fit w-72 p-2 rounded-xl cursor-default">
      <div>
        <img
          className=" w-full h-64 object-cover object-center rounded-lg"
          src={product.photo}
        />
      </div>

      <div>
        <div className="flex mt-3">
          <span
            className="flex-auto text-[1.15rem] font-semibold"
            onClick={setClick}
          >
            <Link to={`/productdetails?slug=${product.slug}`}>
              {product.name}
            </Link>
          </span>
          <div className="flex w-fit gap-1 items-center justify-end text-purp">
            {product.rating || "Rating"}
            <FaStar />
          </div>
        </div>

        <div>
          <p className="text-g1">{product.company || "Company"}</p>
          <div className="flex gap-1 items-center">
            <span className="text-[1.25rem] text-purp">${product.price}</span>
            <span className="line-through text-[grey]">
              ${product.MRP || "MRP"}
            </span>
            <span className="text-green-500">
              {Math.floor(100 - (product.price / product.MRP) * 100) || 5}% off
            </span>
          </div>
        </div>

        <div className="flex gap-2 justify-center my-2">
          <button
            onClick={addToCart}
            className="btn2 flex flex-1 items-center justify-center text-[1.5rem]  text-wh1 bg-b1 hover:opacity-90  rounded-full"
          >
            <Link className="p-3 w-full h-full flex items-center justify-center">
              <FaCartPlus />
            </Link>
          </button>

          <button className="bg-black flex-1  text-wh1  hover:opacity-90  rounded-full">
            <Link
              to="/billing"
              className="p-3 w-full h-full flex items-center justify-center"
            >
              Buy Now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
