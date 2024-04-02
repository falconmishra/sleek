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
import { Admin } from "./components/Admin";
import { Contact } from "./components/contact";
import RemoveProduct from "./components/removeProduct";
import { useSelector } from "react-redux";

import { Toaster } from "react-hot-toast";
import SetCategories from "./components/SetCategories";

function App() {
  const user = useSelector((state) => state.user);
  return (
    <BrowserRouter>
      <div className="flex flex-col w-full min-h-fit">
        <Navbar />
        <div className="container bg-wh2 min-h-screen min-w-full flex justify-center items-center">
          <Routes>
            {user.isAdmin ? (
              <>
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/addproduct" element={<AddProduct />} />
                <Route path="/setCategories" element={<SetCategories />} />
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pagenotfound" element={<PageUnavailable />} />
                <Route path="/searchresult" element={<SearchResult />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/productdetails" element={<ProductDetails />} />
                <Route path="/billing" element={<Billing />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<PageUnavailable />} />
              </>
            ) : (
              <>
                <Route index element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/admin" element={<Admin />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/pagenotfound" element={<PageUnavailable />} />
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
