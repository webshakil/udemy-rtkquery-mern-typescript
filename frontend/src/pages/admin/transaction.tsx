import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { RootState, server } from "../../redux/store";
import { useAllOrdersQuery } from "../../redux/api/orderAPI";
import AdminMenu from "../../components/nav/AdminMenu";


interface Order {
  _id: string;
  subtotal: number;
  discount: number;
  status: string;
  orderItems: {
    name: string;
    photo: string;
    quantity: number;
  }[];
}

export default function Transaction() {
  const { isLoading, data, isError, error } = useAllOrdersQuery("");
  const { user } = useSelector((state: RootState) => state.userReducer);

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }

  return (
    <div className="w-full h-full flex flex-col">
      {/* Upper area with greeting */}
      <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16">
        Hello {user?.name}-admin dashboard
      </div>

      {/* Lower area with Admin Links and Information */}
      <div className="flex flex-grow">
        {/* Left side with Admin Links */}
        <div className="w-1/4">
          <AdminMenu />
        </div>

        {/* Right side with Admin Information */}
        <div className="w-3/4 p-4">
          <div className="p-3 mb-2 text-lg font-semibold bg-gray-200">Manage All Products</div>

          {data ? (
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-md shadow-md">
              <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>

              <div className="overflow-x-auto">
                <table className="min-w-full border border-collapse rounded-md overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 border-b border-r border-black">Avatar</th>
                      <th className="py-2 px-4 border-b border-r border-black">Name</th>
                      <th className="py-2 px-4 border-b border-r border-black">Amount</th>
                      <th className="py-2 px-4 border-b border-r border-black">Discount</th>
                      <th className="py-2 px-4 border-b border-r border-black">Quantity</th>
                      <th className="py-2 px-4 border-b border-r border-black">Status</th>
                      <th className="py-2 px-4 border-b border-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orders.map((order: Order) => (
                      <tr key={order._id} className="border-b">
                        <td className="py-2 px-4 border-r border-b border-black">
                        <img src={`${server}/${order?.orderItems[0]?.photo}`} className="w-12 h-12 object-cover rounded-md" />
                           
                        
                        </td>
                        <td className="py-2 px-4 border-r border-b border-black">{order.orderItems[0].name}</td>
                        <td className="py-2 px-4 border-r border-b border-black">{order.subtotal}</td>
                        <td className="py-2 px-4 border-r border-b border-black">{order.discount}</td>
                        <td className="py-2 px-4 border-r border-b border-black">{order.orderItems[0].quantity}</td>
                        <td className="py-2 px-4 border-r border-b border-black">{order.status}</td>
                        <td className="py-2 px-4 border-b border-black">
                          <Link to={`/dashboard/admin/transaction/${order._id}`}>
                            <button className="text-blue-500 hover:underline mr-2 text-lg">
                              <FaEye />
                            </button>
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <pre>{JSON.stringify(data, null,4)}</pre>
              </div>
            </div>
          ) : (
            <div>Loading...</div>
          )}
        </div>
      </div>
    </div>
  );
}



