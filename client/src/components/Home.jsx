import React from "react";
import "../css/css2.css";
import "../css/imageStyle.css";
import "../css/home.css";
import { Row } from "./Row";
import Row2 from "./Row2";
import axios from "../axiosbase";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../Slice/categorySlice";
import Row3 from "./Row3";
import img from "../../../content/Untitled.png";

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
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <div className="w-full flex flex-col h-fit overflow-x-hidden ">
      <section className="h-screen">
        <img src={img} alt="d" />
      </section>
      <Row name={"Akshat"} category={"Electronics"} products={getdata()}></Row>
      <Row2 className="" title={"Best in Gaming"} category={"Gaming"}></Row2>
      <Row3 limit={6}></Row3>
    </div>
  );
};
