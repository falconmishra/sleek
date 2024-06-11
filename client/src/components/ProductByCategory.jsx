import React, { useEffect, useState } from "react";

import { useLocation } from "react-router-dom";
import axios from "../axiosbase";
import { Card } from "./Card";

export default function ProductByCategory({ category }) {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const slug = searchParams.get("category") || category;
  const [products, setProducts] = useState([]);

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
    return <div>No Products to show here :(</div>;
  }
  return (
    <div className="w-full h-full p-5    flex flex-wrap gap-4 justify-center">
      {products &&
        products.map((product, index) => (
          <div key={index} className="flex gap-8 border-none cursor-grab">
            <Card className="" product={product} />
          </div>
        ))}
    </div>
  );
}
