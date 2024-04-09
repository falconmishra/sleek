import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import axios from "../axiosbase";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
function SetCategories() {
  const user = useSelector((state) => state.user.user);
  const [inp, setInp] = useState("");
  const [categories, setCategories] = useState([]);
  useEffect(() => {
    const fetchCategories = async () => {
      axios.get("/category/getCategories").then((res) => {
        setCategories(res.data.category);
        console.log(res.data);
      });
    };
    fetchCategories();
  }, []);

  const addCategory = async () => {
    const res = await axios.post(
      "/category/createCategory",
      {
        name: inp,
      },
      {
        params: {
          userId: user.id,
        },
      }
    );
    if (res.data.sucess) {
      toast.success(res.data.message);
    } else {
      toast(res.data.message);
    }
  };

  const handleDelete = (id) => {
    console.log(id);
    axios
      .delete(`/category/deleteCategory/${id}`, {
        params: {
          userId: user.id,
        },
      })
      .then((res) => {
        if (res.data.success) {
          toast.success("Category deleted successfully");
        } else {
          console.log(res.data);
          toast(res.data.message);
        }
      });
  };
  return (
    <div className="bg-white p-6 md:p-10 m-4 flex flex-col  gap-4">
      <div className="flex flex-col md:flex-row items-center md:items-start gap-2">
        <input
          type="text"
          className="border border-g1 w-full md:w-64 p-2"
          placeholder="Enter category name"
          value={inp}
          onChange={(e) => setInp(e.target.value)}
        />
        <Button variant="contained" color="success" onClick={addCategory}>
          Add Category
        </Button>
      </div>
      <div className="bg-white p-4 md:p-10 flex flex-col w-full">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        {!categories.length ? (
          <p className="text-gray-500">Loading...</p>
        ) : (
          <ul className="divide-y divide-gray-200">
            {categories.map((category, index) => (
              <li
                key={category._id}
                className="flex justify-start items-center my-2"
              >
                <span className="text-sm md:text-base mr-2">{index + 1}.</span>{" "}
                {/* Serial number */}
                <span className="flex-grow px-2">{category.name}</span>
                <Button
                  variant="contained"
                  color="error"
                  size="small"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </Button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default SetCategories;
