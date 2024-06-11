import React, { useState, useEffect } from "react";
import "../css/css1.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import {
  FaRegUser,
  FaShoppingBag,
  FaShoppingBasket,
  FaShoppingCart,
} from "react-icons/fa";
import { CgMenuRightAlt } from "react-icons/cg";
import { IoMdClose } from "react-icons/io";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie";
import toast from "react-hot-toast";

import "../css/navbar.css";
import { RiShoppingCart2Line } from "react-icons/ri";

import Avatar from "./subcomponents/Avatar";

export const Navbar = () => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [navOpen, setNavOpen] = useState(false);
  const dispatch = useDispatch();

  const [query, setQuery] = useState("");

  useEffect(() => {}, [isAuthenticated]);

  const toggleNav = () => {
    setNavOpen(!navOpen);
  };

  const handleLogout = () => {
    dispatch(clearUser());
    cookie.remove("token");

    toast.success("Successfully logged out!");
  };
  const cart = useSelector((state) => state.cart);
  let avatar = useSelector((state) => state.user);

  return (
    <div
      className={` bg-wh1 transition-all duration-700 max-w-screen w-full min-w-screen flex px-4 nav justify-between items-center sticky top-0 overflow-hidden z-20 ${
        navOpen ? "h-fit" : ""
      }`}
    >
      <div className="logo-container w-full flex items-center justify-center flex-1">
        <Link to="/">
          {" "}
          <h2 className="lobster gdc1 text-[40px] cursor-pointer">Sleek</h2>
        </Link>
        <i className="ham" onClick={toggleNav}>
          {!navOpen ? (
            <CgMenuRightAlt
              className="menu-icon text-b1 "
              style={{ fontSize: "30px", fontWeight: "bold" }}
            />
          ) : (
            <IoMdClose
              className="menu-icon text-b1 "
              style={{ fontSize: "30px", fontWeight: "bold" }}
            />
          )}
        </i>
      </div>

      <div className="flex items-center bar justify-center gap-3 flex-1">
        <div className="flex bg-white w-fit items-center rounded-lg search">
          <input
            className="focus:outline-none search-bar bg-transparent ml-3 inp"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name=""
            id=""
          />
          <div className="bg-purp  gdbg  rounded-tr-lg rounded-br-lg p-1 ">
            <Link to={`/searchresult?q=${query}`}>
              <CiSearch style={{ color: "white", fontSize: "30px" }} />
            </Link>
          </div>
        </div>
      </div>

      <div className="w-fit flex options gap-8 justify-center items-center flex-1">
        <ul className="flex gap-8 options w-fit">
          <li className="hoverline">
            <Link className="navopts" to="/">
              Home
            </Link>
          </li>
          <li className="hoverline">
            <Link className="navopts" to="/explore">
              Explore
            </Link>
          </li>

          {isAuthenticated ? (
            <li className="hoverline">
              <Link className="navopts" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          ) : (
            <>
              <li className="hoverline">
                <Link className="navopts" to="/login">
                  Login
                </Link>
              </li>
              <li className="hoverline">
                <Link className="navopts" to="/signup">
                  Signup
                </Link>
              </li>
            </>
          )}
        </ul>
        <i className=" p-1  rounded-full ">
          <Link className="navopts" to="/cart">
            {/* Cart({cart.items.length}) */}
            <div className="relative p-1 ">
              <p className="bg-red-500 not-italic text-center rounded-full text-white  text-[10px] w-3 absolute top-[-2px] right-0">
                {cart.items.length}
              </p>
              <RiShoppingCart2Line className="text-[22px] text-gd" />
            </div>
          </Link>
        </i>
        <i className=" p-2   rounded-full">
          <Link to="/dashboard">
            {!avatar || !avatar.user || !avatar.user.username ? (
              <FaRegUser className="text-gd" />
            ) : (
              <Avatar alpha={avatar.user.username[0]} />
            )}
          </Link>
        </i>
      </div>
    </div>
  );
};
