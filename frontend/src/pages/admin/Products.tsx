import { useSelector } from "react-redux";
import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import AdminMenu from "../../components/nav/AdminMenu";
import { RootState, server } from "../../redux/store";
import { useAllProductsQuery } from "../../redux/api/productAPI";
import { Product } from "../../types/types";
export default function AdminProduct() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const {data, isLoading, isError}= useAllProductsQuery("")
  //Handling loading and error state
  if(isLoading){
    return <div>Loading</div>
  }
  if(isError || !data || !data.products){
    return <div>Error loading products</div>
  }
  const products :Product[] =data.products

   return (
    <div className="w-full h-full flex flex-col">
      <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16">
        Hello {user?.name}-admin dashboard
      </div>
      <div className="flex flex-grow">
        <div className="w-1/4">
          <AdminMenu />
        </div>

        <div className="w-3/4 p-4">
          <div className="p-3 mb-2 text-lg font-semibold bg-gray-200">Manage All Products</div>

          <div className="max-w-7xl mx-auto bg-white p-6 rounded-md shadow-md">
            <h1 className="text-2xl font-bold mb-4">Product Dashboard</h1>

            <div className="overflow-x-auto">
              <table className="min-w-full border border-collapse rounded-md overflow-hidden">
                <thead className="bg-gray-200">
                  <tr>
                    <th className="py-2 px-4 border-b border-r border-black">Image</th>
                    <th className="py-2 px-4 border-b border-r border-black">Name</th>
                    <th className="py-2 px-4 border-b border-r border-black">Price</th>
                    <th className="py-2 px-4 border-b border-r border-black">Stock</th>
                    <th className="py-2 px-4 border-b border-r border-black">Category</th>
                    <th className="py-2 px-4 border-b border-black">Actions</th>
                  </tr>
                </thead>
                <tbody>
             {products.map((product:Product)=>(
                    <tr key={product._id} className="border-b">
                      <td className="py-2 px-4 border-r border-b border-black">
                        <img src={`${server}/${product.photo}`} className="w-12 h-12 object-cover rounded-md" />
                      </td>
                      <td className="py-2 px-4 border-r border-b border-black">{product.name}</td>
                      <td className="py-2 px-4 border-r border-b border-black">{product.price}</td>
                      <td className="py-2 px-4 border-r border-b border-black">{product.stock}</td>
                      <td className="py-2 px-4 border-r border-b border-black">{product.category}</td>
                      
                      <td className="py-2 px-4 border-b border-black">
                        <Link to=""><button className="text-blue-500 hover:underline mr-2 text-lg"><FaEye /></button></Link>
                        
                      </td>
                    </tr>
                  ))}
             
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


