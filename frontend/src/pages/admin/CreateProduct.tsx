import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { ChangeEvent, FormEvent, useState } from "react";
import { useNewProductMutation } from "../../redux/api/productAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AdminMenu from "../../components/nav/AdminMenu";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../../types/api-types";

const CreateProduct = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [name, setName] = useState<string>("");
  const [category, setCategory] = useState<string>("");
  const [price, setPrice] = useState<number>(1000);
  const [stock, setStock] = useState<number>(1);
  const [photoPrev, setPhotoPrev] = useState<string>("");
  const [photo, setPhoto] = useState<File>();

  const [newProduct] = useNewProductMutation();
  const navigate = useNavigate();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];
     const reader: FileReader = new FileReader();
    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoPrev(reader.result);
          setPhoto(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!name || !price || stock < 0 || !category || !photo) return;

    const formData = new FormData();
    formData.append("name", name);
    formData.append("price", price.toString());
    formData.append("stock", stock.toString());
    formData.append("photo", photo as Blob); 
    formData.append("category", category);

    const res = await newProduct(formData);
    if("data" in res && res.data){
      toast.success(res.data.message)
      navigate("/dashboard/admin/products")
    }else{
      const error = res.error as FetchBaseQueryError;
      const messageResponse = error.data as MessageResponse;
      toast.error(messageResponse.message)
    }
   
  };

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
          <form onSubmit={submitHandler} className="max-w-md mt-4 p-6 bg-white rounded-md shadow-md">
            <h2 className="text-2xl font-semibold mb-4">New Product</h2>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Name</label>
              <input
                required
                type="text"
                placeholder="Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Price</label>
              <input
                required
                type="number"
                placeholder="Price"
                value={price}
                onChange={(e) => setPrice(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Stock</label>
              <input
                required
                type="number"
                placeholder="Stock"
                value={stock}
                onChange={(e) => setStock(Number(e.target.value))}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Category</label>
              <input
                required
                type="text"
                placeholder="eg. laptop, camera etc"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-600">Photo</label>
              <input required type="file" onChange={changeImageHandler} className="w-full" />
            </div>

            {photoPrev && <img src={photoPrev} alt="New Image" className="max-w-full mb-4" />}

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
            >
              Create
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;


