import React, { useState, useEffect } from "react";
import "../css/css1.css";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { FaRegUser } from "react-icons/fa";
import { GiHamburgerMenu } from "react-icons/gi";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useSelector, useDispatch } from "react-redux";
import cookie from "js-cookie";
import toast from "react-hot-toast";

import Badge from "@mui/material/Badge";

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
  return (
    <div
      className={
        navOpen
          ? `w-full max-w-screen h-fit bg-wh1  min-w-screen flex px-4 nav justify-between items-center sticky top-0 overflow-hidden`
          : ` bg-wh1 max-w-screen w-full min-w-screen flex px-4 nav justify-between items-center sticky top-0 overflow-hidden`
      }
    >
      <div className="logo-container w-full flex items-center justify-center flex-1">
        <Link to="/">
          {" "}
          <h2 className="lobster gdc1 text-[40px] cursor-pointer">Sleek</h2>
        </Link>
        <i className="ham" onClick={toggleNav}>
          <GiHamburgerMenu style={{ color: "Black", fontSize: "30px" }} />
        </i>
      </div>

      <div className="flex items-center justify-center gap-3 flex-1">
        <div className="flex bg-white  items-center rounded-lg search">
          <input
            className="focus:outline-none bg-transparent ml-3 inp"
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            name=""
            id=""
          />
          <div className="bg-purp hover:bg-purple-500 rounded-tr-lg rounded-br-lg p-1 ">
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

          <li className="hoverline">
            <Link className="navopts" to="/cart">
              Cart({cart.items.length})
            </Link>
          </li>
        </ul>
        <i className="user p-2 bg-slate-100 rounded-full">
          <Link to="/dashboard">
            <FaRegUser style={{ color: "black", fontSize: "20px" }} />
          </Link>
        </i>
      </div>
    </div>
  );
};
