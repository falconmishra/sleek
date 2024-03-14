import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
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
<<<<<<< HEAD
import { Admin } from "./components/Admin";
=======
import { Contact } from "./components/contact";
>>>>>>> 7201ba046213f4ca7c0248ec8dfc68fb928c6090

function App() {
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full min-h-fit">
        <Navbar />
        <div className="container bg-wh2 min-h-screen min-w-full flex justify-center items-center">
          <Routes>
            <Route index element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/admin" element={<Admin />} />
            <Route path="/addproduct" element={<AddProduct />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/pagenotfound" element={<PageUnavailable />} />
            <Route path="/searchresult" element={<SearchResult />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/productdetails" element={<ProductDetails />} />
            <Route path="/billing" element={<Billing />} />
<<<<<<< HEAD
            <Route path="*" element={<PageUnavailable />} />
=======
            <Route path="/contact" element={<Contact/>} />
>>>>>>> 7201ba046213f4ca7c0248ec8dfc68fb928c6090
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;
