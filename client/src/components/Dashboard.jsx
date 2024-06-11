import React from "react";
import "../css/dashboard.css"; // Assuming your custom CSS is here
import order from "../images/order.png";
import logint from "../images/logint.png";
import adress from "../images/adress.png";
import paymento from "../images/paymento.png";
import contact from "../images/contact.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "./subcomponents/Avatar";
import { FaBox } from "react-icons/fa";
import { IoLocation } from "react-icons/io5";
import { MdOutlineSecurity } from "react-icons/md";
import { IoCard } from "react-icons/io5";
import { MdConnectWithoutContact } from "react-icons/md";

export const Dashboard = () => {
  const user = useSelector((state) => state.user);

  const navigateTo = useNavigate();

  return (
    <div className="dashboard flex flex-col w-full h-full overflow-hidden bg-gray-100">
      {user && user.user ? (
        <>
          {user.isAdmin ? (
            <div className="adminContainer flex flex-col items-center mt-4 mb-8 px-8 py-4 bg-white rounded-lg shadow-md">
              <h1 className="text-2xl font-bold text-gray-800">
                Admin Controls
              </h1>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-purple-700 text-white hover:bg-purple-800"
                  onClick={() => navigateTo("/setCategories")}
                >
                  Set Categories
                </div>
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-purple-700 text-white hover:bg-purple-800"
                  onClick={() => navigateTo("/addProduct")}
                >
                  Add Product
                </div>
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-purple-700 text-white hover:bg-purple-800"
                  onClick={() => navigateTo("/removeProduct")}
                >
                  Manage Product
                </div>
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-purple-700 text-white hover:bg-purple-800"
                  onClick={() => navigateTo("/manageOrders")}
                >
                  Manage Orders
                </div>
                <div
                  className="box cursor-pointer h-32 w-64 rounded-lg flex items-center justify-center bg-purple-700 text-white hover:bg-purple-800"
                  onClick={() => navigateTo("/getUsers")}
                >
                  Manage Users
                </div>
              </div>
            </div>
          ) : null}

          <div className="user-details  pb-4 flex flex-col gap-4 bg-white rounded-lg shadow-md">
            <div className="relative bg-purple-500/25 h-32 mb-16">
              <div className="absolute bottom-[-14%] left-[50%] transform -translate-x-1/2 scale-[2.2]">
                <Avatar alpha={user.user.username[0]} />
              </div>
            </div>
            <div className="lg:px-24 px-4">
              <div className="hello lg:pb-16 text-xl font-bold text-gray-800">
                <h1 className="text-center text-2xl mb-6">
                  Here's a cookie 🍪, for {user.user.username} cutie 😚
                </h1>
              </div>
              <div className="w-full border-b border-gray-300 pb-3">
                <h2 className="text-lg font-bold text-gray-800 mb-2">
                  User Details
                </h2>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-700">Username:</p>
                <p className="text-gray-600">{user.user.username}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-700">E-Mail:</p>
                <p className="text-gray-600">{user.user.email}</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="font-semibold text-gray-700">Contact:</p>
                <p className="text-gray-600">{user.user.contact}</p>
              </div>

              <div className="flex justify-between items-center">
                <p className="font-semibold text-gray-700">Address:</p>
                <p className="text-right text-gray-600">
                  {user.user.address} {user.pincode || ""}
                </p>
              </div>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 my-8 px-8">
            <div className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg">
              <Link to="/orders" className="flex flex-col items-center gap-2">
                <FaBox className="text-[3rem] text-slate-700" />

                <div className="inn">
                  <h2 className="font-semibold text-[1.15rem] text-center ">
                    Your Orders
                  </h2>
                  <h4>Track, return, or buy things again</h4>
                </div>
              </Link>
            </div>
            <div className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg">
              <Link to="/login" className="flex flex-col items-center gap-2">
                <MdOutlineSecurity className="text-[3rem] text-slate-700" />
                <div className="inn">
                  <h2 className="font-semibold text-[1.15rem] text-center ">
                    Login & security
                  </h2>
                  <h4>Edit login, name, and mobile number</h4>
                </div>
              </Link>
            </div>
            <div className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg">
              <div className="flex flex-col items-center gap-2">
                <IoLocation className="text-[3rem] text-slate-700" />

                <div className="inn">
                  <h2 className="font-semibold text-[1.15rem] text-center ">
                    Your Addresses
                  </h2>
                  <h4>{user.user.address}</h4>
                </div>
              </div>
            </div>
            <div className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg">
              <div className="flex flex-col items-center gap-2">
                <IoCard className="text-[3rem] text-slate-700" />
                <div className="inn">
                  <h2 className="font-semibold text-[1.15rem] text-center ">
                    Payment options
                  </h2>
                  <h4>Edit or add payment methods</h4>
                </div>
              </div>
            </div>
            <Link
              to="/contact"
              className="firstbox w-full sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/4 bg-white rounded-lg shadow-md p-4 flex flex-col items-center hover:shadow-lg"
            >
              <MdConnectWithoutContact className="text-[3rem] text-slate-700" />
              <div className="inn">
                <h2 className="font-semibold text-[1.15rem] text-center ">
                  Contact us
                </h2>
                <h4>Contact our support team</h4>
              </div>
            </Link>
          </div>
        </>
      ) : (
        <div className="flex items-center justify-center h-screen w-full">
          <p className="text-xl font-bold text-gray-800">Login to kr le ❤️de</p>
        </div>
      )}
    </div>
  );
};
