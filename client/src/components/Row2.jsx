import React, { useState, useEffect } from "react";
import { Card } from "./Card";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";
import "../css/hidder.css";
import "../css/btn.css";
import LinearProgress from "@mui/joy/LinearProgress";
import { FaSortAlphaDown, FaFilter } from "react-icons/fa";
import axios from "../axiosbase";
import CloseIcon from "@mui/icons-material/Close";
import toast from "react-hot-toast";
import Button from "@mui/material/Button";

function Row2({ category }) {
  const [productList, setProductList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [sortBy, setSortBy] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const fetchedProduct = await axios.get(
          `/product/getProductsByCategory/${category}`
        );
        const fetchedProducts2 = fetchedProduct.data.products;
        setProductList(fetchedProducts2);
        console.log(productList);
        setLoading(false);
      } catch (error) {
        setError(error);
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]); // Include category in the dependency array

  if (loading) {
    return (
      <div className="w-full flex items-center my-2">
        <div className="w-1/2">
          <LinearProgress sx={{ bgcolor: "#fdfdfd", color: "#9a59f0" }} />
        </div>
      </div>
    );
  }

  const handleSort = (sortBy) => {
    let sortedProducts = [...productList];
    switch (sortBy) {
      case "priceLowToHigh":
        sortedProducts.sort((a, b) => a.price - b.price);
        break;
      case "priceHighToLow":
        sortedProducts.sort((a, b) => b.price - a.price);
        break;
      case "ratingLowToHigh":
        sortedProducts.sort((a, b) => a.rating - b.rating);
        break;
      case "ratingHighToLow":
        sortedProducts.sort((a, b) => b.rating - a.rating);
        break;
      case "fastestDeliverable":
        sortedProducts.sort((a, b) => a.deliverIn - b.deliverIn);
        break;
      default:
        // No sorting
        break;
    }
    setProductList(sortedProducts);
  };

  return (
    <div className="w-screen color-w1 p-4 px-8 scroll-hide bg-wh1">
      <div className="w-full Row flex justify-between ">
        <span className="text-2xl">All new in {category}</span>
        <div className="flex gap-4">
          <Popup
            trigger={
              <span className="cursor-pointer rounded-2xl px-3 hover:bg-[#8f00ff] transition-all duration-150 hover:text-white flex justify-center items-center gap-1">
                <span className="hidder">Sort</span> <FaSortAlphaDown />
              </span>
            }
            position="bottom center"
            modal
          >
            {(close) => (
              <div className="p-2">
                <div className="popup-content">
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="Sort"
                      id=""
                      onClick={() => {
                        setSortBy("priceLowToHigh");
                      }}
                    />
                    <span className="font-bold">Price</span>: Low to High
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="Sort"
                      id=""
                      onClick={() => {
                        setSortBy("priceHighToLow");
                      }}
                    />
                    <span className="font-bold">Price</span>: High to Low
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="Sort"
                      id=""
                      onClick={() => {
                        setSortBy("ratingLowToHigh");
                      }}
                    />
                    <span className="font-bold">Rating</span>: Low to High
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="Sort"
                      id=""
                      onClick={() => {
                        setSortBy("ratingHighToLow");
                      }}
                    />
                    <span className="font-bold">Rating</span>: High to Low
                  </div>
                  <div className="flex items-center gap-2">
                    <input
                      type="radio"
                      name="Sort"
                      id=""
                      onClick={() => {
                        setSortBy("fastestDeliverable");
                      }}
                    />
                    <span className="font-bold">Fastest Deliverable</span>
                  </div>
                </div>
                <div className="w-full flex gap-1 m-2 justify-center items-center">
                  <Button
                    variant="contained"
                    style={{ backgroundColor: "#8f00ff", color: "white" }}
                    onClick={() => {
                      handleSort(sortBy);
                      toast.success("Product Sorted");
                      close();
                    }}
                  >
                    Sort now
                  </Button>
                  <Button
                    variant="outlined"
                    endIcon={<CloseIcon />}
                    style={{ borderColor: "#8f00ff", color: "#8f00ff" }}
                    onClick={() => close()}
                  >
                    Close
                  </Button>
                </div>
              </div>
            )}
          </Popup>
        </div>
      </div>

      <div className="my-4 flex gap-4 overflow-x-auto overflow-clip w-full pb-5 scroll-hide ">
        {productList.length > 0 ? (
          productList.map((product, index) => (
            <div key={index} className="flex gap-8 border-none cursor-grab">
              <Card product={product} />
            </div>
          ))
        ) : (
          <>
            <h4>No Products to show :(</h4>
          </>
        )}
      </div>
    </div>
  );
}

export default Row2;
