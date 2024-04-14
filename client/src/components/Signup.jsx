import React, { useState } from "react";
import "../css/signup.css";
import "../css/btn.css";
import login from "../images/login.jpg";
import axios from "../axiosbase";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [contact, setContact] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/v1/auth/register", {
        username,
        email: email.toLowerCase(),
        password,
        address,
        contact,
        pincode,
      })

      .then((res) => {
        console.log(res);
        if (res.data.success == true) {
          toast.success(res.data.message);
          navigateTo("/login");
        } else {
          toast(res.data.message || res.data.error);
        }
      })
      .catch((error) => {
        console.log("error in registering ", error);
      });
  };
  return (
    <div className="login-h h-fit">
      <div className="contain h-fit p-2">
        <div className="conatinerone">
          <img src={login} alt="" />
        </div>
        <div className="containertwo">
          <h1>Welcome</h1>
          <div className="cc">
            <h2>Signup Your account</h2>
            <div className="comp">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Name"
                required
              />
            </div>
            <div className="comp">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email"
                required
              />
            </div>

            <div className="comp">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
                required
              />
            </div>
            <div className="comp">
              <input
                type="tel"
                value={contact}
                min={10}
                onChange={(e) => setContact(e.target.value)}
                placeholder="Contact"
                required
              />
            </div>
            <div className="comp border ">
              <input
                id="myTextArea"
                name="address"
                value={address}
                required
                placeholder="Address"
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="comp">
              <input
                type="number"
                value={pincode}
                onChange={(e) => setPincode(e.target.value)}
                placeholder="Pincode"
                required
              />
            </div>
            <button className="btn2 btnlog" onClick={handleSubmit}>
              Register
            </button>

            <h3 className="cursor-pointer" onClick={() => navigateTo("/login")}>
              Already have an account?
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
};
