import React, { useState } from "react";
import "../css/login.css";
import "../css/btn.css";
import { useNavigate } from "react-router-dom";

import { useSearchParams } from "react-router-dom";
import login from "../images/login.jpg";
import axios from "../axiosbase";
import toast from "react-hot-toast";

const ResetPassword = () => {
  {
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const [password, setPassword] = useState("");
    const [confrimpassword, setConfirmpassword] = useState("");
    const navigate = useNavigate();
    const handleSubmit = async () => {
      if (password !== confrimpassword) {
        toast.error("Password and confirm password should be same");
        return;
      }
      let res = axios.post(`/auth/reset-password/${token}`, {
        password,
      });
      toast.promise(res, {
        loading: "Resetting Password",
        success: (data) => {
          navigate("/login");
          return "Password Reseted Successfully";
        },
        error: (err) => {
          return "An error occurred while sending the email.";
        },
      });
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
              <h2>New Password</h2>
              <div className="comp">
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Enter new password"
                />
              </div>
              <div className="comp">
                <input
                  type="password"
                  value={confrimpassword}
                  onChange={(e) => setConfirmpassword(e.target.value)}
                  placeholder="Confirm new password"
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
};

export default ResetPassword;
