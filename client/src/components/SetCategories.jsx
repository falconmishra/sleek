import React, { useEffect, useState } from "react";
import Button from "@mui/joy/Button";
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
    <div>
      <div className="bg-white p-10 m-4 flex gap-2 ">
        <input
          type="text"
          className="border border-g1 w-64"
          name="category"
          id=""
          onChange={(e) => setInp(e.target.value)}
        />
        <Button variant="solid" onClick={addCategory}>
          Add Category
        </Button>
      </div>
      <div className="bg-white p-10 m-4 ">
        <ul>
          {!categories ? (
            <p> Loading</p>
          ) : (
            categories.map((category, index) => (
              <li
                key={category._id}
                className="flex justify-start items-center m-2"
              >
                <span>{index + 1}.</span> {/* Serial number */}
                <span className="w-full px-2">{category.name}</span>
                <Button
                  variant="solid"
                  color="danger"
                  onClick={() => handleDelete(category._id)}
                >
                  Delete
                </Button>
              </li>
            ))
          )}
        </ul>
      </div>
    </div>
  );
}

export default SetCategories;
