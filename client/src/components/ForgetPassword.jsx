import React, { useState } from "react";
import "../css/login.css";
import "../css/btn.css";
import { useNavigate, Link } from "react-router-dom";
import login from "../images/login.jpg";
import axios from "../axiosbase";
import toast from "react-hot-toast";

function ForgetPassword() {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();
  const handleSubmit = async () => {
    let res = axios.post(`/auth/forgot-password`, {
      email,
    });
    toast.promise(res, {
      loading: "Sending Mail",
      success: "Mail sent successfully, Check your inbox",
    });
  };
  return (
    // <div className="login-h">
    //   <div className="contain">
    //     <div className="conatinerone">
    //       <img src={login} alt="" />
    //     </div>
    //     <div className="containertwo">
    //       <h1>Welcome Back</h1>
    //       <div className="cc">
    //         <h2>Your registered mail</h2>
    //         <div className="comp">
    //           <input
    //             type="email"
    //             value={email}
    //             onChange={(e) => setEmail(e.target.value)}
    //             placeholder="Email"
    //           />
    //         </div>

    //         <button
    //           // variant="contained "
    //           className="btn2  bg-purp btnlog"
    //           onClick={handleSubmit}
    //         >
    //           Submit
    //         </button>

    //         <h3 className="cursor-pointer" onClick={() => navigate("/login")}>
    //           Login Now
    //         </h3>
    //       </div>
    //     </div>
    //   </div>
    // </div>

    <section className="bg-white w-full">
      <div className="flex justify-center min-h-screen">
        <div className="hidden bg-cover lg:block lg:w-4/5 bg-lap"></div>

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
              We all have bad memory :(
            </h1>

            <p className="mt-4 text-gray-500 ">
              Do you know? There is secret formula to crack passsword. Just try
              [Your_Crush_Name]_[Her/His_Birthday] <br />
              And if that doesn't work then enter your mail below
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
              </form>
              <button
                className="flex w-1/2 mt-10 items-center justify-center px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purp rounded-md hover:bg-purp2 focus:outline-none focus:ring focus:purp3 focus:ring-opacity-50"
                onClick={handleSubmit}
              >
                <span>Send Link </span>
              </button>
            </div>
            <div className="w-full text-center mt-4">
              <Link className="text-purp" to="/login">
                Log In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default ForgetPassword;
