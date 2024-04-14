import React from "react";
import "../css/dashboard.css";
import order from "../images/order.png";
import logint from "../images/logint.png";
import adress from "../images/adress.png";
import paymento from "../images/paymento.png";
import contact from "../images/contact.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Dashboard = () => {
  const user = useSelector((state) => state.user);

  const navigateTo = useNavigate();
  return (
    <div className="count flex flex-col w-full overflow-x-hidden h-fit p-8 items-center justify-center">
      {user && user.user ? (
        <>
          <div className="hello">
            <h1>Hello, {user.user.username}</h1>
          </div>
          {user.isAdmin ? (
            <div className="adminContainer flex items-center flex-col">
              <h1 className="text-2xl font-bold">Admin Controls</h1>
              <div className="flex flex-wrap justify-center">
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-g1 m-4"
                  onClick={() => navigateTo("/setCategories")}
                >
                  Set Categories
                </div>
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-g1 m-4"
                  onClick={() => navigateTo("/addProduct")}
                >
                  Add Product
                </div>
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-g1 m-4"
                  onClick={() => navigateTo("/removeProduct")}
                >
                  Manage Product
                </div>
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-g1 m-4"
                  onClick={() => navigateTo("/manageOrders")}
                >
                  Manage Orders
                </div>
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-g1 m-4"
                  onClick={() => navigateTo("/getUsers")}
                >
                  Manage Users
                </div>
              </div>
            </div>
          ) : null}
          <h1 className="text-2xl font-bold mt-4 mb-3">User Controls</h1>{" "}
          <div className="flex flex-col gap-2">
            <div className="w-full flex justify-center ">
              <div className="userDetails min-h-fit pb-4 my-6 sm:w-full xl:w-3/4 items-center flex flex-col bg-gray-100 p-4 rounded-lg shadow-md">
                <div className="w-full border-b-2 border-gray-300 mb-3">
                  <h2 className="text-lg font-bold mb-2 w-full flex justify-center ">
                    User Details
                  </h2>
                </div>
                <div className="w-3/4 flex justify-between mb-2">
                  <p className="font-semibold ">Username:</p>
                  <p className="">{user.user.username}</p>
                </div>
                <div className="w-3/4 flex justify-between mb-2">
                  <p className="font-semibold">E-Mail:</p>
                  <p className="">{user.user.email}</p>
                </div>
                <div className="w-3/4 flex justify-between mb-2">
                  <p className="font-semibold">Contact:</p>
                  <p className="">{user.contact || "Not Found"}</p>
                </div>
                <div className="w-3/4 flex justify-between">
                  <p className="font-semibold">Address:</p>
                  <p className="text-right">
                    {user.user.address} {user.pincode || ""}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-4">
              <div className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-3 flex gap-2">
                <Link
                  to="/orders"
                  className="flex justify-start items-center gap-2"
                >
                  <img src={order} alt="Order Icon" />
                  <div className="inn">
                    <h2>Your Orders</h2>
                    <h4>Track, return, or buy things again</h4>
                  </div>
                </Link>
              </div>
              <div className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-3 flex gap-2">
                <img src={logint} alt="Login Icon" />
                <div className="inn">
                  <h2>Login & security</h2>
                  <h4>Edit login, name, and mobile number</h4>
                </div>
              </div>
              <div className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-3 flex gap-2">
                <img src={adress} alt="Address Icon" />
                <div className="inn">
                  <h2>Your Addresses</h2>
                  <h4>{user.user.address}</h4>
                </div>
              </div>
              <div className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-3 flex gap-2">
                <img src={paymento} alt="Payment Icon" />
                <div className="inn">
                  <h2>Payment options</h2>
                  <h4>Edit or add payment methods</h4>
                </div>
              </div>
              <Link
                to="/contact"
                className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 p-3 flex gap-2"
              >
                <img src={contact} alt="Contact Icon" />
                <div className="inn">
                  <h2>Contact us</h2>
                  <h4>Contact our support team</h4>
                </div>
              </Link>
            </div>
          </div>
        </>
      ) : (
        <div className="flex  items-center justify-center h-screen w-full">
          <p>Login to kr le ❤️de</p>
        </div>
      )}
    </div>
  );
};
