import CartItemsCard from "../components/CartItemsCard";

const CartPage = () => {
   return (
       <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
        <CartItemsCard/>
        </div>
       
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">subtotal</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping Charges</p>
            <p className="text-gray-700">shippingCharges</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Tax</p>
            <p className="text-gray-700">tax</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Discount</p>
            <p className="text-gray-700">discount</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">total</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
        
          </div>
         <div className="pt-10"> <input
                type="text"
                 placeholder="Coupon Code"
                 className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
                
        /></div>
          
            <span className="green">
              Discount off using the <code>couponCode</code>
            </span>
        
            <span className="red">
              
            </span>
        
          <button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button>
         
        </div>
      </div>
    </div>
   );
};

export default CartPage;

