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
    return (
      <div>
        <div class="flex items-center mb-5">
          <p class="bg-blue-100 text-blue-800 text-sm font-semibold inline-flex items-center p-1.5 rounded dark:bg-blue-200 dark:text-blue-800">
            8.7
          </p>
          <p class="ms-2 font-medium text-gray-900 dark:text-white">
            Excellent
          </p>
          <span class="w-1 h-1 mx-2 bg-gray-900 rounded-full dark:bg-gray-500"></span>
          <p class="text-sm font-medium text-gray-500 dark:text-gray-400">
            376 reviews
          </p>
          <a
            href="#"
            class="ms-auto text-sm font-medium text-blue-600 hover:underline dark:text-blue-500"
          >
            Read all reviews
          </a>
        </div>
        <div class="gap-8 sm:grid sm:grid-cols-2">
          <div>
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Staff
              </dt>
              <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                  <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 88%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  8.8
                </span>
              </dd>
            </dl>
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Comfort
              </dt>
              <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                  <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 89%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  8.9
                </span>
              </dd>
            </dl>
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Free WiFi
              </dt>
              <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                  <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 88%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  8.8
                </span>
              </dd>
            </dl>
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Facilities
              </dt>
              <dd class="flex items-center">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                  <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 54%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  5.4
                </span>
              </dd>
            </dl>
          </div>
          <div>
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Value for money
              </dt>
              <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                  <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 89%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  8.9
                </span>
              </dd>
            </dl>
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Cleanliness
              </dt>
              <dd class="flex items-center mb-3">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                  <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 70%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  7.0
                </span>
              </dd>
            </dl>
            <dl>
              <dt class="text-sm font-medium text-gray-500 dark:text-gray-400">
                Location
              </dt>
              <dd class="flex items-center">
                <div class="w-full bg-gray-200 rounded h-2.5 dark:bg-gray-700 me-2">
                  <div
                    class="bg-blue-600 h-2.5 rounded dark:bg-blue-500"
                    style="width: 89%"
                  ></div>
                </div>
                <span class="text-sm font-medium text-gray-500 dark:text-gray-400">
                  8.9
                </span>
              </dd>
            </dl>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="card bg-white  h-fit w-48 xl:w-72 p-2 rounded-xl cursor-default hover:scale-[101%] transition-all duration-200">
      <div>
        <img
          className=" w-full h-40 xl:h-64 object-cover object-center "
          src={product.photo}
        />
      </div>

      <div>
        <div className="flex mt-3">
          <span
            className="flex-auto md:text-[1.15rem]  font-semibold truncate"
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
          <div className="flex flex-col ">
            {/* <p className="text-g1">{product.company || "Company"}</p> */}
            {/* <p className="text-g1 w-fit font-right text-sm rounded-md px-1 text-purp2">
              #{product.categoryName || "Category"}
            </p> */}
          </div>
          <div className="flex gap-1 items-center">
            <span className="lg:text-[1.25rem] sm:text-[1rem] gdc1 font-medium text-gd ">
              ₹{product.price}
            </span>
            <span className="lg:text-[1.05rem] sm:text-[.8rem] line-through text-[grey] ">
              ₹{product.MRP || "MRP"}
            </span>
            <span
              className={`text-purp2 text-[11px]  lg:text-[14px]
              ${
                discount >= 50
                  ? "bg-purp3 text-[12px] lg:text-[16px]  rounded-full px-[4px] truncate "
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
            class="flex justify-between items-center gap-2 rounded-md bg-slate-900 px-5 py-1.5 lg:py-2.5 text-center text-[12px] lg:text-sm font-medium text-white hover:bg-gray-700 "
          >
            <FaShoppingCart className="text-[19px]" />
            <span className="hidden lg:flex">Add to cart</span>
          </button>
          <button
            onClick={handleBuyNow}
            class="flex items-center text-[12px] justify-center rounded-md bg-purp2 px-5 py-1.5 lg:py-2.5 transition-all duration-200 text-center lg:text-sm font-medium text-white hover:bg-purp "
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
};
