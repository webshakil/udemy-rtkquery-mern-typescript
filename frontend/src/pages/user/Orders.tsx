import { FaEye } from "react-icons/fa";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { useMyOrdersQuery } from "../../redux/api/orderAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

interface Order {
  _id: string;
  subtotal: number;
  discount: number;
  status:string;
  total:  number;
  orderItems:{
    name: string;
    photo: string;
    quantity: number
  }[];
}
export default function Orders() {
  const {user} = useSelector((state:RootState)=>state.userReducer);
  const {isLoading, data, isError, error} = useMyOrdersQuery(user?._id || "");
  if(isError){
    const err = error as CustomError;
    toast.error(err.data.message)
  }

  return (
    <div className="w-full h-full flex flex-col">
      
    <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16">
      Hello {user?.name}-{user?.role} dashboard
    </div>
    <div className="flex flex-grow">
    

      <div className="w-full p-4">
        <div className="p-3 mb-2 text-lg font-semibold bg-gray-200">Manage All Orders</div>

        {data ? (
          <div className="max-w-7xl mx-auto bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Order Summery</h1>

            <div className="overflow-x-auto">
              {data.orders.length > 0 ? (
                <table className="min-w-full border border-collapse rounded-md overflow-hidden">
                  <thead className="bg-gray-200">
                    <tr>
                      <th className="py-2 px-4 border-b border-r border-black">ID</th>
                      <th className="py-2 px-4 border-b border-r border-black">Quantity</th>
                      <th className="py-2 px-4 border-b border-r border-black">Discount</th>
                      <th className="py-2 px-4 border-b border-r border-black">Amount</th>
                      <th className="py-2 px-4 border-b border-r border-black">Status</th>
                      <th className="py-2 px-4 border-b border-black">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.orders.map((order: Order) => (
                      <tr key={order._id} className="border-b">
                        <td className="py-2 px-4 border-r border-b border-black">{order._id}</td>
                        <td className="py-2 px-4 border-r border-b border-black">{order.orderItems.length}</td>
                        <td className="py-2 px-4 border-r border-b border-black">{order.discount}</td>
                        <td className="py-2 px-4 border-r border-b border-black">{order.total}</td>
                        <td className="py-2 px-4 border-r border-b border-black">
                          <span
                            className={
                              order.status === "Processing"
                                ? "text-red-500"
                                : order.status === "Shipped"
                                ? "text-green-500"
                                : "text-purple-500"
                            }
                          >
                            {order.status}
                          </span>
                        </td>
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
              ) : (
                <div className="text-center font-bold text-6xl text-red-700">This user has no orders.</div>
              )}
             
            </div>
            <pre>{JSON.stringify(data, null, 4)}</pre>
          </div>
        ) : (
          <div>Loading...</div>
        )}
      </div>
    </div>
  </div>
);
}




















































// import { FaEye } from "react-icons/fa";
// import { Link } from "react-router-dom";
// import toast from "react-hot-toast";
// import { useSelector } from "react-redux";
// import { RootState } from "../../redux/store";
// import { useMyOrdersQuery } from "../../redux/api/orderAPI";
// import { CustomError } from "../../types/api-types";



// interface Order {
//   _id: string;
//   subtotal: number;
//   discount: number;
//   status: string;
//   total: number;
//   orderItems: {
//     name: string;
//     photo: string;
//     quantity: number;
//   }[];
// }

// export default function Orders() {
//   const { user } = useSelector((state: RootState) => state.userReducer);

//   const { isLoading, data, isError, error } = useMyOrdersQuery(user?._id || "");

//   if (isError) {
//     const err = error as CustomError;
//     toast.error(err.data.message);
//   }

//   return (
//     <div className="w-full h-full flex flex-col">
      
//       <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16">
//         Hello {user?.name}-{user?.role} dashboard
//       </div>
//       <div className="flex flex-grow">
      

//         <div className="w-full p-4">
//           <div className="p-3 mb-2 text-lg font-semibold bg-gray-200">Manage All Orders</div>

//           {data ? (
//             <div className="max-w-7xl mx-auto bg-white p-6 rounded-md shadow-md">
//               <h1 className="text-2xl font-bold mb-4">Order Summery</h1>

//               <div className="overflow-x-auto">
//                 {data.orders.length > 0 ? (
//                   <table className="min-w-full border border-collapse rounded-md overflow-hidden">
//                     <thead className="bg-gray-200">
//                       <tr>
//                         <th className="py-2 px-4 border-b border-r border-black">ID</th>
//                         <th className="py-2 px-4 border-b border-r border-black">Quantity</th>
//                         <th className="py-2 px-4 border-b border-r border-black">Discount</th>
//                         <th className="py-2 px-4 border-b border-r border-black">Amount</th>
//                         <th className="py-2 px-4 border-b border-r border-black">Status</th>
//                         <th className="py-2 px-4 border-b border-black">Actions</th>
//                       </tr>
//                     </thead>
//                     <tbody>
//                       {data.orders.map((order: Order) => (
//                         <tr key={order._id} className="border-b">
//                           <td className="py-2 px-4 border-r border-b border-black">{order._id}</td>
//                           <td className="py-2 px-4 border-r border-b border-black">{order.orderItems.length}</td>
//                           <td className="py-2 px-4 border-r border-b border-black">{order.discount}</td>
//                           <td className="py-2 px-4 border-r border-b border-black">{order.total}</td>
//                           <td className="py-2 px-4 border-r border-b border-black">
//                             <span
//                               className={
//                                 order.status === "Processing"
//                                   ? "text-red-500"
//                                   : order.status === "Shipped"
//                                   ? "text-green-500"
//                                   : "text-purple-500"
//                               }
//                             >
//                               {order.status}
//                             </span>
//                           </td>
//                           <td className="py-2 px-4 border-b border-black">
//                             <Link to={`/dashboard/admin/transaction/${order._id}`}>
//                               <button className="text-blue-500 hover:underline mr-2 text-lg">
//                                 <FaEye />
//                               </button>
//                             </Link>
//                           </td>
//                         </tr>
//                       ))}
//                     </tbody>
//                   </table>
//                 ) : (
//                   <div className="text-center font-bold text-6xl text-red-700">This user has no orders.</div>
//                 )}
               
//               </div>
//             </div>
//           ) : (
//             <div>Loading...</div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }




