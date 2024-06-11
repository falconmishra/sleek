import React from "react";
import hnm from "./Assest-Subcomponents/h&m.png";

export default function Sec2() {
  return (
    <section className=" p-8 flex flex-col items-center justify-center">
      <h2 className="text-3xl  text-center font-semibold mb-14">
        Catch all your favorite{" "}
        <span className="text-gd font-semibold ">Brands</span>
      </h2>
      <div className="logo-container flex gap-8 lg:gap-16 ">
        <img
          draggable="false"
          className="lg:h-16 lg:w-32 h-9 w-16 object-cover object-center"
          src="https://logos-world.net/wp-content/uploads/2020/05/Zara-Logo.png"
          alt=""
        />
        <img
          draggable="false"
          className="lg:h-16 lg:w-32 h-9 w-16 object-cover object-center"
          src={hnm}
          alt=""
        />
        <img
          draggable="false"
          className="lg:h-16 lg:w-32 h-9 w-16 object-contain object-center"
          src="https://upload.wikimedia.org/wikipedia/en/d/da/Puma_complete_logo.svg"
          alt=""
        />

        <img
          draggable="false"
          className="lg:h-16 lg:w-32 h-9 w-16 object-contain object-center"
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/20/Adidas_Logo.svg/725px-Adidas_Logo.svg.png"
          alt=""
        />
        <img
          draggable="false"
          className="lg:h-16 lg:w-32 h-9 w-16 object-contian object-center"
          alt=""
          src="https://logos-world.net/wp-content/uploads/2020/04/Nike-Logo.png"
        />
      </div>
    </section>
  );
}
