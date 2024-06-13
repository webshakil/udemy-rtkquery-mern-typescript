import React, { useState } from 'react';
const ShopPage: React.FC = () => {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("");
  const [maxPrice, setMaxPrice] = useState(100000);
  const [category, setCategory] = useState("");
  const [page, setPage] = useState(1);
  
  const addToCartHandler = () => {

  };


  const isPrevPage = page > 1;
  const isNextPage = page < 4;


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
             
                  
                  <option value="">ALL</option>
    <option value="electronics">Electronics</option>
    <option value="fashion">Fashion</option>
    <option value="home-garden">Home & Garden</option>
    <option value="sports">Sports</option>
    <option value="toys">Toys</option>
    <option value="beauty">Beauty</option>
    <option value="books">Books</option>
    <option value="automotive">Automotive</option>
    <option value="music">Music</option>
    <option value="health">Health</option>
    <option value="outdoors">Outdoors</option>
               
               
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

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-4">
           
                <div  className="bg-white p-4 rounded-md shadow-md ">
                  <img
                    src=""
                    alt=""
                    className="w-full h-32 object-cover mb-4"
                  />
                  <h3 className="text-lg font-semibold mb-2">Name</h3>
                  <p className="text-gray-600">Price</p>
                  <button   onClick={() =>
                    addToCartHandler()
                  } className="bg-blue-500 text-white px-3 py-2 rounded-md mt-2 ">
                    Add to Cart
                  </button>
                  
                </div>
            
          </div>
     


  <article className="p-4 flex items-center justify-center">
    <button
      className={`px-4 py-2 rounded-md ${!isPrevPage ? 'bg-gray-400 text-gray-700 cursor-not-allowed' : 'bg-blue-500 text-white hover:bg-blue-700'}`}
      disabled={!isPrevPage}
      onClick={() => setPage((prev) => prev - 1)}
      style={{ marginRight: '8px' }}
    >
      Prev
    </button>
    <span className="text-lg font-bold">
     
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
      </div>
     
    </div>
  );
};

export default ShopPage;
