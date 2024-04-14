import React from "react";
import { FaStar, FaCartPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/btn.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../Slice/cartSlice";
import { setClickedProduct } from "../Slice/clickedProductSlice";
import { addOrder } from "../Slice/orderSlice";
import { useNavigate } from "react-router-dom";
import "../css/card.css";
import toast from "react-hot-toast";

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

  return (
    <div className="card bg-white h-fit w-48 xl:w-72 p-2 rounded-xl cursor-default hover:scale-[101%] transition-all duration-200">
      <div>
        <img
          className=" w-full h-40 xl:h-64 object-cover object-center rounded-lg"
          src={product.photo}
        />
      </div>

      <div>
        <div className="flex mt-3">
          <span
            className="flex-auto text-[1.15rem] font-semibold truncate"
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
          <div className="flex flex-col ">
            {/* <p className="text-g1">{product.company || "Company"}</p> */}
            {/* <p className="text-g1 w-fit font-right text-sm rounded-md px-1 text-purp2">
              #{product.categoryName || "Category"}
            </p> */}
          </div>
          <div className="flex gap-1 items-center">
            <span className="lg:text-[1.25rem] sm:text-[1rem] gdc1 font-medium text-purp">
              ₹{product.price}
            </span>
            <span className="lg:text-[1.05rem] sm:text-[.8rem] line-through text-[grey] ">
              ₹{product.MRP || "MRP"}
            </span>
            <span
              className={`text-purp sm:text-[10px]  lg:text-[16px]
              ${
                discount >= 50
                  ? "bg-purp3 sm:text-[10px] lg:text-[16px]  rounded-full px-[4px] truncate "
                  : ""
              }
              `}
            >
              {discount}% off
            </span>
          </div>
        </div>

        <div className="flex gap-2 justify-center my-2">
          <button
            onClick={addToCart}
            className="btn2 gdbg flex flex-1 items-center justify-center text-[1.5rem]  text-wh1 bg-b1 hover:opacity-90  rounded-full"
          >
            <Link className="lg:p-3 p-2  w-full h-full flex items-center justify-center">
              <FaCartPlus className="text-[15px] lg:text-[25px]" />
            </Link>
          </button>

          <button
            className="bg-black flex-1  text-wh1  hover:opacity-90  rounded-full"
            onClick={() => handleBuyNow(product)}
          >
            <Link className="lg:p-3 p-2  w-full text-[12px] h-full flex items-center justify-center">
              Buy Now
            </Link>
          </button>
        </div>
      </div>
    </div>
  );
};
