import React, { useEffect } from "react";
import DeleteCard from "./subcomponents/deleteCard";
import axios from "../axiosbase.js";
import { useState } from "react";

function RemoveProduct() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("/product/getProducts");
        console.log(res.data);
        setProducts(res.data.products);
        console.log(products);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchData();
  }, []);
  const updateProducts = (deletedProductId) => {
    setProducts(products.filter((product) => product._id !== deletedProductId));
  };
  return (
    <div className="flex gap-4 h-fit justify-center p-10 flex-wrap">
      {products.map((product) => (
        <DeleteCard
          key={product._id}
          product={product}
          updateProducts={updateProducts}
        />
      ))}
    </div>
  );
}

export default RemoveProduct;
