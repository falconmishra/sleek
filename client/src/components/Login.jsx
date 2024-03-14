import React, { useState } from "react";
import "../css/login.css";
import "../css/btn.css";
import login from "../images/login.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Cookies from "js-cookie";

export const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    axios
      .post(
        "http://localhost:8080/api/v1/auth/login",
        { email, password },
        { withCredntials: true, credentials: "include" }
      )
      .then((res) => {
        alert(res.data.message);
        if (res.data.success == true) {
          navigate("/");
          console.log(res);
          // Cookies.set("token", res.data.token);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="login-h">
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
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
