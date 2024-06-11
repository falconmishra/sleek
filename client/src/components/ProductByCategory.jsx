import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import axios from "../axiosbase";
import { Card } from "./Card";
import { CircularProgress } from "@mui/material";

export default function ProductByCategory({ category }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("category") || category;
  const [products, setProducts] = useState([]);
  console.log(slug);

  useEffect(() => {
    let fetchdata = async () => {
      let res = await axios.get(`/product/getProductsByCategory/${slug}`);
      setProducts(res.data.products);
      console.log(res);
    };
    fetchdata();
  }, [slug]);
  console.log(products.length);
  if (products.length === 0) {
    return (
      <div className="w-screen h-[72vh] grid place-content-center">
        Loading
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
    <div className="flex items-center justify-start flex-col p-5 ">
      <div className="my-6">
        <h2 className="text-2xl font-semibold text-slate-600">
          Products for Category :{" "}
          <span className="text-gd font-semibold">{slug}</span>
        </h2>
      </div>
      <div className="w-full h-full    flex flex-wrap gap-4 justify-center">
        {products &&
          products.map((product, index) => (
            <div key={index} className="flex gap-8 border-none cursor-grab">
              <Card className="" product={product} />
            </div>
          ))}
      </div>
    </div>
  );
}
