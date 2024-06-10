import { useSelector } from "react-redux";
import AdminMenu from "../../components/nav/AdminMenu";
import { RootState } from "../../redux/store";
  const CreateProduct=() => {
    const {user} = useSelector((state:RootState)=>state.userReducer)
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
       
<form  className="max-w-md mt-4 p-6 bg-white rounded-md shadow-md">
  <h2 className="text-2xl font-semibold mb-4">New Product</h2>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600">Name</label>
    <input
      required
      type="text"
      placeholder="Name"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600">Price</label>
    <input
      required
      type="number"
      placeholder="Price"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600">Stock</label>
    <input
      required
      type="number"
      placeholder="Stock"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600">Category</label>
    <input
      required
      type="text"
      placeholder="eg. laptop, camera etc"
      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
    />
  </div>

  <div className="mb-4">
    <label className="block text-sm font-medium text-gray-600">Photo</label>
    <input required type="file"  className="w-full" />
  </div>

  {/* {photoPrev && <img src={photoPrev} alt="New Image" className="max-w-full mb-4" />} */}

  <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
    Create
  </button>
</form>

        </div>
      </div>
    </div>
  );
}

export default CreateProduct
