import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  decreaseItemQuan,
  increaseItemQuan,
  removeItemFromCart,
} from "../Slice/cartSlice";

function CartCard({ product }) {
  const cart = useSelector((state) => state.cart);
  const dispatch = useDispatch();
  const removefromcCart = () => {
    dispatch(removeItemFromCart(product));
  };
  return (
    <div class="justify-between mb-6 rounded-lg bg-white p-6 shadow-md sm:flex sm:justify-start">
      <img
        src={product.photo}
        alt={product.name}
        class="w-full rounded-lg sm:w-40"
      />
      <div class="sm:ml-4 sm:flex sm:w-full sm:justify-between">
        <div class="mt-5 sm:mt-0">
          <h2 class="text-lg font-bold text-gray-900">{product.name}</h2>
          <p class="mt-1 text-xs text-gray-700">{product.company}</p>
        </div>
        <div class="mt-4 flex justify-between sm:space-y-6 sm:mt-0 sm:block sm:space-x-6">
          <div class="flex items-center border-gray-100">
            <span
              onClick={() => {
                dispatch(decreaseItemQuan(product));
              }}
              class="cursor-pointer rounded-l bg-gray-100 py-1 px-3.5 duration-100 hover:bg-purp hover:text-blue-50"
            >
              {" "}
              -{" "}
            </span>
            <input
              class="h-8 w-8 border bg-white text-center text-xs outline-none"
              type="number"
              value={product.quan}
              min="1"
            />
            <span
              onClick={() => {
                dispatch(increaseItemQuan(product));
              }}
              class="cursor-pointer rounded-1 bg-gray-100 py-1 px-3 duration-100 hover:bg-purp hover:text-blue-50"
            >
              {" "}
              +{" "}
            </span>
          </div>
          <div class="flex items-center space-x-4">
            <p class="text-sm">${product.price}</p>
            <svg
              onClick={removefromcCart}
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              class="h-5 w-5 cursor-pointer duration-150 hover:text-red-500"
            >
              <path
                stroke-linecap="round"
                strokeLinejoin="round"
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CartCard;
