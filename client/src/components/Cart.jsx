import React, { useEffect } from "react";
import "../css/cart.css";
import "../css/btn.css";
import { useNavigate } from "react-router-dom";
import CartCard from "./CartCard";
import { useDispatch, useSelector } from "react-redux";
import { addOrder } from "../Slice/orderSlice";
import toast from "react-hot-toast";
export const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const user = useSelector((state) => state.user);
  const total = useSelector((state) => state.cart.TotalPrice);
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const shipping = cart.length === 0 ? 0 : 50.0;

  let tempOrder = null;

  const handleCheckout = () => {
    if (!user.user) {
      toast.error("Login kr le yaar please!");
    }
    if (user && user.user && user.user.id && cart) {
      tempOrder = {
        username: user.user.username,
        phone: user.contact,
        address: user.user.address + " " + user.pincode,
        customerId: user.user.id,
        customerEmail: user.user.email,
        products: cart.map((data, index) => ({
          index: index,
          productName: data.name,
          productPicture: data.photo,
          quantity: data.quan,
          price: data.price,
        })),
        totalPrice: total + shipping,
      };
    }
    if (tempOrder) {
      dispatch(addOrder(tempOrder));
      navigateTo("/billing");
    }
  };
  return (
    <div class="min-h-screen h-fit p-5 bg-gray-100 pt-20 w-full">
      <h1 class="mb-10 text-center text-2xl  font-bold">Cart Items</h1>
      <div class="mx-auto max-w-5xl min-h-fit justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div class="rounded-lg flex flex-col h-fit justify-center md:w-2/3">
          {cart.length ? (
            cart.map((item) => <CartCard key={item.id} product={item} />)
          ) : (
            <p className="w-full flex justify-center">
              Your shopping cart is empty.
            </p>
          )}
        </div>

        <div class="mt-6 h-full min-h-fit rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div class="mb-2 flex justify-between">
            <p class="text-gray-700">Subtotal</p>
            <p class="text-gray-700">₹{total}</p>
          </div>
          <div class="flex justify-between">
            <p class="text-gray-700">Shipping</p>
            <p class="text-gray-700">₹{shipping}</p>
          </div>
          <hr class="my-4" />
          <div class="flex justify-between">
            <p class="text-lg font-bold">Total</p>
            <div class="">
              <p class="mb-1 text-lg font-bold">₹{total + shipping} INR</p>
              <p class="text-sm text-gray-700">including GST</p>
            </div>
          </div>
          <button
            onClick={() => handleCheckout()}
            class="mt-6 w-full rounded-md bg-purp py-1.5 font-medium text-blue-50 hover:bg-purp2 transition-all transition-100"
          >
            Check out
          </button>
        </div>
      </div>
    </div>
  );
};
