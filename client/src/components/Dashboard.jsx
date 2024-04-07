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
    <div className="count flex items-center justify-center">
      {user.user ? (
        <>
          <div className="hello">
            <h1>Hello, {user.user.username}</h1>
          </div>
          {user.isAdmin ? (
            <div className="adminContainer flex items-center flex-col flex-wrap ">
              <h1 className="text-2xl text-bold">Admin Controls</h1>
              <div className="flex">
                <div
                  className="cursor-pointer boxes h-32 w-64 rounded-lg flex items-center justify-center bg-g1 m-4 wrap"
                  onClick={() => navigateTo("/setCategories")}
                >
                  Set categories
                </div>
                <div
                  onClick={() => navigateTo("/addProduct")}
                  className="cursor-pointer boxes h-32 w-64 rounded-lg flex items-center justify-center bg-g1 m-4 wrap"
                >
                  Add Product
                </div>
                <div
                  className="cursor-pointer boxes h-32 w-64 rounded-lg flex items-center justify-center bg-g1 m-4 wrap"
                  onClick={() => navigateTo("/removeProduct")}
                >
                  Manage Product
                </div>
              </div>
            </div>
          ) : (
            <></>
          )}

          <div className="div flex-wrap flex">
            <div className="box">
              <div className="firstbox">
                <img src={order} />
                <div className="inn">
                  <h2>Your Orders</h2>
                  <h4>Track, return, or buy things again</h4>
                </div>
              </div>
              <div className="firstbox">
                <img src={logint} />
                <div className="inn">
                  <h2>Login & security</h2>
                  <h4>Edit login, name, and mobile number</h4>
                </div>
              </div>
              <div className="firstbox">
                <img src={adress} />
                <div className="inn">
                  <h2>Your Addresses</h2>
                  <h4>Edit addresses for orders and gifts</h4>
                </div>
              </div>
            </div>
            <div className="box">
              <div className="firstbox">
                <img src={paymento} />
                <div className="inn">
                  <h2>Payment options</h2>
                  <h4>Edit or add payment methods</h4>
                </div>
              </div>
              <Link to="/contact" className="firstbox">
                <img src={contact} />
                <div className="inn">
                  <h2>Contact us</h2>

                  <h4></h4>
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
