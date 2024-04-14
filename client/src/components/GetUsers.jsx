import React, { useEffect, useState } from "react";

import { CircularProgress, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "../axiosbase";
const GetUsers = () => {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const getUser = async () => {
      let res = await axios.get("/auth/getAllUsers");
      let sortedUser = res.data.users.sort((a, b) => {
        return a.createdAt - b.createdAt;
      });
      console.log(sortedUser);
      console.log(res.data.users);
      setUsers(sortedUser);
    };
    getUser();
  }, []);

  if (!users) {
    return (
      <div className="flex  items-center gap-2">
        <CircularProgress />
        <p>Loading Please wait..</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col w-fit items-center gap-4 p-6">
      Manage All Orders
      <div>
        <div className="overflow-x-auto md:overflow-x-scroll   overflow-hidden">
          <table className="min-w-full divide-y divide-x divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  S No.
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  User name
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  User Id
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  User mail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  User contact
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  User Address
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {users.map((value, index) => (
                <tr key={index}>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                    <div className="text-sm text-gray-900">{index + 1}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                    <div className="text-sm text-gray-900">
                      {value.username}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                    <div className="text-sm text-gray-900">{value._id}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                    <div className="text-sm text-gray-900">{value.email}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                    <div className="text-sm text-gray-900">
                      {"+91 " + value.contact || "Contact Not Found"}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                    <div className="text-sm text-gray-900">
                      {value.address + " " + value.pincode}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default GetUsers;
