import React, { useState } from "react";
import "../css/login.css";
import "../css/btn.css";
import axios from "../axiosbase";
import { Button } from "@mui/material";

import { useNavigate, Link } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";
import manWomanImage from "../images/man-woman.jpeg";
import TextField from "@mui/material/TextField";
import {
  setAuth,
  setUser,
  setAdmin,
  setPincode,
  setContact,
} from "../Slice/userSlice";
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    let res = await toast.promise(
      axios.post("/auth/login", {
        email: email.toLowerCase(),
        password,
      }),
      {
        loading: "Logging in...",
        success: (res) => {
          navigate("/");
          document.cookie = `token=${res.data.token}`;

          dispatch(setUser(res.data.user));
          if (res.data.user && res.data.user.pincode) {
            dispatch(setPincode(res.data.user.pincode));
          }

          if (res.data.user && res.data.user.contact) {
            dispatch(setContact(res.data.user.contact));
          }
          if (res.data.isAdmin == true) {
            dispatch(setAdmin(true));
          }
          if (res.data.token) {
            dispatch(setAuth(res.data.user.id));
          }
          return "Logged in successfully";
        },
        error: (err) => {
          return err.response.data.message;
        },
      }
    );
  };
  const auth = useSelector((state) => state.user);
  if (auth.isAuthenticated) {
    return <h4>You are already logged in</h4>;
  }

  return (
    <section className="bg-white w-full">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-4/5 bg-lap"></div>

        <div className="flex items-center w-full max-w-3xl px-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full flex flex-col">
            <div className="text-center self-center  w-fit">
              <h2 className="lobster gdc1 text-[42px] cursor-pointer">Sleek</h2>
            </div>
            <h1 className="text-2xl text-center font-semibold tracking-wider text-gray-800 capitalize ">
              Good to see you back :)
            </h1>

            <p className="mt-4 text-gray-500 ">
              Let’s get you all set up so you can verify your personal account
              and begin shopping for your loved ones.
            </p>
            <div className="flex flex-col items-center">
              <form className="grid w-full grid-cols-1 gap-6 lg:w-96 mt-8 ">
                <div className="w-full flex flex-col justify-start ">
                  <label className="block mb-2 text-sm  text-gray-700">
                    Email
                  </label>
                  <input
                    type="email"
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    className="block w-full px-5 py-3 mt-2   bg-white border border-gray-200 rounded-md   text-gray-700  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div>
                  <label className="block mb-2 text-sm text-gray-700">
                    Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-5 py-3 mt-2   bg-white border border-gray-200 rounded-md   text-gray-700  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
              </form>
              <button
                className="flex w-1/2 mt-10 items-center justify-center px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purp rounded-md hover:bg-purp2 focus:outline-none focus:ring focus:purp3 focus:ring-opacity-50"
                onClick={handleSubmit}
              >
                <span>Login </span>
              </button>
              <div className="w-full text-center mt-4">
                <Link className="text-purp" to="/forgetpassword">
                  Forgot Password
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
