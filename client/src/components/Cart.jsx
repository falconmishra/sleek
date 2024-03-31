import React from "react";
import "../css/cart.css";
import "../css/btn.css";

import CartCard from "./CartCard";
import { useDispatch, useSelector } from "react-redux";
export const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const total = useSelector((state) => state.cart.TotalPrice);

  return (
    <div class="h-screen bg-gray-100 pt-20 w-full">
      <h1 class="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div class="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div class="rounded-lg flex flex-col  justify-center md:w-2/3">
          {cart.length ? (
            cart.map((item) => <CartCard key={item.id} product={item} />)
          ) : (
            <p className="w-full flex justify-center">
              Your shopping cart is empty.
            </p>
          )}
        </div>

        <div class="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">${total}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <p class="text-gray-700">$4.99</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">${total + 4.99} USD</p>
              <p class="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          <button class="mt-6 w-full rounded-md bg-purp py-1.5 font-medium text-blue-50 hover:bg-purp2">
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};
