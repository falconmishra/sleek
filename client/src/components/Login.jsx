import React, { useState } from "react";
import "../css/login.css";
import "../css/btn.css";
import login from "../images/login.jpg";
import axios from "../axiosbase";
import { useNavigate } from "react-router-dom";

import { useSelector, useDispatch } from "react-redux";

import { setAuth, setUser } from "../Slice/userSlice";
import toast from "react-hot-toast";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const user = useSelector((state) => state.user.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    axios
      .post("/auth/login", { email, password })
      .then((res) => {
        if (res.data.success) {
          toast.success(res.data.message);
          navigate("/");
          console.log(res);
          dispatch(setUser(res.data.user));
          if (res.data.token) {
            dispatch(setAuth(true));
          }
        }
      })
      .catch((error) => toast.e(error));
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
            <button className="btn2 btnlog" onClick={handleSubmit}>
              Login
            </button>

            <h3>Create an account</h3>
            <h4>Forgot password?</h4>
          </div>
        </div>
      </div>
    </div>
  );
};
