import React from "react";
import { FaPaw } from "react-icons/fa";

export const PageUnavailable = () => {
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <h2 className="text-[1.25rem] font-medium">
        Bhai ye page to mene banaya hi nhi!
      </h2>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQeOVFPufY424IBVtu7r5EAUYJ6X0MzZYTCcg&s"
        alt=""
      />
    </div>
  );
};
