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
    // <div className="h-fit homeall min-w-screen">
    //   <div className="w-screen">
    //     <div className="sec1">
    //       <img src={landing} alt="" />
    //       <div className="sec1left">
    //         <h1>Try it, wear it, love it.</h1>
    //       </div>
    //     </div>

    //     <div className="heading">
    //       <h1>Collections</h1>
    //     </div>
    //     <div className="productcollection">
    //       <div className="collection">
    //         <img className="imagefitter" src={c1} alt="" />
    //       </div>
    //       <div className="collection">
    //         <img className="imagefitter" src={c2} alt="" />
    //       </div>
    //       <div className="collection">
    //         <img className="imagefitter" src={c3} alt="" />
    //       </div>
    //       <div className="collection">
    //         <img className="imagefitter" src={c4} alt="" />
    //       </div>
    //       <div className="collection">
    //         <img className="imagefitter" src={c5} alt="" />
    //       </div>
    //       <div className="collection">
    //         <img className="imagefitter" src={c6} alt="" />
    //       </div>
    //     </div>

    //     <div className="sec1">
    //       <img src={landing2} alt="" />
    //       <div className="sec1left">
    //         <h1></h1>
    //       </div>
    //     </div>
    //   </div>

    //   <Row name={"Winter special"}></Row>

    //   <div className="featuredp"></div>

    //   <div className="sec1">
    //     <img src={landing3} alt="" />
    //     <div className="sec1left">
    //       <h1></h1>
    //     </div>
    //   </div>

    //   <div>
    //     {/* <Row name={"Winter special"}></Row>
    //     <Row name={"Summer special"}></Row>
    //     <Row name={"Playful Vibes"}></Row>
    //     <Row name={"Halloween special"}></Row>
    //     <Row name={"Aur kuch special"}></Row> */}
    //   </div>
    // </div>

    <>
      <div>
        <Row name={"Akshat"} products={getdata()}></Row>
      </div>
    </>
  );
};
