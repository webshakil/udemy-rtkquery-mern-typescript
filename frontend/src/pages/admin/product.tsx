import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { Navigate,  useNavigate,  useParams } from "react-router-dom";
import {  useDeleteProductMutation, useProductDetailsQuery, useUpdateProductMutation } from "../../redux/api/productAPI";
import {  RootState, server } from "../../redux/store";
import { useSelector } from "react-redux";
import AdminMenu from "../../components/nav/AdminMenu";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { MessageResponse } from "../../types/api-types";


const ProductManagement = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);

  const params = useParams();
 const navigate = useNavigate();

  const { data, isLoading, isError } = useProductDetailsQuery(params.id!);

  const { price, photo, name, stock, category } = data?.product || {
    photo: "",
    category: "",
    name: "",
    stock: 0,
    price: 0,
  };

  const [priceUpdate, setPriceUpdate] = useState<number>(price);
  const [stockUpdate, setStockUpdate] = useState<number>(stock);
  const [nameUpdate, setNameUpdate] = useState<string>(name);
  const [categoryUpdate, setCategoryUpdate] = useState<string>(category);
  const [photoUpdate, setPhotoUpdate] = useState<string>("");
  const [photoFile, setPhotoFile] = useState<File>();

  const [updateProduct] = useUpdateProductMutation();
  const [deleteProduct] = useDeleteProductMutation();

  const changeImageHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const file: File | undefined = e.target.files?.[0];

    const reader: FileReader = new FileReader();

    if (file) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          setPhotoUpdate(reader.result);
          setPhotoFile(file);
        }
      };
    }
  };

  const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData();

    if (nameUpdate) formData.set("name", nameUpdate);
    if (priceUpdate) formData.set("price", priceUpdate.toString());
    if (stockUpdate !== undefined)
      formData.set("stock", stockUpdate.toString());
    if (photoFile) formData.set("photo", photoFile);
    if (categoryUpdate) formData.set("category", categoryUpdate);

    const res = await updateProduct({
      formData,
      productId: data?.product._id!,
    });

   if("data" in res && res.data){
  toast.success(res.data.message)
  navigate("/dashboard/admin/products")
}else{
  const error = res.error as FetchBaseQueryError;
  const messageResponse = error.data as MessageResponse;
  toast.error(messageResponse.message)
}
  };

  const deleteHandler = async () => {
    const res = await deleteProduct({
      productId: data?.product._id!,
    });

    if("data" in res && res.data){
  toast.success(res.data.message)
  navigate("/dashboard/admin/products")
}else{
  const error = res.error as FetchBaseQueryError;
  const messageResponse = error.data as MessageResponse;
  toast.error(messageResponse.message)
}
  };

  useEffect(() => {
    if (data) {
      setNameUpdate(data.product.name);
      setPriceUpdate(data.product.price);
      setStockUpdate(data.product.stock);
      setCategoryUpdate(data.product.category);
    }
  }, [data]);

  if (isError) return <Navigate to={"/404"} />;

  return (
    <div className="flex pt-20">
      <AdminMenu />
      <main className="product-management flex-grow p-8">
        {isLoading ? (
          <p>Loading......</p>
        ) : (
          <>
            <section className="flex flex-col items-center mb-8">
              <strong className="mb-2">ID - {data?.product._id}</strong>
              <img src={`${server}/${photo}`} alt="Product" className="w-40 h-40 rounded-full mb-2" />
              <p className="mb-2">{name}</p>
              {stock > 0 ? (
                <span className="text-green-500">{stock} Available</span>
              ) : (
                <span className="text-red-500"> Not Available</span>
              )}
              <h3 className="text-2xl mt-2">${price}</h3>
            </section>
            <article className="flex flex-col items-center">
              <button
                className="product-delete-btn bg-red-500 text-white p-2 rounded-full mb-4"
                onClick={deleteHandler}
              >
                <FaTrash />
              </button>
              <form onSubmit={submitHandler} className="text-center">
                <h2 className="text-2xl mb-4">Manage</h2>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Name</label>
                  <input
                    type="text"
                    placeholder="Name"
                    value={nameUpdate}
                    onChange={(e) => setNameUpdate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Price</label>
                  <input
                    type="number"
                    placeholder="Price"
                    value={priceUpdate}
                    onChange={(e) => setPriceUpdate(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Stock</label>
                  <input
                    type="number"
                    placeholder="Stock"
                    value={stockUpdate}
                    onChange={(e) => setStockUpdate(Number(e.target.value))}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Category</label>
                  <input
                    type="text"
                    placeholder="eg. laptop, camera etc"
                    value={categoryUpdate}
                    onChange={(e) => setCategoryUpdate(e.target.value)}
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div className="mb-4">
                  <label className="block text-sm font-medium text-gray-600">Photo</label>
                  <input type="file" onChange={changeImageHandler} />
                </div>

                {photoUpdate && <img src={photoUpdate} alt="New Image" className="max-w-full mb-4" />}
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800"
                >
                  Update
                </button>
              </form>
            </article>
          </>
        )}
      </main>
    </div>
  );
};

export default ProductManagement;