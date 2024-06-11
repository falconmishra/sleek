import React, { useState } from "react";
import "../css/signup.css";
import "../css/btn.css";
import { useSelector } from "react-redux";
import axios from "../axiosbase";
import { useNavigate, Link } from "react-router-dom";
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
    // axios
    //   .post("/auth/register", {
    //     username,
    //     email: email.toLowerCase(),
    //     password,
    //     address,
    //     contact,
    //     pincode,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     if (res.data.success == true) {
    //       toast.success(res.data.message);
    //       navigateTo("/login");
    //     } else {
    //       toast(res.data.message || res.data.error);
    //     }
    //   })
    //   .catch((error) => {
    //     console.log("error in registering ", error);
    //   });

    toast.promise(
      axios.post("/auth/register", {
        username,
        email: email.toLowerCase(),
        password,
        address: address + " " + pincode,
        contact,
      }),
      {
        loading: "Registering user",
        success: (res) => {
          if (res.data.success) {
            navigateTo("/login");
            return res.data.message;
          } else {
            throw new Error(res.data.message || "Unknown error");
          }
        },
        error: "Error in registering",
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

        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
              Get your free account now.
            </h1>
            <p className="mt-4 text-gray-500 ">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>
            <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2 mb-7">
              <div>
                <label className="block mb-2 text-sm  text-gray-700">
                  User Name
                </label>
                <input
                  required
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="block w-full px-5 py-3 mt-2   bg-white border border-gray-200 rounded-md   text-gray-700   focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm  text-gray-700">
                  Contact
                </label>
                <input
                  type="text"
                  inputMode="numeric"
                  required
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
                  className="block w-full px-5 py-3 mt-2   bg-white border border-gray-200 rounded-md   text-gray-700text-gray-700  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-gray-700">
                  Address
                </label>
                <input
                  type="text"
                  value={address}
                  required
                  onChange={(e) => setAddress(e.target.value)}
                  className="block w-full px-5 py-3 mt-2   bg-white border border-gray-200 rounded-md   text-gray-700  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm  text-gray-700">
                  Pincode
                </label>
                <input
                  type="text"
                  required
                  value={pincode}
                  onChange={(e) => setPincode(e.target.value)}
                  className="block w-full px-5 py-3 mt-2   bg-white border border-gray-200 rounded-md   text-gray-700  focus:border-blue-400  focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                />
              </div>

              <div>
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
            </div>
            <button
              className="flex m-auto items-center justify-center w-1/2 px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-purp rounded-md hover:bg-purp2   focus:outline-none focus:ring focus:ring-purp3 focus:ring-opacity-50"
              onClick={handleSubmit}
            >
              <span>Sign Up </span>
            </button>
            <div className="w-full text-center mt-4">
              Already a user?{" "}
              <Link className="text-purp" to="/login">
                Login
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
