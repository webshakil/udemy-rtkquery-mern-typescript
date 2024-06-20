import { FaEye } from "react-icons/fa";


export default function Orders() {

  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16">
        Hello lamin . User dashboard
      </div>
      <div className="flex flex-grow">
      

        <div className="w-full p-4">
          <div className="p-3 mb-2 text-lg font-semibold bg-gray-200">Manage All Orders</div>

         
            <div className="max-w-7xl mx-auto bg-white p-6 rounded-md shadow-md">
              <h1 className="text-2xl font-bold mb-4">Order Summery</h1>

              <div className="overflow-x-auto">
                
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
                      
                        <tr  className="border-b">
                          <td className="py-2 px-4 border-r border-b border-black">Order Id</td>
                          <td className="py-2 px-4 border-r border-b border-black">Total Orders</td>
                          <td className="py-2 px-4 border-r border-b border-black">Discount</td>
                          <td className="py-2 px-4 border-r border-b border-black">Total</td>
                          <td className="py-2 px-4 border-r border-b border-black">
                          
                          </td>
                          <td className="py-2 px-4 border-b border-black">
                           
                              <button className="text-blue-500 hover:underline mr-2 text-lg">
                                <FaEye />
                              </button>
                           
                          </td>
                        </tr>
                    
                    </tbody>
                  </table>
              
                  <div className="text-center font-bold text-6xl text-red-700">This user has no orders.</div>
            
               
              </div>
            </div>
       
            <div>Loading...</div>
         
        </div>
      </div>
    </div>
  );
}



