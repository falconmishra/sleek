<<<<<<< HEAD
import React, { useState } from "react";
=======
import React from 'react'
import '../css/addproduct.css'
>>>>>>> 7201ba046213f4ca7c0248ec8dfc68fb928c6090

export const AddProduct = () => {
  const [name, setName] = useState();
  const [desc, setDesc] = useState();
  const [price, setPrice] = useState();
  const [quantity, setQuantity] = useState();

  const handlesubmit = async () => {};
  return (
<<<<<<< HEAD
    <div className="flex bg-purp gap-4 bg-wh1 rounded-lg flex-col border h-full items-center justify-start p-8 ">
      <h2
        className="text-purp
       text-xl font-semibold"
      >
        Add a Product
      </h2>
      <div className="form gap-6 flex flex-col">
        <div className="flex gap-1">
          <label htmlFor="name" className="bg-none">
            Name :
          </label>
          <input
            type="text"
            value={name}
            onChange={() => {
              setName(e.target.value);
            }}
            name=""
            id=""
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="name" className="bg-none">
            Description :
          </label>
          <input
            type="text"
            value={desc}
            onChange={() => {
              setDesc(e.target.value);
            }}
            name=""
            id=""
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="name" className="bg-none">
            Price :
          </label>
          <input
            type="text"
            value={price}
            onChange={() => {
              setPrice(e.target.value);
            }}
            name=""
            id=""
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="name" className="bg-none">
            Quantity :
          </label>
          <input
            type="text"
            value={quantity}
            onChange={() => {
              setQuantity(e.target.value);
            }}
            name=""
            id=""
          />
        </div>
        <div className="flex gap-1">
          <label htmlFor="name" className="bg-none">
            Picture :
          </label>
          <input
            type="file"
            formTarget="jpeg"
            value={name}
            onChange={() => {
              setName(e.target.value);
            }}
            name=""
            id=""
          />
        </div>
      </div>
    </div>
  );
};
=======
    <div className='addpro'>
      <div className="headprod">
        Add Product
      </div>

    </div>
  )
}
>>>>>>> 7201ba046213f4ca7c0248ec8dfc68fb928c6090
