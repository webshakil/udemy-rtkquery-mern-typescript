import React, { useState } from 'react';
import { useCategoriesQuery, useSearchProductsQuery } from '../redux/api/productAPI';
import { CustomError } from '../types/api-types';
import toast from 'react-hot-toast';
import { server } from '../redux/store';
const ShopPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  
  const addToCartHandler = () => {
   
  };
  const {
    data: categoriesResponse,
    isLoading: loadingCategories,
    isError,
    error,
  } = useCategoriesQuery("");
  
  const {
    isLoading: productLoading,
    data: searchedData,
    isError: productIsError,
    error: productError,
  } = useSearchProductsQuery({
    search,
    sort,
    category,
    page,
    price: maxPrice,
  });
  

  const isPrevPage = page > 1;
  
  const isNextPage = page < 4;
  

  if (isError) {
    const err = error as CustomError;
    toast.error(err.data.message);
  }
  if (productIsError) {
    const err = productError as CustomError;
    toast.error(err.data.message);
  }
  return (
    <div className="flex mt-16">
      <div className="w-3/12">
        <div className="p-4 bg-gray-100">
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Sort By:</label>
            <select
              className="mt-1 p-2 border rounded w-full"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="">None</option>
              <option value="asc">Price (Low to High)</option>
              <option value="dsc">Price (High to Low)</option>
            </select>
          </div>
          <div className="mb-4">
            <label className="block text-sm font-medium text-gray-600">Category:</label>
            <select
              className="mt-1 p-2 border rounded w-full"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            >
              <option value="">ALL</option>
              {!loadingCategories &&
                categoriesResponse?.categories.map((i) => (
                  <option key={i} value={i}>
                    {i.toUpperCase()}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-600">Price Range:</label>
            <div className="flex items-center space-x-2">
              <span>Max Price:{maxPrice || ""}</span>
              <input
                type="range"
                min={100}
                max={10000}
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="flex-1"
              />
              <span>${maxPrice}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="w-9/12">
        <div className="p-4">
          <input
            type="text"
            placeholder="Search by name..."
            className="p-2 border rounded w-1/2 mb-4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {productLoading ? (
          <p>Loading.......</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
            {searchedData && searchedData.products ? (
              searchedData.products.map((product) => (
                <div key={product._id} className="bg-white p-4 rounded-md shadow-md ">
                  <img
                    src={`${server}/${product.photo}`}
                    alt={product.name}
                    className="w-full h-32 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                  <p className="text-gray-600">Price: ${product.price}</p>
                  <button   onClick={() =>
                    addToCartHandler()
                  } className="bg-blue-500 text-white px-3 py-2 rounded-md mt-2 ">
                    Add to Cart
                  </button>
                  
                </div>
                
              ))
            ) : (
              <p>No products found.</p>
            )}
            
          </div>
        )}
{/* for pagination */}
{searchedData && searchedData.totalPage >= 1 && (
  <article className="p-4 flex items-center justify-center">
    <button
      className={`px-4 py-2 rounded-md ${!isPrevPage ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
      disabled={!isPrevPage}
      //prev represents the current state value of page
      onClick={() => setPage((prev) => prev - 1)}
      style={{ marginRight: '8px' }}
    >
      Prev
    </button>
    <span className="text-lg font-bold">
      {page} of {searchedData.totalPage}
    </span>
    <button
      className={`px-4 py-2 rounded-md ${!isNextPage ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
      disabled={!isNextPage}
      onClick={() => setPage((prev) => prev + 1)}
      style={{ marginLeft: '8px' }}
    >
      Next
    </button>
  </article>
)}
      </div>
     
    </div>
  );
};

export default ShopPage;

