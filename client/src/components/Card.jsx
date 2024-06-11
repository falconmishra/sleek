import React from "react";
import { FaStar, FaCartPlus, FaShoppingCart } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/btn.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../Slice/cartSlice";
import { setClickedProduct } from "../Slice/clickedProductSlice";
import { addOrder } from "../Slice/orderSlice";
import { useNavigate } from "react-router-dom";
import "../css/card.css";
import toast from "react-hot-toast";

const SkeletonCard = () => {
  return (
    <div className="card bg-gray-200 h-fit w-48 xl:w-72 p-2 rounded-xl animate-pulse">
      <div className="w-full h-40 xl:h-64 bg-gray-300"></div>
      <div className="mt-3">
        <div className="flex mb-2">
          <div className="flex-auto h-6 bg-gray-300 rounded"></div>
          <div className="w-16 h-6 bg-gray-300 rounded ml-2"></div>
        </div>
        <div className="mb-2">
          <div className="w-20 h-6 bg-gray-300 rounded"></div>
        </div>
        <div className="flex gap-1 items-center mb-2">
          <div className="w-10 h-6 bg-gray-300 rounded"></div>
          <div className="w-10 h-6 bg-gray-300 rounded ml-1"></div>
          <div className="w-10 h-6 bg-gray-300 rounded ml-1"></div>
        </div>
        <div className="flex gap-2 justify-center my-2">
          <div className="w-20 h-8 bg-gray-300 rounded"></div>
          <div className="w-20 h-8 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export const Card = ({ product }) => {
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const user = useSelector((state) => state.user);
  const addToCart = () => {
    dispatch(addItemToCart(product));
  };
  const setClick = () => {
    dispatch(setClickedProduct(product));
  };
  const discount = Math.floor(100 - (product.price / product.MRP) * 100) || 5;

  const handleBuyNow = (product, e) => {
    if (!user.user) {
      toast.error("Bhai login vogin krna ki nai");
      return;
    }
    let tempOrder = {
      username: user.user.username,
      phone: user.contact,
      address: user.user.address + " " + user.pincode,
      customerId: user.user.id,
      customerEmail: user.user.email,
      products: [
        {
          index: 0,
          productName: product.name,
          productPicture: product.photo,
          quantity: 1,
          price: product.price,
        },
      ],
      totalPrice: product.price + 5,
    };
    dispatch(addOrder(tempOrder));
    navigateTo("/billing");
  };

  if (!product) {
    return <SkeletonCard />;
  }

  return (
    <div className="card bg-white h-fit w-48 xl:w-72 p-2 rounded-xl cursor-default hover:scale-[101%] transition-all duration-200">
      <div>
        <img
          className="w-full h-40 xl:h-64 object-cover object-center"
          src={product.photo}
        />
      </div>
      <div>
        <div className="flex mt-3">
          <span
            className="flex-auto md:text-[1.15rem] font-semibold truncate"
            onClick={setClick}
          >
            <Link to={`/productdetails?slug=${product.slug}`}>
              {product.name}
            </Link>
          </span>
          <div className="flex w-fit bg-amber-100/50 px-2 rounded-md text-amber-300 gap-1 text-[12px] items-center lg:text-[16px] justify-end">
            {product.rating || "Rating"}
            <FaStar />
          </div>
        </div>
        <div>
          <div className="flex flex-col">
            {/* <p className="text-g1">{product.company || "Company"}</p> */}
            {/* <p className="text-g1 w-fit font-right text-sm rounded-md px-1 text-purp2">
              #{product.categoryName || "Category"}
            </p> */}
          </div>
          <div className="flex gap-1 items-center">
            <span className="lg:text-[1.25rem] sm:text-[1rem] gdc1 font-medium text-gd">
              ₹{product.price}
            </span>
            <span className="lg:text-[1.05rem] sm:text-[.8rem] line-through text-[grey]">
              ₹{product.MRP || "MRP"}
            </span>
            <span
              className={`text-purp2 text-[11px] lg:text-[14px] ${
                discount >= 50
                  ? "bg-purp3 text-[12px] lg:text-[16px] rounded-full px-[4px] truncate"
                  : ""
              }`}
            >
              {discount}% off
            </span>
          </div>
        </div>
        <div className="flex gap-2 justify-center my-2">
          <button
            onClick={addToCart}
            className="flex justify-between items-center gap-2 rounded-md bg-slate-900 px-5 py-1.5 lg:py-2.5 text-center text-[12px] lg:text-sm font-medium text-white hover:bg-gray-700"
          >
            <FaShoppingCart className="text-[19px]" />
            <span className="hidden lg:flex">Add to cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            className="flex items-center text-[12px] justify-center rounded-md bg-purp2 px-5 py-1.5 lg:py-2.5 transition-all duration-200 text-center lg:text-sm font-medium text-white hover:bg-purp"
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
