import React from "react";
import "../css/css2.css";
import "../css/imageStyle.css";
import "../css/home.css";
import { Row } from "./Row";
import Row2 from "./Row2";
import axios from "../axiosbase";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../Slice/categorySlice";

const getdata = async () => {
  let res = await axios.get("/product/getProducts");
  return res.data.products;
};

export const Home = () => {
  const dispatch = useDispatch();
  const getCategories = async () => {
    let res = await axios.get("/category/getCategories");
    let res2 = res.data.category;

    dispatch(setCategories(res2));
  };

  getCategories();

  return (
    <div className="w-full flex flex-col h-fit overflow-x-hidden ">
      {/* <Row
          name={"Akshat"}
          category={"Electronics"}
          products={getdata()}
        ></Row>

        <Row2 className="" category={"Electronics"}></Row2>
      <Row2 className="" category={"Kids"}></Row2> */}
      <Row name={"Akshat"} category={"Electronics"} products={getdata()}></Row>
      <Row2 className="" category={"Electronics"}></Row2>
      <Row2 className="" category={"Electronics"}></Row2>
    </div>
  );
};
