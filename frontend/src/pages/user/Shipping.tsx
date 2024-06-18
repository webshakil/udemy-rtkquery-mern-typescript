import { useDispatch, useSelector } from "react-redux";
import { RootState, server } from "../../redux/store";
import { useNavigate } from "react-router-dom";
import {  ChangeEvent, FormEvent, useEffect, useState } from "react";
import { BiArrowBack } from "react-icons/bi";
import { saveShippingInfo } from "../../redux/reducer/cartReducer";
import axios from "axios";
import toast from "react-hot-toast";
const Shipping = () => {
    const {cartItems, total} = useSelector((state:RootState)=>state.cartReducer)
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [shippingInfo, setShippingInfo]= useState({address:"",city:"", state:"",country:"",pinCode:""});
    const changeHandler=(e:ChangeEvent<HTMLInputElement | HTMLSelectElement>)=>{
        setShippingInfo((prev)=>({...prev,[e.target.name]:e.target.value}));
    }
    const submitHnadler =async(e:FormEvent<HTMLFormElement>)=>{
      e.preventDefault();
      dispatch(saveShippingInfo(shippingInfo));
      try{
        const {data}= await axios.post(
          `${server}/api/v1/payment/create`,
          {
            amount: total,
          },
          {
            headers:{
              "Content-Type":"application/json",
            }
          }
        )
        navigate("/dashboard/user/pay",{
          state:data.clientSecret,
          
        })
      }catch(error){
        console.log(error);
        toast.error("Something went wrong")
      }
     
    }
    useEffect(()=>{
      if(cartItems.length<=0) return navigate("/cart")
    })
  return (
    <div className="flex items-center justify-center h-screen">
       <div className="bg-white p-8 rounded shadow-md w-96">
      <button className="back-btn" >
        <BiArrowBack />
      </button>
      <form onSubmit={submitHnadler}>
           <div className="mb-4">
             <label htmlFor="address" className="block text-sm font-medium text-gray-600">
              Address
           </label>             
           <input
              required
              type="text"
              name="address"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your address"
              value={shippingInfo.address}
              onChange={changeHandler}
            />
          </div>

          <div className="mb-4">
             <label htmlFor="city" className="block text-sm font-medium text-gray-600">
              City
            </label>
            <input
              required
               type="text"
               name="city"
               className="mt-1 p-2 w-full border rounded-md"
               placeholder="Enter your city"
               value={shippingInfo.city}
               onChange={changeHandler}
            />
           </div>

           <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium text-gray-600">
             State
             </label>
            <input
              required
               type="text"
               name="state"
               className="mt-1 p-2 w-full border rounded-md"
               placeholder="Enter your state"
               value={shippingInfo.state}
              onChange={changeHandler}
             />
          </div>

         <div className="mb-4">
            <label htmlFor="country" className="block text-sm font-medium text-gray-600">
            Choose a Country
            </label>
            <select
              name="country"
               className="mt-1 p-2 w-full border rounded-md"
               value={shippingInfo.country}
              onChange={changeHandler}
             >
              <option value="">Choose Country</option>
              <option value="usa">usa</option>
              <option value="canada">canada</option>
              <option value="australia">australia</option>
              <option value="uk">uk</option>
              <option value="Bangladesh">Bangladesh</option>
              <option value="India">India</option>
             
            </select>
         </div>

          <div className="mb-4">
            <label htmlFor="pincode" className="block text-sm font-medium text-gray-600">
             Pincode
          </label>
            <input
              required
              type="number"
              id="pincode"
              name="pinCode"
              className="mt-1 p-2 w-full border rounded-md"
              placeholder="Enter your pincode"
              value={shippingInfo.pinCode}
              onChange={changeHandler}
             />
          </div>
         

           <button
            type="submit" 
             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
         >
             Pay Now
        </button>
          <pre>{JSON.stringify(shippingInfo, null,4)}</pre>
       </form>

      </div>
    </div>
  );
};

export default Shipping;