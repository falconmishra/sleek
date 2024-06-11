import React from "react";
import girl from "./Assest-Subcomponents/jjy.jpeg";
export default function HeroSlider() {
  return (
    <section className="w-full relative h-full min-h-screen flex justify-center items-center">
      <img
        draggable="false"
        className="object-cover object-center  object-top h-screen  w-full"
        src={girl}
        alt=""
      />
      <div className="absolute text-5xl backdrop:blur-lg  p-4 text-center bottom-20 lg:bottom-40">
        <h2 className=" text-purple-100 !font-bold leading-snug w-full ">
          Your ultimate <span className="text-purp  !font-bold">Fashion</span>{" "}
          destination
        </h2>
      </div>
    </section>
  );
}
