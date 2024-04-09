import React, { useEffect, useState } from "react";
import axios from "../axiosbase";
import { useSelector } from "react-redux";
import { CircularProgress, Button } from "@mui/material";
import CancelIcon from "@mui/icons-material/Cancel";
import toast from "react-hot-toast";

function formatDateTime(dateTimeString) {
  // Create a new Date object from the given date-time string
  const dateTime = new Date(dateTimeString);

  // Get the components of the date-time
  const year = dateTime.getFullYear();
  const month = ("0" + (dateTime.getMonth() + 1)).slice(-2); // Months are zero-based
  const day = ("0" + dateTime.getDate()).slice(-2);
  const hours = ("0" + dateTime.getHours()).slice(-2);
  const minutes = ("0" + dateTime.getMinutes()).slice(-2);
  const seconds = ("0" + dateTime.getSeconds()).slice(-2);

  // Construct the human-readable format
  const formattedDateTime = `${hours}:${minutes} ${day}/${month}/${year} `;

  return formattedDateTime;
}
const Orders = () => {
  const user = useSelector((state) => state.user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    const getOrders = async () => {
      if (user.user && user.user.id) {
        try {
          const res = await axios.get(
            `/order/getOrderByUserId/${user.user.id}`
          );
          const sortedOrders = res.data.orders.sort((a, b) => {
            // Convert strings to Date objects for comparison
            const dateA = new Date(a.createdAt);
            const dateB = new Date(b.createdAt);
            // Compare date objects
            return dateB - dateA; // Sort in descending order (most recent first)
          });
          setOrders(sortedOrders);
        } catch (error) {
          console.error("Error fetching orders:", error);
        }
      } else {
        console.warn("User ID is null or undefined");
      }
    };
    getOrders();
  }, [user.user]);

  const cancelOrder = async (oid) => {
    const res = await toast.promise(
      axios.post(`/order/cancelOrder/${user.user.id}/${oid}`),
      {
        loading: "Loading ...", // Message shown while fetching data
        success: "Order Cancel successfully", // Success message
        error: "Failed to load data", // Error message
      }
    );
  };

  if (!orders) {
    return <CircularProgress />;
  }
  return (
    <div className="flex flex-col gap-5 items-center">
      <h2>Your Orders</h2>
      <div className="order-conatiner h-fit p-8 bg-wh1">
        <div className="order flex flex-col gap-2 w-[80vh]">
          {/* Map each order */}
          {!orders ? (
            <CircularProgress />
          ) : (
            orders.map((order, index) => (
              <div className="flex flex-col gap-2 bg-white p-4" key={order._id}>
                <div className="flex w-full justify-between">
                  <h3>Order #{index + 1}</h3>
                  <h5 className="text-sm text-g1">
                    Placed on : {formatDateTime(order.createdAt)}
                  </h5>
                </div>
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Product Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Price
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                      >
                        Quantity
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {order.products.map((product) => (
                      <tr key={product._id}>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.productName}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.price}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {product.quantity}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="w-full flex justify-between ">
                  <p className="text-sm py-2">
                    Order Value : ${order.totalPrice}
                  </p>
                  <p className="text-sm py-2">Status : {order.status}</p>
                </div>
                <Button
                  className="cursor-pointer"
                  variant="outlined"
                  color="error"
                  endIcon={<CancelIcon />}
                  onClick={() => cancelOrder(order._id)}
                  disabled={order.status === "Cancelled"}
                >
                  {order.status === "Cancelled"
                    ? "Already Cancelled"
                    : "Cancel Order"}
                </Button>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};

export default Orders;

{
  /* <table className="min-w-full divide-y divide-gray-200">
<thead className="bg-gray-50">
  <tr>
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      Company
    </th>
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      Contact
    </th>
    <th
      scope="col"
      className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
    >
      Country
    </th>
  </tr>
</thead>
<tbody className="bg-white divide-y divide-gray-200">
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">
        Alfreds Futterkiste
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">Maria Anders</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">Germany</div>
    </td>
  </tr>
  <tr>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">
        Centro comercial Moctezuma
      </div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">Francisco Chang</div>
    </td>
    <td className="px-6 py-4 whitespace-nowrap">
      <div className="text-sm text-gray-900">Mexico</div>
    </td>
  </tr>
</tbody>
</table> */
}
