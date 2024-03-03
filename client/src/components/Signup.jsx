import React, { useState } from "react";
import "../css/signup.css";
import "../css/btn.css";
import login from "../images/login.jpg";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Signup = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [secretQuestion, setSecretQuestion] = useState("");

  const navigateTo = useNavigate();

  const handleSubmit = () => {
    axios
      .post("http://localhost:8080/api/v1/auth/register", {
        username,
        email,
        password,
        secretQuestion,
      })
      .then(() => {
        navigateTo("/login");
        alert(
          "Registered successfully. You can now login with your credentials"
        );
      })
      .catch((error) => {
        console.log("error in registering ", error);
      });
  };
  return (
    <div className="login-h">
      <div className="contain">
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
              />
            </div>
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
                type="text"
                value={secretQuestion}
                onChange={(e) => setSecretQuestion(e.target.value)}
                placeholder=" Your favorite sport"
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
              Register
            </button>

            <h3>Already have an account?</h3>
          </div>
        </div>
      </div>
    </div>
  );
};
