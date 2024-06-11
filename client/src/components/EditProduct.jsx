import React, { useEffect, useState } from "react";
import "../css/addproduct.css";
import axios from "../axiosbase";
import toast from "react-hot-toast";
import CircularProgress from "@mui/joy/CircularProgress";

import { useSearchParams } from "react-router-dom";

const EditProduct = () => {
  const [searchParams] = useSearchParams();
  const slug = searchParams.get("slug");

  const [categories, setCategories] = useState([]);
  const [product, setProduct] = useState(null);
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

  useEffect(() => {
    const getProduct = async (slug) => {
      try {
        const res = await axios.get(`/product/getProduct/${slug}`);
        const productData = res.data.product;
        setProduct(productData);
        setFormData({
          ...productData,
          categoryName: productData.categoryName || "",
        });
      } catch (error) {
        console.error("Error fetching product:", error);
      }
    };
    getProduct(slug);
  }, [slug]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "category") {
      const selectedCategory = categories.find(
        (category) => category._id === value
      );
      setFormData({
        ...formData,
        category: selectedCategory._id,
        categoryName: selectedCategory.name,
      });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        formDataToSend.append(key, formData[key]);
      });
      const response = await axios.put(
        `/product/updateProduct/${product._id}`,
        formDataToSend,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
      } else {
        toast.error(response.data.error.message);
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
    <div className="flex gap-4 rounded-lg flex-col border h-full items-center justify-start p-8 bg-white shadow-md">
      <h2 className="text-purp text-2xl font-semibold mb-6">Edit Product</h2>

      <form
        encType="multipart/form-data"
        className="space-y-12 w-full max-w-3xl"
        onSubmit={handleSubmit}
      >
        <div className="border-b border-gray-300 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            Product Information
          </h2>
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-6 md:grid-cols-6">
            <div className="sm:col-span-4">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name:
              </label>
              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                type="text"
                className="block flex-1 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Product Name"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="company"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Company Name:
              </label>
              <input
                name="company"
                value={formData.company}
                onChange={handleChange}
                type="text"
                className="block flex-1 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Company Name"
              />
            </div>
            <div className="col-span-full">
              <label
                htmlFor="description"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Description:
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Write a description"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="price"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Price:
              </label>
              <input
                type="text"
                value={formData.price}
                onChange={handleChange}
                name="price"
                id="price"
                className="block flex-1 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Price"
              />
            </div>
            <div className="col-span-2">
              <label
                htmlFor="MRP"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                MRP:
              </label>
              <input
                type="text"
                value={formData.MRP}
                onChange={handleChange}
                name="MRP"
                id="MRP"
                className="block flex-1 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="MRP"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="category"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Category:
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="block w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="">Select category</option>
                {categories.length > 0 ? (
                  categories.map((category) => (
                    <option key={category._id} value={category._id}>
                      {category.name}
                    </option>
                  ))
                ) : (
                  <option>Loading</option>
                )}
              </select>
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="rating"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Rating:
              </label>
              <input
                type="text"
                value={formData.rating}
                onChange={handleChange}
                name="rating"
                id="rating"
                className="block flex-1 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Rating"
              />
            </div>
            <div className="sm:col-span-2">
              <label
                htmlFor="quantity"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Quantity:
              </label>
              <input
                type="text"
                value={formData.quantity}
                onChange={handleChange}
                name="quantity"
                id="quantity"
                className="block flex-1 w-full border border-gray-300 rounded-md py-2 px-3 text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
                placeholder="Quantity"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-x-6">
          <button
            type="button"
            className="text-sm font-semibold leading-6 text-gray-900"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-md bg-purp px-10 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-600"
          >
            Update
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditProduct;
