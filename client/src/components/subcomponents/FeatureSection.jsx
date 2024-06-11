import React from "react";
import man from "./Assest-Subcomponents/man.jpg";
import woman from "./Assest-Subcomponents/woman.jpg";
import woman2 from "./Assest-Subcomponents/woman2.jpg";

export default function FeatureSection() {
  return (
    <div className="flex gap-8 flex-col p-2 lg:p-8">
      <div>
        <h2 className="text-3xl text-center font-semibold">
          Covering all of your{" "}
          <span className="text-gd font-semibold">fashion</span> needs
        </h2>
      </div>
      <div className="flex h-fit gap-2">
        <div className="flex relative flex-col h-full">
          <img
            src={woman}
            alt="Woman 1"
            className="h-[28rem] m-2 object-cover object-center w-[32rem]"
          />
        </div>
        <div>
          <img
            src={man}
            alt="Man"
            className="max-w-full h-[28rem] m-2 object-cover object-center w-[32rem]"
          />
        </div>
        <div className="flex flex-col h-full">
          <img
            src={woman2}
            alt="Woman 2"
            className="h-[28rem] m-2 object-cover object-center w-[32rem]"
          />
        </div>
      </div>
    </div>
  );
}
