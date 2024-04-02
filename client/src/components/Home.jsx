import React from "react";
import "../css/css2.css";
import "../css/imageStyle.css";
import "../css/home.css";
import { Row } from "./Row";
import landing from "../images/landing.jpg";
import landing2 from "../images/landing2.jpg";
import landing3 from "../images/landing3.jpg";
import c1 from "../images/c1.jpg";
import c2 from "../images/c2.jpg";
import c3 from "../images/c3.jpg";
import c4 from "../images/c4.jpg";
import c5 from "../images/c5.jpg";
import c6 from "../images/c6.jpg";
import axios from "../axiosbase";

const getdata = async () => {
  let res = await axios.get("/product/getProducts");
  return res.data.products;
};

export const Home = () => {
  return (
    <>
      <div>
        <Row name={"Akshat"} products={getdata()}></Row>
      </div>
    </>
  );
};
