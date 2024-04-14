import React, { useState } from "react";
import "../css/login.css";
import "../css/btn.css";
import login from "../images/login.jpg";
import axios from "axios";

import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

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
    // axios
    //   .post("http://localhost:8080/api/v1/auth/login", {
    //     email: email.toLowerCase(),
    //     password,
    //   })
    //   .then((res) => {
    //     if (res.data.success) {
    //       toast.success(res.data.message);
    //       navigate("/");
    //       document.cookie = `token=${res.data.token}`;
    //       dispatch(setUser(res.data.user));
    //       dispatch(setPincode(res.data.user.pincode));
    //       dispatch(setContact(res.data.user.contact));
    //       if (res.data.isAdmin == true) {
    //         dispatch(setAdmin(true));
    //       }
    //       if (res.data.token) {
    //         dispatch(setAuth(res.data.user.id));
    //       }
    //     } else {
    //       toast(res.data.message);
    //     }
    //   })
    //   .catch((error) => console.log(error));
    let res = await toast.promise(
      axios.post("http://localhost:8080/api/v1/auth/login", {
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

            console.log(res.data.user.pincode);
          }
          if (res.data.user && res.data.user.contact) {
            dispatch(setContact(res.data.user.contact));
            console.log(res.data.user.contact);
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
          return err.message;
        },
      }
    );
  };
  return (
    <div className="login-h">
      <div className="contain">
        <div className="conatinerone">
          <img src={login} alt="" />
        </div>
        <div className="containertwo">
          <h1>Welcome Back</h1>
          <div className="cc">
            <h2>Login Your account</h2>
            <div className="comp">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>
            <div className="comp">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
            </div>
            <button
              // variant="contained "
              className="btn2  bg-purp btnlog"
              onClick={handleSubmit}
            >
              Login
            </button>

            <h3 className="cursor-pointer" onClick={() => navigate("/signup")}>
              Create an account
            </h3>
            <h4
              className="cursor-pointer"
              onClick={() => navigate("/forgetPassword")}
            >
              Forgot password?
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};
