import React from "react";
import "../css/css2.css";
import "../css/imageStyle.css";
import "../css/home.css";
import { Row } from "./Row";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Row2 from "./Row2";
import axios from "../axiosbase";
import { useDispatch, useSelector } from "react-redux";
import { setCategories } from "../Slice/categorySlice";
import Row3 from "./Row3";
import img from "../images/hero.png";
import HeroSlider from "./subcomponents/HeroSlider";
import Sec2 from "./subcomponents/Sec2";
import FeatureSection from "./subcomponents/FeatureSection";
import ProductByCategory from "./ProductByCategory";
import Stats from "./subcomponents/Stats";
import SpecialProduct from "./subcomponents/SpecialProduct";
import SecFeature from "./subcomponents/SecFeature";

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
    <div className="w-full flex flex-col h-fit overflow-x-hidden  ">
      <HeroSlider />
      <FeatureSection />
      <div className="bg-amber-100/30 pt-6">
        <Row2
          className=""
          title={"Get Ready for Wedding Season"}
          category={"Shadi"}
        ></Row2>
      </div>
      <SpecialProduct />

      <Sec2 />
      <Row2 className="" title={"Classics for Men"} category={"men"}></Row2>
      <div className="bg-purple-100/80 pt-4 ">
        <Row2 className="" title={"Sneaker Fever"} category={"Shoes"}></Row2>
      </div>
      <Row2 className="" title={"Treding in Women"} category={"Woman"}></Row2>
      <SecFeature />
      <Stats />
      <Row2 className="" title={"Best in Gaming"} category={"Gaming"}></Row2>

      <Row
        name={"Recently Added"}
        category={"Electronics"}
        products={getdata()}
      ></Row>
      <Row3 limit={6}></Row3>
    </div>
  );
};
