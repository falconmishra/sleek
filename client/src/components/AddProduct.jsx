import React, { useEffect } from "react";
import "../css/addproduct.css";
import { useState } from "react";
import axios from "../axiosbase";
import toast from "react-hot-toast";
import Button from "@mui/joy/Button";

export const AddProduct = () => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    discount: "",
    MRP: "",
    company: "",
    rating: "",
    category: "",
    photo: null, // For file upload
  });
  const [categories, setCategories] = useState(["Category1"]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("category/getCategories");
        setCategories(response.data.category);
        console.log(response.data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }

    fetchCategories();
  }, []);

  // Function to handle form field changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // Function to handle file upload
  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  // Function to handle form submission
  const handleSubmit = async (e) => {
    console.log(formData);

    try {
      const formDataToSend = new FormData(); // Create FormData object
      formDataToSend.append("name", formData.name);
      formDataToSend.append("description", formData.description);
      formDataToSend.append("price", formData.price);
      formDataToSend.append("discount", formData.discount);
      formDataToSend.append("rating", formData.rating);
      formDataToSend.append("MRP", formData.MRP);
      formDataToSend.append("category", formData.category);
      formDataToSend.append("quantity", formData.quantity);
      formDataToSend.append("company", formData.company);
      formDataToSend.append("photo", formData.photo); // Append file to FormData

      // Make POST request to your backend API endpoint
      const response = await axios.post(
        "/product/createProduct",
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" }, // Set content type header for file upload
        }
      );

      console.log(response.data); // Log response from server
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast(response.data.error.message);
      }
    } catch (error) {
      console.error("Error:", error); // Log any errors
      toast.error(error.response.data.message);
    }
  };
  return (
    <div className="flex bg-purp gap-4 bg-wh1 rounded-lg flex-col border h-full items-center justify-start p-8 ">
      <h2
        className="text-purp
       text-xl font-semibold"
      >
        Add a Product
      </h2>
      <form onSubmit={handleSubmit} enctype="multipart/form-data">
        <div className="form gap-6 flex flex-col">
          <div className="flex gap-1 ">
            <label htmlFor="name" className="bg-none">
              Name :
            </label>
            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="name" className="bg-none">
              Company Name :
            </label>
            <input
              name="company"
              value={formData.company}
              onChange={handleChange}
              type="text"
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="name" className="bg-none">
              Description :
            </label>
            {/* <input
              name="description"
              value={formData.description}
              onChange={handleChange}
              type="textarea"
              id=""
            /> */}
            <textarea
              id="myTextArea"
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={5} // Adjust the number of rows as needed
              cols={40} // Adjust the number of columns as needed
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="name" className="bg-none">
              Price :
            </label>
            <input
              type="text"
              value={formData.price}
              onChange={handleChange}
              name="price"
              id=""
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="name" className="bg-none">
              MRP :
            </label>
            <input
              type="text"
              value={formData.MRP}
              onChange={handleChange}
              name="MRP"
              id=""
            />
          </div>

          <div className="flex gap-1">
            <label htmlFor="name" className="bg-none">
              Category :
            </label>
            {/* <input
              type="text"
              value={formData.category}
              onChange={handleChange}
              name="category"
              id=""
            /> */}
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories ? (
                categories.map((category) => (
                  <option key={category.id} value={category.id}>
                    {category.name}
                  </option>
                ))
              ) : (
                <option>Loading</option>
              )}
            </select>
          </div>
          <div className="flex gap-1">
            <label htmlFor="name" className="bg-none">
              Rating :
            </label>
            <input
              type="text"
              value={formData.rating}
              onChange={handleChange}
              name="rating"
              id=""
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="name" className="bg-none">
              Quantity :
            </label>
            <input
              type="text"
              value={formData.quantity}
              onChange={handleChange}
              name="quantity"
              id=""
            />
          </div>
          <div className="flex gap-1">
            <label htmlFor="name" className="bg-none">
              Picture :
            </label>
            <input
              type="file"
              onChange={handleFileChange}
              formTarget="jpeg"
              name="photo"
              id=""
            />
          </div>
          <Button
            variant="contained"
            color="success"
            className="bg-gray"
            onClick={() => handleSubmit()}
          >
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};
