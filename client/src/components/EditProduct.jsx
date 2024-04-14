import React, { useEffect } from "react";
import "../css/addproduct.css";
import { useState } from "react";
import { useSelector } from "react-redux";
import axios from "../axiosbase";
import CircularProgress from "@mui/joy/CircularProgress";

import toast from "react-hot-toast";
import { useSearchParams } from "react-router-dom";
import Button from "@mui/joy/Button";

const EditProduct = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");

  const [categories, setCategories] = useState(["Category1"]);
  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await axios.get("category/getCategories");
        setCategories(response.data.category);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    }
    fetchCategories();
  }, []);

  const [product, setProduct] = useState(null);
  useEffect(() => {
    const getProduct = async (slug) => {
      try {
        const res = await axios.get(`/product/getProduct/${slug}`);
        setProduct(res.data.product);
        // Update formData after product data has been fetched
        setFormData({
          name: res.data.product.name || "",
          description: res.data.product.description || "",
          price: res.data.product.price || "",
          quantity: res.data.product.quantity || "",
          discount: res.data.product.discount || "",
          MRP: res.data.product.MRP || "",
          company: res.data.product.company || "",
          rating: res.data.product.rating || "",
          category: res.data.product.category || "",
          categoryName: res.data.product.categoryName || "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct(slug);
  }, [slug]);

  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    quantity: "",
    MRP: "",
    company: "",
    rating: "",
    category: "",
    categoryName: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category.name === value
      );
      setFormData({
        ...formData,
        category: selectedCategory._id,
        categoryName: value,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = { ...formData };
      // formDataToSend.append("name", formData.name);
      // formDataToSend.append("description", formData.description);
      // formDataToSend.append("price", formData.price);
      // formDataToSend.append("rating", formData.rating);
      // formDataToSend.append("MRP", formData.MRP);
      // formDataToSend.append("category", formData.category);
      // formDataToSend.append("quantity", formData.quantity);
      // formDataToSend.append("company", formData.company);
      // console.log(formDataToSend);
      console.log(formDataToSend);
      const response = await axios.put(
        `/product/updateProduct/${product._id}`,
        {
          name: formDataToSend.name,
          description: formDataToSend.description,
          price: formDataToSend.price,
          MRP: formDataToSend.MRP,
          category: formDataToSend.category,
          quantity: formDataToSend.quantity,
          company: formDataToSend.company,
          rating: formDataToSend.rating,
          categoryName: formDataToSend.categoryName,
        }
      );

      console.log(response.data);
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast(response.data.error.message);
      }
    } catch (error) {
      console.error("Error:", error);
      toast.error(error.response.data.message);
    }
  };

  if (!product) {
    return <CircularProgress />;
  }
  return (
    <div className="flex bg-purp gap-4 bg-wh1 rounded-lg flex-col border h-full items-center justify-start p-8 ">
      <h2
        className="text-purp
        text-xl font-semibold"
      >
        Edit a Product
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
              placeholder={product.name}
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
              placeholder={product.company}
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

            <select
              name="category"
              value={formData.categoryName}
              onChange={handleChange}
            >
              <option value="">Select category</option>
              {categories.length > 0 ? (
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

          <Button variant="contained" color="success" type="submit">
            Submit
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
