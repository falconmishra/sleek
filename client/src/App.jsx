import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import { Login } from "./components/Login";
import { Signup } from "./components/Signup";
import { Home } from "./components/Home";
import { Navbar } from "./components/Navbar";
import { Footer } from "./components/Footer";
import {AddProduct} from "./components/AddProduct" 
import {Dashboard} from "./components/Dashboard"
import {PageUnavailable} from "./components/PageUnavailable"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { SearchResult } from "./components/SearchResult";
import { Cart } from "./components/Cart";
import { ProductDetails } from "./components/ProductDetails";
import {Billing} from "./components/Billing"

function App() {
  return (
    
    <BrowserRouter>
    <div className="flex flex-col">
    <Navbar/>
        <div className="container bg-wh2 min-h-screen min-w-screen flex justify-center items-center" >
      <Routes>

       <Route index element={<Home />} />
       <Route path="/login" element={<Login />} />
       <Route path="/signup" element={<Signup />} />
       <Route path="/addproduct" element={<AddProduct />} />
       <Route path="/dashboard" element={<Dashboard />} />
       <Route path="/pagenotfound" element={<PageUnavailable />} />
       <Route path="/searchresult" element={<SearchResult />} />
       <Route path="/cart" element={<Cart />} />
       <Route path="/productdetails" element={<ProductDetails />} />
       <Route path="/productdetails" element={<ProductDetails />} />
       <Route path="/billing" element={<Billing />} />
      </Routes>
        </div>
      <Footer/>
    </div>
    </BrowserRouter>
  );
}

export default App;
