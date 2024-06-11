import React, { useEffect, useState } from "react";
import { clearOrders } from "../Slice/orderSlice";
import Button from "@mui/material/Button";
import axios from "../axiosbase";
import toast from "react-hot-toast";

import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import OrderSuccessful from "./OrderSuccessful";

export const Billing = () => {
  const dispatch = useDispatch();
  const order = useSelector((state) => state.order);
  const user = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [orderSuccess, setOrderSuccess] = useState(false);

  const handleOrder = async () => {
    const res = await toast.promise(
      axios.post(`/order/createOrder/${order.customerId}`, order),
      {
        loading: "Placing Order...",
        success: () => {
          setOrderSuccess(true);
          return "Order Placed successfully! Check your mail for details 🤗";
        },
        error: "Failed to place order. Please try again.",
      }
    );
  };
  const cancelOrder = () => {
    dispatch(clearOrders());
    navigate("/");
  };

  if (orderSuccess) {
    return <OrderSuccessful />;
  }

  if (!user.user) {
    return <div>Bhai login vogin krna ki nai</div>;
  }
  if (!order.products) {
    return <div>Loading</div>;
  }
  return (
    <div className="h-fit  w-full bg-gray-100 pt-20">
      <div className="mx-auto max-w-5xl justify-center px-6 m-6">
        <h1 className="mb-10 text-center text-2xl font-bold">
          Billing Details
        </h1>
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-lg font-semibold mb-4">Customer Information</h2>
          <div className="flex justify-between mb-4">
            <p className="text-gray-700">Customer Name :</p>
            <p>{order.username}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-700">Customer Email :</p>
            <p>{order.customerEmail}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-700">Customer Phone No. :</p>
            <p>{order.contac}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-700">Customer Address :</p>
            <p>{order.address}</p>
          </div>
          <div className="flex justify-between mb-4">
            <p className="text-gray-700">Mode of payment :</p>
            <div>
              <input type="radio" name="UPI" id="cod" checked />
              <label className="ml-1" htmlFor="cod">
                Cash on Delivery (COD)
              </label>
              <br />
              <input type="radio" name="UPI" id="upi" disabled />
              <label className="ml-1" htmlFor="upi">
                BHIM UPI/ Paytm/ PhonePe{" "}
              </label>
              <br />

              <input type="radio" name="UPI" id="NetBanking" disabled />
              <label className="ml-1" htmlFor="NetBanking">
                Net Banking
              </label>
              <br />

              <input type="radio" name="UPI" id="credit" disabled />
              <label className="ml-1" htmlFor="credit">
                Credit Card
              </label>
              <br />
              <input type="radio" name="UPI" id="deb" disabled />
              <label className="ml-1" htmlFor="dev">
                Debit Card
              </label>
              <br />
            </div>
          </div>

          <h2 className="text-lg font-semibold mt-8 mb-4">Products</h2>
          <div className="divide-y divide-gray-200">
            {Array.isArray(order.products) &&
              order.products.map((product, index) => (
                <div
                  key={index}
                  className="py-4 flex items-center justify-between"
                >
                  <div className="flex items-center">
                    <img
                      src={product.productPicture}
                      alt={product.name}
                      className="w-12 h-12 mr-4 object-cover object-center  "
                    />
                    <div>
                      <p className="text-gray-800">{product.productName}</p>
                      <p className="text-gray-600">
                        ₹ {product.price} x {product.quantity}
                      </p>
                    </div>
                  </div>
                  <p className="text-gray-800">
                    ₹ {product.price * product.quantity}
                  </p>
                </div>
              ))}
            <hr />
          </div>

          <div className="my-8">
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">Shipping:</p>
              <p>₹ 50</p>
            </div>
            <div className="flex justify-between mb-2">
              <p className="text-gray-700">Subtotal:</p>
              <p>₹ {order.totalPrice}</p>
            </div>
            <hr className="my-4" />
            <div className="flex justify-between">
              <p className="text-lg font-bold">Total:</p>
              <p className="text-lg font-bold">₹ {order.totalPrice}</p>
            </div>
          </div>
          <div className="w-full gap-6 flex items-center justify-center">
            <Button
              className="w-1/2 mt-8"
              variant="contained"
              sx={{
                bgcolor: "#8F00FF",
                "&:hover": {
                  bgcolor: "#7302cc", // Change this to the desired hover color
                },
              }}
              onClick={() => handleOrder()}
            >
              Place Order
            </Button>
            <Button
              className="w-1/2 mt-8"
              variant="outlined"
              sx={{
                borderColor: "#8F00FF",
                color: "#8F00FF",
                "&:hover": {
                  borderColor: "#7302cc", // Change this to the desired hover color
                },
              }}
              onClick={() => cancelOrder()}
            >
              Cancel Order
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};
