import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js"
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import {loadStripe} from '@stripe/stripe-js'
import { RootState } from "../../redux/store";
import { FormEvent, useState } from "react";
import { useNewOrderMutation } from "../../redux/api/orderAPI";
import { MessageResponse, NewOrderRequest } from "../../types/api-types";
import toast from "react-hot-toast";
import { resetCart } from "../../redux/reducer/cartReducer";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const stripePromise = loadStripe ("pk_test_51InRYbBQD8tUvbON0sf6djoAXSVj2nQkioPdPzuziRfWeciIXPWe3nJW5eDBIQIzwgEovScGCt91pJVxe57LPtvF00k9bWCIep")
const CheckOutForm=()=> {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const {user} = useSelector((state:RootState)=>state.userReducer);
    const {shippingInfo, cartItems, subtotal, tax, discount, shippingCharges, total} =useSelector((state:RootState)=>state.cartReducer);
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [newOrder] = useNewOrderMutation();
    const submitHandler = async(e:FormEvent<HTMLFormElement>)=>{
        e.preventDefault();
        if(!stripe || !elements) return;
        setIsProcessing(true);
        const orederData: NewOrderRequest = {
            shippingInfo,
            orderItems: cartItems,
            subtotal,
            tax,
            discount,
            shippingCharges,
            total,
            user: user?._id!
        };
        const {paymentIntent, error} = await stripe.confirmPayment({
            elements,
            confirmParams:{return_url:window.location.origin},
            redirect:"if_required"
        });
        if(error){
            setIsProcessing(false);
            return toast.error(error.message || "Something went wrong");
        }
        if(paymentIntent.status === "succeeded"){
            const res = await newOrder(orederData)
            dispatch(resetCart());
            if("data" in res && res.data){
                toast.success(res.data.message);
                if(navigate) navigate("/dashboard/user/orders")
            }else{
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as MessageResponse;
                toast.error(messageResponse.message)
            }

        }
    }
  return (
    <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
    <form onSubmit={submitHandler} className="space-y-4">
      
      <div className="mb-4">
        <PaymentElement />       
       </div>
      <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600" disabled={isProcessing}>
        {isProcessing ? "Processing..." : "Pay"}
      </button>
    </form>
  </div>
);
};

const Checkout = () => {
const location = useLocation();

const clientSecret: string | undefined = location.state;

if (!clientSecret) return <Navigate to={"/shipping"} />;

return (
  <Elements
    options={{
      clientSecret,
    }}
    stripe={stripePromise}
  >
    <CheckOutForm />
  </Elements>
);
};



export default Checkout


























































































// import {
//     Elements,
//     PaymentElement,
//     useElements,
//     useStripe,
//   } from "@stripe/react-stripe-js";
//   import { loadStripe } from "@stripe/stripe-js";
//   import { FormEvent, useState } from "react";
//   import toast from "react-hot-toast";
//   import { useDispatch, useSelector } from "react-redux";
//   import { Navigate, useLocation, useNavigate } from "react-router-dom";
// import { RootState } from "../../redux/store";
// import { useNewOrderMutation } from "../../redux/api/orderAPI";
// import { MessageResponse, NewOrderRequest } from "../../types/api-types";
// import { resetCart } from "../../redux/reducer/cartReducer";
// import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
 
  
//   const stripePromise = loadStripe("pk_test_51InRYbBQD8tUvbON0sf6djoAXSVj2nQkioPdPzuziRfWeciIXPWe3nJW5eDBIQIzwgEovScGCt91pJVxe57LPtvF00k9bWCIep");
  
//   const CheckOutForm = () => {
//     const stripe = useStripe();
//     const elements = useElements();
//     const navigate = useNavigate();
//     const dispatch = useDispatch();
  
//     const { user } = useSelector((state: RootState) => state.userReducer);
  
//     const {
//       shippingInfo,
//       cartItems,
//       subtotal,
//       tax,
//       discount,
//       shippingCharges,
//       total,
//     } = useSelector((state: RootState) => state.cartReducer);
  
//     const [isProcessing, setIsProcessing] = useState<boolean>(false);
  
//     const [newOrder] = useNewOrderMutation();
  
//     const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
//       e.preventDefault();
  
//       if (!stripe || !elements) return;
//       setIsProcessing(true);
  
//       const orderData: NewOrderRequest = {
//         shippingInfo,
//         orderItems: cartItems,
//         subtotal,
//         tax,
//         discount,
//         shippingCharges,
//         total,
//         user: user?._id!,
//       };
  
//       const { paymentIntent, error } = await stripe.confirmPayment({
//         elements,
//         confirmParams: { return_url: window.location.origin },
//         redirect: "if_required",
//       });
  
//       if (error) {
//         setIsProcessing(false);
//         return toast.error(error.message || "Something Went Wrong");
//       }
  
//       if (paymentIntent.status === "succeeded") {
//         const res = await newOrder(orderData);
//         dispatch(resetCart());
//         if("data" in res && res.data){
//             toast.success(res.data.message)
//             if(navigate) navigate("/dashboard/user/orders");
//         }else{
//             const error = res.error as FetchBaseQueryError;
//             const messageResponse = error.data as MessageResponse
//             toast.error(messageResponse.message)
//         }
//       }
//       setIsProcessing(false);
//     };
//     return (
//       <div className="max-w-md mx-auto p-4 bg-white shadow-md rounded-md">
//         <form onSubmit={submitHandler} className="space-y-4">
          
//           <div className="mb-4">
//             <PaymentElement />       
//            </div>
//           <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md transition duration-300 hover:bg-blue-600" disabled={isProcessing}>
//             {isProcessing ? "Processing..." : "Pay"}
//           </button>
//         </form>
//       </div>
//     );
//   };
  
//   const Checkout = () => {
//     const location = useLocation();
  
//     const clientSecret: string | undefined = location.state;
  
//     if (!clientSecret) return <Navigate to={"/shipping"} />;
  
//     return (
//       <Elements
//         options={{
//           clientSecret,
//         }}
//         stripe={stripePromise}
//       >
//         <CheckOutForm />
//       </Elements>
//     );
//   };
  
//   export default Checkout;