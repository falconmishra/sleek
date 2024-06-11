import React, { useState } from "react";
import "../css/login.css";
import "../css/btn.css";
import { useNavigate, Link } from "react-router-dom";

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
          return "Couldn't reset your password (Token might have expired).";
        },
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
      //         <h2>New Password</h2>
      //         <div className="comp">
      //           <input
      //             type="password"
      //             value={password}
      //             onChange={(e) => setPassword(e.target.value)}
      //             placeholder="Enter new password"
      //           />
      //         </div>
      //         <div className="comp">
      //           <input
      //             type="password"
      //             value={confrimpassword}
      //             onChange={(e) => setConfirmpassword(e.target.value)}
      //             placeholder="Confirm new password"
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
                Get access back to your account
              </h1>

              <p className="mt-4 text-gray-500  ">
                Enter a passsword which is mix of all cases alphabets,number and
                special character.
                <br />
                And please avoid AnglePriya2004 as password. We're tired of that
              </p>
              <div className="flex flex-col items-center">
                <form className="grid w-full grid-cols-1 gap-6 lg:w-96 mt-8 ">
                  <div className="w-full flex flex-col justify-start ">
                    <label className="block mb-2 text-sm  text-gray-700">
                      Password
                    </label>
                    <input
                      type="email"
                      value={password}
                      required
                      onChange={(e) => setPassword(e.target.value)}
                      className="block w-full px-5 py-3 mt-2   bg-white border border-gray-200 rounded-md   text-gray-700  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                  <div className="w-full flex flex-col justify-start ">
                    <label className="block mb-2 text-sm  text-gray-700">
                      Confrim Password
                    </label>
                    <input
                      type="email"
                      value={confrimpassword}
                      required
                      onChange={(e) => setConfirmpassword(e.target.value)}
                      className="block w-full px-5 py-3 mt-2   bg-white border border-gray-200 rounded-md   text-gray-700  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                    />
                  </div>
                </form>
                <button
                  className="flex w-1/2 mt-10 items-center justify-center px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purp rounded-md hover:bg-purp2 focus:outline-none focus:ring focus:purp3 focus:ring-opacity-50"
                  onClick={handleSubmit}
                >
                  <span>Reset Password </span>
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
};

export default ResetPassword;
