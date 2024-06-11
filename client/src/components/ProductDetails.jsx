import React, { useEffect, useState } from "react";
import {
  FaStar,
  FaCartPlus,
  FaDollarSign,
  FaShoppingCart,
  FaTruck,
} from "react-icons/fa";
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
import UserReviews from "./subcomponents/UserReviews";
import Banner from "./subcomponents/Banner";
import Stats from "./subcomponents/Stats";

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
      <div className="h-[65vh] w-screen grid place-items-center">
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
      <section>
        {/* Container two */}

        <div class="bg-white">
          <div class="pt-6 flex flex-col justify-start">
            <nav aria-label="Breadcrumb">
              <ol
                role="list"
                class=" flex max-w-2xl items-center space-x-2 px-4 sm:px-6 lg:max-w-7xl lg:px-8"
              >
                <li>
                  <div class="flex items-center">
                    <a class="mr-2 text-sm font-medium text-gray-900">
                      Products
                    </a>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>
                <li>
                  <div class="flex items-center">
                    <Link
                      to={`/getProductByCategory?category=${clicked.categoryName}`}
                      class="mr-2 text-sm font-medium text-gray-900"
                    >
                      {clicked.categoryName}
                    </Link>
                    <svg
                      width="16"
                      height="20"
                      viewBox="0 0 16 20"
                      fill="currentColor"
                      aria-hidden="true"
                      class="h-5 w-4 text-gray-300"
                    >
                      <path d="M5.697 4.34L8.98 16.532h1.327L7.025 4.341H5.697z" />
                    </svg>
                  </div>
                </li>

                <li class="text-sm">
                  <a
                    href="#"
                    aria-current="page"
                    class="font-medium text-gray-500 hover:text-gray-600"
                  >
                    {clicked.name}
                  </a>
                </li>
              </ol>
            </nav>
            <div className="flex-col flex lg:flex-row  ">
              <div class=" flex w-full px-3 md:px-16 justify-center mt-6 max-w-2xl  lg:grid  lg:gap-x-8 min-w-1/4">
                <div class="aspect-h-5 mt-12 w-full aspect-w-4 lg:aspect-h-4 lg:aspect-w-3 sm:overflow-hidden ">
                  <img
                    src={clicked.photo}
                    alt="Model wearing plain white basic tee."
                    class="h-fit w-full object-cover object-center sm:rounded-lg rounded-lg"
                  />
                </div>
              </div>

              <div class=" px-3  max-w-2xl pt-10  lg:grid l lg:grid-cols-3 lg:grid-rows-[auto,auto,1fr] lg:gap-x-8  lg:pt-16 ">
                <div class="lg:col-span-2 lg:border-l flex flex-col gap-3 lg:border-gray-200 lg:pr-8 lg:pl-16">
                  <h1 class="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                    {clicked.name}
                  </h1>
                  <h2 className="text-g1 text-lg">{clicked.company}</h2>
                </div>

                <div class="pt-10 lg:col-span-3 lg:col-start-1 lg:border-l lg:pl-16 lg:border-gray-200  lg:pr-8 lg:pt-4">
                  <div>
                    <h3 class="sr-only">Description</h3>

                    <div class="space-y-6">
                      <p class="text-base text-gray-900 leading-8">
                        {clicked.description} <br />
                        The Basic Tee 6-Pack allows you to fully express your
                        vibrant personality with three grayscale options.
                        Feeling adventurous? Put on a heather gray tee. Want to
                        be a trendsetter? Try our exclusive colorway:
                        &quot;Black&quot;. Need to add an extra pop of color to
                        your outfit? Our white tee has you covered.
                      </p>
                    </div>
                  </div>

                  <div class="mt-4 lg:row-span-3 lg:mt-0 lg:w-1/2">
                    <h2 class="sr-only">Product information</h2>
                    <div className="flex items-baseline gap-3 ">
                      <p class="text-3xl tracking-tight mt-4 font-semibold text-gd">
                        ₹{clicked.price}
                      </p>
                      <p class="text-lg tracking-tight mt-4 font-medium text-g1 line-through  ">
                        ₹{clicked.MRP}
                      </p>
                    </div>

                    <div class="mt-4">
                      <h3 class="sr-only">Reviews</h3>
                      <div class="flex items-center">
                        <div class="flex items-center text-amber-300 gap-2">
                          {Array.from({ length: 5 }, (v, i) => (
                            <FaStar
                              key={i}
                              className={
                                i + 1 <= clicked.rating
                                  ? "text-amber-300"
                                  : "text-gray-300"
                              }
                            />
                          ))}
                        </div>
                        <p class="sr-only">4 out of 5 stars</p>
                        <a
                          href="#"
                          class="ml-3 text-sm font-medium text-indigo-600 hover:text-indigo-500"
                        >
                          {clicked.rating} Stars
                        </a>
                      </div>
                    </div>

                    <div className="flex w-full flex-nowrap items-center gap-2 justify-center my-8">
                      <button
                        onClick={addToCart}
                        class="flex justify-center text-nowrap items-center gap-3 lg:gap-2 rounded-md bg-slate-900 w-full px-5 py-2.5 text-center text-[12px] lg:text-sm font-medium text-white hover:bg-gray-700 "
                      >
                        <FaShoppingCart className="text-[19px]" />
                        <span className="">Add to cart</span>
                      </button>
                      <button
                        onClick={() => handleBuyNow(clicked)}
                        class="flex items-center text-[12px] justify-center rounded-md bg-purp2 px-5 w-full py-2.5 transition-all duration-200 text-center lg:text-sm font-medium text-white hover:bg-purp "
                      >
                        Buy Now
                      </button>
                    </div>
                  </div>

                  <div className="mt-10">
                    <p className="flex gap-1 items-center">
                      Get it delivered by,
                      <span className="font-semibold text-purp2">
                        {clicked.deliverIn
                          ? new Date(
                              Date.now() +
                                clicked.deliverIn * 24 * 60 * 60 * 1000
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
                      🥰
                    </p>
                  </div>

                  <div class="mt-10 text-md">
                    <h3 class="text-lg font-normal text-gray-900">
                      Highlights
                    </h3>

                    <div class="mt-4 text-md">
                      <ul role="list" class="list-disc space-y-2 pl-4 ">
                        <li class="text-gray-400">
                          <span class="text-gray-600">
                            Hand cut and sewn locally
                          </span>
                        </li>
                        <li class="text-gray-400">
                          <span class="text-gray-600">
                            Dyed with our proprietary colors
                          </span>
                        </li>
                        <li class="text-gray-400">
                          <span class="text-gray-600">
                            Pre-washed &amp; pre-shrunk
                          </span>
                        </li>
                        <li class="text-gray-400">
                          <span class="text-gray-600">
                            Ultra-soft 100% cotton
                          </span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div class="mt-10">
                    <h2 class="text-lg font-medium text-gray-900">Details</h2>

                    <div class="mt-4 space-y-6">
                      <p class="text-md text-gray-600">
                        The 6-Pack includes two black, two white, and two
                        heather gray Basic Tees. Sign up for our subscription
                        service and be the first to get new, exciting colors,
                        like our upcoming &quot;Charcoal Gray&quot; limited
                        release.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <Stats />
        <UserReviews rating={clicked.rating} />
      </section>
      <Row3 limit={7}></Row3>
    </div>
  );
};
