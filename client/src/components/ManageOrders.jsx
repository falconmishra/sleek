import React, { useEffect, useState } from "react";

import { CircularProgress, Button } from "@mui/material";
import toast from "react-hot-toast";
import axios from "../axiosbase";
const ManageOrders = () => {
  const [selectedStatus, setSelectedStatus] = useState("");
  const [orders, setOrders] = useState();
  useEffect(() => {
    const getOrder = async () => {
      const res = await axios.get("/order/getOrders");
      const sortedOrders = res.data.orders.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setOrders(sortedOrders);
    };
    getOrder();
  }, []);

  const handleStatusChange = (orderId, newStatus) => {
    setSelectedStatus({ ...selectedStatus, [orderId]: newStatus });
  };

  const handleUpdate = async (orderId) => {
    try {
      const res = await toast.promise(
        axios.put(
          `/order/updateOrderStatus/${orderId}/status/${selectedStatus[orderId]}`
        ),
        {
          loading: "Updating product status",
          success: (data) => {
            return `Product status updated`;
          },
          error: "Failed to load data",
        }
      );

      // Refresh orders after status update
      const res2 = await axios.get("/order/getOrders");
      const sortedOrders = res2.data.orders.sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return dateB - dateA;
      });
      setOrders(sortedOrders);
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  if (!orders) {
    return (
      <React.Fragment>
        <svg width={0} height={0}>
          <defs>
            <linearGradient id="my_gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#e01cd5" />
              <stop offset="100%" stopColor="#1CB5E0" />
            </linearGradient>
          </defs>
        </svg>
        <CircularProgress
          sx={{ "svg circle": { stroke: "url(#my_gradient)" } }}
        />
      </React.Fragment>
    );
  }

  return (
    <div className="flex flex-col  items-center justify-center w-full gap-4 p-6">
      Manage All Orders
      <div>
        <div className="overflow-x-auto md:overflow-x-scroll   overflow-hidden">
          <table className="min-w-full divide-y divide-x divide-gray-200">
            {/* Table header */}
            <thead className="bg-gray-50">
              <tr>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Order
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Customer mail
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Customer Address
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Order
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Total Price
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border border-gray-200"
                >
                  Update Status
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {orders &&
                orders.map((value, index) => (
                  <tr key={index}>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                      <div className="text-sm text-gray-900">{index + 1}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                      <div className="text-sm text-gray-900">
                        {value.customerEmail}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-wrap border  border-gray-200">
                      <div className="text-sm w-48 max-w-xs  text-gray-900">
                        {value.address || "Address not found"}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                      <div className="text-sm text-gray-900">
                        {value.products.map((value) => (
                          <div>
                            <li>
                              {`${value.productName} (x${value.quantity}) = $${
                                value.price * value.quantity
                              }`}{" "}
                            </li>
                          </div>
                        ))}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                      <div className="text-sm text-gray-900">
                        ${value.totalPrice}
                      </div>
                    </td>
                    <td
                      className={`px-6 py-4 whitespace-nowrap border border-gray-200 ${
                        value.status === "Pending"
                          ? "bg-yellow-400 "
                          : "" || value.status === "Approved"
                          ? "bg-lime-400 "
                          : "" || value.status === "Shipped"
                          ? "bg-blue-500"
                          : "" || value.status === "Delivered"
                          ? "bg-green-600"
                          : "" || value.status === "Cancelled"
                          ? "bg-red-500"
                          : ""
                      }`}
                    >
                      <select
                        className="text-sm text-gray-900  font-medium bg-transparent"
                        value={selectedStatus[value._id] || value.status}
                        onChange={(e) =>
                          handleStatusChange(value._id, e.target.value)
                        }
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approved">Approved</option>
                        <option value="Shipped">Shipped</option>
                        <option value="Delivered">Delivered</option>
                        <option value="Cancelled">Cancelled</option>
                      </select>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap border border-gray-200">
                      <div className="text-sm text-gray-900">
                        {" "}
                        <Button
                          variant="contained"
                          size="small"
                          color="success"
                          disabled={!selectedStatus[value._id]}
                          onClick={() => handleUpdate(value._id)}
                        >
                          Update Status
                        </Button>
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

export default ManageOrders;
