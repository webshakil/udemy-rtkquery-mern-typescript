import { useDispatch, useSelector } from "react-redux";
import { RootState, server } from "../redux/store";
import { addToCart, calculatePrice, discountApplied, removeCartItem } from "../redux/reducer/cartReducer";
import { CartItem } from "../types/types";
import { useEffect, useState } from "react";
import CartItemsCard from "../components/CartItemsCard";
import axios from "axios";
import { Link } from "react-router-dom";

const CartPage = () => {
  const { cartItems, subtotal, tax, total, shippingCharges, discount } =
  useSelector((state: RootState) => state.cartReducer);
const dispatch = useDispatch();

const [couponCode, setCouponCode] = useState<string>("");
const [isValidCouponCode, setIsValidCouponCode] = useState<boolean>(false);
const incrementHandler = (cartItem: CartItem) => {
  if (cartItem.quantity >= cartItem.stock) return;

  dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity + 1 }));
};
const decrementHandler = (cartItem: CartItem) => {
  if (cartItem.quantity <= 1) return;

  dispatch(addToCart({ ...cartItem, quantity: cartItem.quantity - 1 }));
};
const removeHandler=(productId:string)=>{
  dispatch(removeCartItem(productId))
}

useEffect(() => {
  const { token: cancelToken, cancel } = axios.CancelToken.source();

  const timeOutID = setTimeout(() => {
    axios
      .get(`${server}/api/v1/payment/discount?coupon=${couponCode}`, {
        cancelToken,
      })
      .then((res) => {
        dispatch(discountApplied(res.data.discount));
        setIsValidCouponCode(true);
        dispatch(calculatePrice());
      })
      .catch(() => {
        dispatch(discountApplied(0));
        setIsValidCouponCode(false);
        dispatch(calculatePrice());
      });
  }, 1000);

  return () => {
    clearTimeout(timeOutID);
    cancel();
    setIsValidCouponCode(false);
  };
}, [couponCode]);
useEffect(() => {
  dispatch(calculatePrice());
}, [cartItems]);
  return (

    <div className="h-screen bg-gray-100 pt-20">
      <h1 className="mb-10 text-center text-2xl font-bold">Cart Items</h1>
      <div className="mx-auto max-w-5xl justify-center px-6 md:flex md:space-x-6 xl:px-0">
        <div className="rounded-lg md:w-2/3">
        {cartItems.length > 0 ? (
          cartItems.map((i, idx) => (
            <CartItemsCard
              incrementHandler={incrementHandler}
              decrementHandler={decrementHandler}
              removeHandler={removeHandler}
              key={idx}
              cartItem={i}
            />
          ))
        ) : (
          
          <>    <div className="flex flex-col items-center justify-center bg-lime-400">
          <h1 className="text-3xl font-bold text-black mb-4">
            No Items Added
          </h1>
          <p className="text-lg text-black-200">
            Please add items to continue.
          </p>
        </div></>
        )}
      
        </div>
        {/* Sub total */}
        <div className="mt-6 h-full rounded-lg border bg-white p-6 shadow-md md:mt-0 md:w-1/3">
          <div className="mb-2 flex justify-between">
            <p className="text-gray-700">Subtotal</p>
            <p className="text-gray-700">${subtotal}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Shipping Charges</p>
            <p className="text-gray-700">${shippingCharges}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Tax</p>
            <p className="text-gray-700">${tax}</p>
          </div>
          <div className="flex justify-between">
            <p className="text-gray-700">Discount</p>
            <p className="text-gray-700">-${discount}</p>
          </div>
          <hr className="my-4" />
          <div className="flex justify-between">
            <p className="text-lg font-bold">Total</p>
            <div className="">
              <p className="mb-1 text-lg font-bold">${total}</p>
              <p className="text-sm text-gray-700">including VAT</p>
            </div>
        
          </div>
         <div className="pt-10"> <input
                type="text"
                 placeholder="Coupon Code"
                 className="p-3 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500 transition-all duration-300"
                 value={couponCode}
                  onChange={(e) => setCouponCode(e.target.value)}
        /></div>
          {couponCode &&
          (isValidCouponCode ? (
            <span className="green">
              ${discount} off using the <code>{couponCode}</code>
            </span>
          ) : (
            <span className="red">
              Invalid Coupon 
            </span>
          ))}
          {cartItems.length > 0 && <Link to="/dashboard/user/shipping"><button className="mt-6 w-full rounded-md bg-blue-500 py-1.5 font-medium text-blue-50 hover:bg-blue-600">Check out</button></Link>}
         
        </div>
      </div>
    </div>
   );
};

export default CartPage;


