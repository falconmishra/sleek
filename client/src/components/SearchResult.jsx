import axios from "../axiosbase";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { Card } from "./Card";
import toast from "react-hot-toast";

export const SearchResult = () => {
  const [searchParams] = useSearchParams();
  const q = searchParams.get("q");
  const [searchProducts, setSearchProducts] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (q) {
          const res = await toast.promise(
            axios.get(`/product/searchProduct/${q}`),
            {
              loading: "Searching products...", // Optional loading message
              success: "Searched Products!", // Success message
              error: "Error searching products", // Error message
            }
          );
          setSearchProducts(res.data);
        }
      } catch (error) {
        console.error("Error:", error); // Handle error
        toast.error("Error searching products");
      }
    };

    fetchData();
  }, [q]);

  return (
    <div className="flex  flex-col w-full mt-10 gap-7 items-center h-full   ">
      <h2 className="text-2xl font-semibold">
        Found {searchProducts.total_count || 0}{" "}
        {searchProducts.total_count == 1 ? "result" : "results"} for "{q}"
      </h2>
      <div className="flex w-full items-center justify-start">
        <div className="flex w-fit justify-center gap-2 p-6 flex-wrap items-start">
          {searchProducts &&
          searchProducts.results &&
          searchProducts.results.length > 0 ? (
            searchProducts.results.map((product, index) => (
              <Card key={index} product={product} />
            ))
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};
