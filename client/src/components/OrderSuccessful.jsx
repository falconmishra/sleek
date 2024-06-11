import React from "react";
import i from "./subcomponents/Assest-Subcomponents/images.jpg";

export default function OrderSuccessful() {
  return (
    <div className="flex items-center justify-center h-screen">
      <div className="flex flex-col gap-4 items-center">
        <div className="text-center flex flex-col gap-4 ">
          <h2 className="text-3xl font-semibold">
            Order Recived Successfully ✅
          </h2>
          <p>Thank your for shopping with us! Hope to see you soon 👉👈</p>
        </div>
        <img src={i} className="h-64 mt-6 w-64" alt="" />
      </div>
    </div>
  );
}
