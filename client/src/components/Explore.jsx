import React, { useState } from "react";
import { useSelector } from "react-redux";
import Grid from "./subcomponents/Grid";
import ProductByCategory from "./ProductByCategory";
import { act } from "react";

export default function Explore() {
  const categories = useSelector((state) => state.categories.categories);

  const [active, setActive] = useState("All");

  return (
    <div className="flex flex-col justify-start self-start h-full items-center">
      <div class="flex first-letter:capitalize items-center justify-center h-full  py-5 flex-wrap">
        <button
          onClick={() => setActive("All")}
          class={`w-fit hover:underline p-4 rounded-md 
          flex items-center justify-center ${active == 0 ? " " : ""}`}
        >
          <h2 class="text-lg font-bold">All</h2>
        </button>
        {categories.map((category, index) => (
          <button
            key={index}
            class="w-fit hover:underline p-4 rounded-md 
          flex items-center justify-center"
            onClick={() => setActive(category.name)}
          >
            <h2 class="text-lg font-bold">{category.name}</h2>
          </button>
        ))}
      </div>
      {active == "All" ? <Grid /> : <ProductByCategory category={active} />}
    </div>
  );
}
