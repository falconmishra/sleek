import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import { AddProduct } from "./components/AddProduct";
import { Dashboard } from "./components/Dashboard";
import { PageUnavailable } from "./components/PageUnavailable";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchResult } from "./components/SearchResult";
import { Cart } from "./components/Cart";
import { ProductDetails } from "./components/ProductDetails";
import { Billing } from "./components/Billing";
import { Admin } from "./components/Admin";
import { Contact } from "./components/contact";
import RemoveProduct from "./components/removeProduct";
import { useSelector } from "react-redux";
import Orders from "./components/Orders";
import ManageOrders from "./components/ManageOrders";

import { Toaster } from "react-hot-toast";
import SetCategories from "./components/SetCategories";
import ForgetPassword from "./components/ForgetPassword";
import EditProduct from "./components/EditProduct";
import "./App.css";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import axios from "./axiosbase";

import {
  setAuth,
  setUser,
  setAdmin,
  setContact,
  setPincode,
} from "./Slice/userSlice";
import { useEffect } from "react";
import ResetPassword from "./components/ResetPassword";
import GetUsers from "./components/GetUsers";
// Get the value of the 'token' cookie

function App() {
  const token = Cookies.get("token");
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  useEffect(() => {
    const setUser1 = async () => {
      if (token) {
        try {
          let res = await axios.get(`/auth/getUserByToken/${token}`);
          dispatch(setUser(res.data.user));
          dispatch(setContact(res.data.user.contact));
          dispatch(setPincode(res.data.user.pincode));
          if (res.data.isAdmin == true) {
            dispatch(setAdmin(true));
          }
          if (res.data.token) {
            dispatch(setAuth(res.data.user.id));
          }
        } catch (error) {
          console.error("Error while fetching user:", error);
          // Clear user data on error or when token is invalid
          dispatch(setUser(null));
          dispatch(setAdmin(false));
          dispatch(setAuth(null));
          // Remove token cookie
          Cookies.remove("token");
        }
      } else {
        // Clear user data if token is not present
        dispatch(setUser(null));
        dispatch(setAdmin(false));
        dispatch(setAuth(null));
      }
    };

    setUser1();
  }, [token, dispatch]);
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full min-h-fit">
        <Navbar />
        <div className="container bg-wh2 h-fit min-h-screen min-w-full flex justify-center items-center ">
          <Routes>
            {user.isAdmin ? (
              <>
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/manageOrders" element={<ManageOrders />} />
                <Route path="/removeProduct" element={<RemoveProduct />} />
                <Route path="/setCategories" element={<SetCategories />} />
                <Route path="/editProduct" element={<EditProduct />} />
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/getUsers" element={<GetUsers />} />

                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pagenotfound" element={<PageUnavailable />} />
                <Route path="/searchresult" element={<SearchResult />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/productdetails" element={<ProductDetails />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="*" element={<PageUnavailable />} />
              </>
            ) : (
              <>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/forgetPassword" element={<ForgetPassword />} />
                <Route path="/reset-password" element={<ResetPassword />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pagenotfound" element={<PageUnavailable />} />
                <Route path="/orders" element={<Orders />} />
                <Route path="/searchresult" element={<SearchResult />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/productdetails" element={<ProductDetails />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageUnavailable />} />
              </>
            )}
          </Routes>
        </div>
        <Footer />
      </div>
      <Toaster />
    </BrowserRouter>
  );
}

export default App;
