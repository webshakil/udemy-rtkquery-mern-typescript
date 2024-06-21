import AdminMenu from "../../components/nav/AdminMenu";

export default function TransactionManagement() {
  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16">
        Hello Shakil-admin dashboard
      </div>

  
      <div className="flex flex-grow">
        
        <div className="w-1/4">
          <AdminMenu />
        </div>
        <div className="flex w-full">
      





      <div className="w-1/2 p-4 mr-4">
        <div className="bg-white p-6 rounded-md shadow-md">
          <h2 className="text-xl font-semibold mb-4">Order Items</h2>
         
            <div  className="flex items-center mb-6">
              <img src="" alt="" className="w-20 h-20 object-cover rounded-md mr-6" />
              <div>
                <h3 className="text-lg font-semibold">name</h3>
                <span className="text-gray-600">price,quantity,price,quantity</span>
                <p className="text-gray-600">Total: </p>
              </div>
            </div>
        
        </div>
      </div>







      

    
      <div className="w-1/2 p-4">
        <div className="bg-white p-6 rounded-md shadow-md">
          
          <h1 className="text-xl font-semibold mb-4">Order Info</h1>
          <h5 className="font-bold text-green-500">User info</h5>
          <p>
            <span className="font-semibold">Name:</span> 
          </p>
          <p>
            <span className="font-semibold">Address:</span>
          </p>
          <h5 className="font-bold text-green-500">Amount info</h5>
          <p>
            <span className="font-semibold">Subtotal:</span>
          </p>
          <p>
            <span className="font-semibold">Shipping Charges:</span> 
          </p>
          <p>
            <span className="font-semibold">Tax:</span> 
          </p>
          <p>
            <span className="font-semibold">Discount:</span>
          </p>
          <p>
            <span className="font-semibold">Total:</span> 
          </p>
          <h5 className="font-bold text-green-500">Status info</h5>
          <p>
          <span
                  className={
                    status === "Delivered"
                      ? "purple"
                      : status === "Shipped"
                      ? "green"
                      : "red"
                  }
                >
                  {status}
                </span>
          </p>
          <div className="flex justify-between mt-6">
            <button
            
              className="bg-red-500 text-white p-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring focus:border-red-300"
            >
              Delete
            </button>
            <button
             
              className="bg-green-500 text-white p-2 rounded-md hover:bg-green-600 focus:outline-none focus:ring focus:border-green-300"
            >
              Process
            </button>
          </div>
        </div>
      </div>
    </div>
      </div>
    </div>
  );
}
