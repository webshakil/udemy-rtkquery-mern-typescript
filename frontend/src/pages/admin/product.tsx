import { FaTrash } from "react-icons/fa";
import AdminMenu from "../../components/nav/AdminMenu";


const ProductManagement = () => {
  return (
    <div className="flex pt-20">
      <AdminMenu />
      <main className="product-management flex-grow p-8">
      
            <section className="flex flex-col items-center mb-8">
              <strong className="mb-2">ID -12345</strong>
              <img src="" alt="Product" className="w-40 h-40 rounded-full mb-2" />
              <p className="mb-2">Name</p>
             
                <span className="text-green-500">Stock Available</span>
          
                <span className="text-red-500"> Not Available</span>
             
              <h3 className="text-2xl mt-2">price</h3>
            </section>
            <article className="flex flex-col items-center">
              <button
                className="product-delete-btn bg-red-500 text-white p-2 rounded-full mb-4"
              
              >
                <FaTrash />
              </button>
              <form  className="text-center">
                <h2 className="text-2xl mb-4">Manage</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                   
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
          
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                  
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                 
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Photo</label>
                  <input type="file"  />
                </div>

                <img src="" alt="New Image" className="max-w-full mb-4" />
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  Update
                </button>
              </form>
            </article>
     
    
      </main>
    </div>
  );
};

export default ProductManagement;