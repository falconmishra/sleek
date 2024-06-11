import React from "react";
import ww from "./Assest-Subcomponents/ww.jpeg";
import mm from "./Assest-Subcomponents/mm.jpeg";

export default function SecFeature() {
  return (
    <div>
      <div className="cont-sc p-24 flex flex-col lg:flex-row gap-3 items-center justify-center">
        <div className="lg:h-[35rem] h-full w-[26rem]">
          <img
            src="https://ideogram.ai/assets/image/balanced/response/XjGCNG0XT6ub8o8j5jZriA"
            className="object-cover object-center rounded-lg h-full w-full"
            alt=""
          />
        </div>
        <div className="h-[35rem] flex flex-col gap-3">
          <div className="h-[17rem] w-[26rem]">
            <img
              src={ww}
              className="object-cover object-center rounded-lg h-full w-full"
              alt=""
            />
          </div>
          <div className="h-[17rem] w-[26rem]">
            <img
              src={mm}
              className="object-cover object-center rounded-lg h-full w-full"
              alt=""
            />
          </div>
        </div>
        <div className="lg:h-[35rem] h-full w-[26rem]">
          <img
            src="https://ideogram.ai/assets/image/lossless/response/6XOxyAuqQ42U4XUeYzvWqg"
            className="object-cover object-center rounded-lg h-full w-full"
            alt=""
          />
        </div>
      </div>
    </div>
  );
}
