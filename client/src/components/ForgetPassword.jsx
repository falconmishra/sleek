import React, { useState } from "react";
import "../css/login.css";
import "../css/btn.css";
import { useNavigate } from "react-router-dom";
import login from "../images/login.jpg";
function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = () => {};
  return (
    <div className="login-h">
      <div className="contain">
        <div className="conatinerone">
          <img src={login} alt="" />
        </div>
        <div className="containertwo">
          <h1>Welcome Back</h1>
          <div className="cc">
            <h2>Your registered mail</h2>
            <div className="comp">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
              />
            </div>

            <button
              // variant="contained "
              className="btn2  bg-purp btnlog"
              onClick={handleSubmit}
            >
              Submit
            </button>

            <h3 className="cursor-pointer" onClick={() => navigate("/login")}>
              Login Now
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ForgetPassword;
