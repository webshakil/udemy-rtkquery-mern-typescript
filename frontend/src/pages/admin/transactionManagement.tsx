import { useSelector } from "react-redux";
import { RootState, server } from "../../redux/store";
import { useDeleteOrderMutation, useOrderDetailsQuery, useUpdateOrderMutation } from "../../redux/api/orderAPI";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { Order } from "../../types/types";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../../types/api-types";
import AdminMenu from "../../components/nav/AdminMenu";

const defaultData: Order = {
  shippingInfo: {
    address: "",
    city: "",
    state: "",
    country: "",
    pinCode: "",
  },
  status: "",
  subtotal: 0,
  discount: 0,
  shippingCharges: 0,
  tax: 0,
  total: 0,
  orderItems: [],
  user: { name: "", _id: "" },
  _id: "",
};

export default function TransactionManagement() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const params = useParams();
  const navigate = useNavigate();

  const { isLoading, data, isError } = useOrderDetailsQuery(params.id!);

  const order = data?.order || defaultData;
  const {
    shippingInfo: { address, city, state, country, pinCode },
    orderItems,
    user: orderUser,
    status,
    tax,
    subtotal,
    total,
    discount,
    shippingCharges,
  } = order;

  const [updateOrder] = useUpdateOrderMutation();
  const [deleteOrder] = useDeleteOrderMutation();

  const updateHandler = async () => {
    if (order && user) {
      const res = await updateOrder({
        userId: user._id,
        orderId: order._id,
      });
      if ("data" in res && res.data) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/transaction");
      } else {
        const error = res.error as FetchBaseQueryError;
        const messageResponse = error.data as MessageResponse;
        toast.error(messageResponse.message);
      }
    }
  };

  const deleteHandler = async () => {
    if (order && user) {
      const res = await deleteOrder({
        userId: user._id,
        orderId: order._id,
      });
      if ("data" in res && res.data) {
        toast.success(res.data.message);
        navigate("/dashboard/admin/transaction");
      } else {
        const error = res.error as FetchBaseQueryError;
        const messageResponse = error.data as MessageResponse;
        toast.error(messageResponse.message);
      }
    }
  };

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16">
        Hello {user?.name}-admin dashboard
      </div>

      <div className="flex flex-grow">
        <div className="w-1/4">
          <AdminMenu />
        </div>
        <div className="flex w-full">
          <div className="w-1/2 p-4 mr-4">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h2 className="text-xl font-semibold mb-4">Order Items</h2>
              {orderItems.map((i) => (
                <div key={i._id} className="flex items-center mb-6">
                  <img
                    src={`${server}/${i.photo}`}
                    alt={i.name}
                    className="w-20 h-20 object-cover rounded-md mr-6"
                  />
                  <div>
                    <h3 className="text-lg font-semibold">{i.name}</h3>
                    <span className="text-gray-600">
                      ${i.price} X {i.quantity}={i.price * i.quantity}
                    </span>
                    <p className="text-gray-600">Total: ${i.price * i.quantity}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="w-1/2 p-4">
            <div className="bg-white p-6 rounded-md shadow-md">
              <h1 className="text-xl font-semibold mb-4">Order Info</h1>
              <h5 className="font-bold text-green-500">User info</h5>
              <p>
                <span className="font-semibold">Name:</span> {orderUser?.name || "N/A"}
              </p>
              <p>
                <span className="font-semibold">Address:</span> {`${address},${city},${state},${country},${pinCode}`}
              </p>
              <h5 className="font-bold text-green-500">Amount info</h5>
              <p>
                <span className="font-semibold">Subtotal:</span> ${subtotal}
              </p>
              <p>
                <span className="font-semibold">Shipping Charges:</span> ${shippingCharges}
              </p>
              <p>
                <span className="font-semibold">Tax:</span> ${tax}
              </p>
              <p>
                <span className="font-semibold">Discount:</span> ${discount}
              </p>
              <p>
                <span className="font-semibold">Total:</span> ${total}
              </p>
              <h5 className="font-bold text-green-500">Status info</h5>
              <p>
                <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
              </p>
              <div className="flex justify-between mt-6">
                <button
                  onClick={deleteHandler}
                  className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
                >
                  Delete
                </button>
                <button
                  onClick={updateHandler}
                  className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
                >
                  Process
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <pre>{JSON.stringify(data, null, 4)}</pre>
    </div>
  );
}
