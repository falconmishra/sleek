import React, { useEffect, useState } from "react";
import { FaStar, FaCartPlus, FaDollarSign } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../css/css2.css";
import { useDispatch, useSelector } from "react-redux";
import { addItemToCart } from "../Slice/cartSlice";
import axios from "../axiosbase";
import toast from "react-hot-toast";
import CircularProgress, {
  circularProgressClasses,
} from "@mui/material/CircularProgress";
import "../css/pd.css";
import Row3 from "./Row3";

import { useLocation } from "react-router-dom";
import { addOrder } from "../Slice/orderSlice";
import { useNavigate } from "react-router-dom";

export const ProductDetails = (match) => {
  // const clicked = useSelector((state) => state.clicked.product);
  const nav = useNavigate();
  const [clicked, setClicked] = useState({
    name: "",
    company: "",
    price: 0,
    MRP: 0,
    rating: 0,
    description: "",
    photo: "",
    category: [],
    // Add other properties as needed
  });
  const dispatch = useDispatch();
  const addToCart = () => {
    dispatch(addItemToCart(clicked));
  };
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("slug");
  const user = useSelector((state) => state.user);

  useEffect(() => {
    let fetchdata = async () => {
      let res = await axios.get(`product/getproduct/${slug}`);
      setClicked(res.data.product);
      window.scrollTo(0, 0);
    };
    fetchdata();
  }, [slug]);

  const requiredSize = ["men", "Kids"];

  const handleBuyNow = (product) => {
    if (!user.user) {
      toast.error("Bhai login vogin krna ki nai");
    } else if (product && user) {
      let tempOrder = {
        username: user.user.username,
        phone: user.contact,
        address: user.user.address + " " + user.pincode,
        customerId: user.user.id,
        customerEmail: user.user.email,
        products: [
          {
            index: 0,
            productName: product.name,
            productPicture: product.photo,
            quantity: 1,
            price: product.price,
          },
        ],
        totalPrice: product.price + 5,
      };
      dispatch(addOrder(tempOrder));
      nav("/billing");
    }
  };

  if (clicked.name.length === 0) {
    return (
      <div>
        <React.Fragment>
          <svg width={0} height={0}>
            <defs>
              <linearGradient
                id="my_gradient"
                x1="0%"
                y1="0%"
                x2="0%"
                y2="100%"
              >
                <stop offset="0%" stopColor="#e01cd5" />
                <stop offset="100%" stopColor="#1CB5E0" />
              </linearGradient>
            </defs>
          </svg>
          <CircularProgress
            sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
          />
        </React.Fragment>
      </div>
    );
  }
  return (
    <div className="bg-white w-full overflow-x-hidden">
      <div className="  xl:px-32 px-6 py-12 my-6 h-fit flex flex-col justify-center  rowcol">
        {!clicked ? (
          <p>Loading...</p>
        ) : (
          <>
            <div className=" w-1/2  h-fit flex flex-col justify-center"></div>
            <div className="xl:px-32 px-6 py-12 my-6 h-fit flex  justify-center gap-12 rowcol">
              <div className="img-container gap-2 flex flex-col ">
                <img className="w-[24rem]" src={clicked.photo} alt="" />
                <div className="flex sub-images"></div>
              </div>

              <div className="details flex flex-col gap-2">
                <div>
                  <h2 className="text-2xl font-bold">{clicked.name}</h2>
                </div>

                <div className="text-g1 text-xl">{clicked.company}</div>
                <div className="flex justify-between">
                  <div className="flex items-baseline gap-2">
                    <span className="text-[2rem] font-semibold text-purp">
                      ₹{clicked.price}
                    </span>
                    <span className="line-through text-[grey]">
                      ₹{clicked.MRP}
                    </span>
                    <span className="text-purp">
                      {" "}
                      {Math.floor(100 - (clicked.price / clicked.MRP) * 100) ||
                        5}
                      % off
                    </span>
                  </div>
                  <div className="flex w-fit gap-1 items-center justify-end text-purp text-[1.25rem]">
                    {clicked.rating} <FaStar />
                  </div>
                </div>

                <div className="w-fill max-w-96 text-[.775rem] flex flex-col gap-2">
                  <span className="text-[1rem] font-medium">
                    Product Details
                  </span>
                  <span className="flex flex-col gap-2">
                    <p>{clicked.description} </p>
                    <p>
                      Discover the epitome of excellence with our exceptional
                      product, meticulously crafted to elevate your everyday
                      experience. From its elegant design to its seamless
                      functionality, every aspect of our product embodies
                      innovation and quality. Whether you're looking for style,
                      performance, or versatility, our product delivers on all
                      fronts.
                    </p>
                  </span>
                </div>
                <div>
                  {requiredSize.includes(clicked.categoryName) ? <></> : ""}
                </div>
                <div className="w-fill max-w-96 text-[.775rem] flex flex-col gap-1">
                  <ul className=" gap-[4px] list-none flex flex-col">
                    <li className="list">
                      <span className="font-medium">Sleek Design:</span>
                      Our product features a sleek and modern design that
                      seamlessly blends style with functionality, making it the
                      perfect accessory for any occasion.
                    </li>
                    <li className="list">
                      <span className="font-medium"> Premium Quality:</span>
                      Crafted with the finest materials and meticulous attention
                      to detail, our product is built to last, providing you
                      with reliable performance and durability for years to
                      come.
                    </li>

                    <li className="list">
                      <span className="font-medium">Enhanced Convenience:</span>
                      Simplify your daily routine and streamline tasks with our
                      product's innovative features, designed to enhance
                      convenience and efficiency in your life.
                    </li>
                  </ul>
                </div>
                <div className="text-l">
                  Get it Delivered by{" "}
                  <span className="font-semibold">
                    {clicked.deliverIn
                      ? new Date(
                          Date.now() + clicked.deliverIn * 24 * 60 * 60 * 1000
                        ).toLocaleDateString(undefined, {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })
                      : new Date(
                          Date.now() + 7 * 24 * 60 * 60 * 1000
                        ).toLocaleDateString(undefined, {
                          weekday: "long",
                          month: "long",
                          day: "numeric",
                        })}
                  </span>
                  🤗
                </div>
                <div className="flex flex-col xl:flex-row items-center  gap-2 justify-center my-2">
                  <button
                    onClick={addToCart}
                    className="btn2 flex flex-1  items-center justify-center  p-2 w-3/4   lg:text-[1.25rem] gap-3 text-wh1 bg-b1  hover:opacity-90  rounded-full"
                  >
                    <Link
                      to="/cart"
                      className="flex justify-center items-center gap-3"
                    >
                      {" "}
                      Add to cart <FaCartPlus />{" "}
                    </Link>
                  </button>
                  <button
                    className=" flex text-wh1 xs:text-[1rem]  lg:text-[1.25rem] w-3/4 items-center justify-center bg-b1 p-2 hover:opacity-90 gap-3 flex-1 rounded-full"
                    onClick={() => handleBuyNow(clicked)}
                  >
                    Buy Now <FaDollarSign />
                  </button>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

      <Row3 limit={7}></Row3>
    </div>
  );
};
