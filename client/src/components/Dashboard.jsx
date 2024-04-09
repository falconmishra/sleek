import React from "react";
import "../css/dashboard.css";
import order from "../images/order.png";
import logint from "../images/logint.png";
import adress from "../images/adress.png";
import paymento from "../images/paymento.png";
import contact from "../images/contact.png";
import offer from "../images/offer.png";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
export const Dashboard = () => {
  const user = useSelector((state) => state.user);
  console.log(user);
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
              </div>
            </div>
          ) : null}

          <div className="div flex flex-wrap justify-center">
            <div className="box">
              <div className="firstbox ">
                <Link
                  className="flex justify-center items-center gap-2"
                  to={"/orders"}
                >
                  <img src={order} alt="Order Icon" />
                  <div className="inn">
                    <h2>Your Orders</h2>
                    <h4>Track, return, or buy things again</h4>
                  </div>
                </Link>
              </div>
              <div className="firstbox">
                <img src={logint} alt="Login Icon" />
                <div className="inn">
                  <h2>Login & security</h2>
                  <h4>Edit login, name, and mobile number</h4>
                </div>
              </div>
              <div className="firstbox">
                <img src={adress} alt="Address Icon" />
                <div className="inn">
                  <h2>Your Addresses</h2>
                  <h4>{user.user.address}</h4>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="firstbox">
                <img src={paymento} alt="Payment Icon" />
                <div className="inn">
                  <h2>Payment options</h2>
                  <h4>Edit or add payment methods</h4>
                </div>
              </div>
              <Link to="/contact" className="firstbox">
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
        <p>Login to kr le ❤️de</p>
      )}
    </div>
  );
};
