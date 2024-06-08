import { ChangeEvent, FormEvent, useState } from "react"
import toast from "react-hot-toast";
import { useLoginMutation } from "../../redux/api/userAPI";
import { userExist, userNotExist } from "../../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
const LoginPage = () => {
  const [formData, setFormData]= useState({
    email:"",
    password:""
  })
 const [login] =useLoginMutation()
 const dispatch = useDispatch();
  const handleChange=(e: ChangeEvent<HTMLInputElement>)=>{
      const {name, value}= e.target;
      setFormData((prevFormData)=>({
        ...prevFormData,
        [name]:value || ''
      }))
  }
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    try {
      const res = await login(formData); 
      console.log("res===>", res); 
  
      if ("data" in res) {
        const userData = res.data?.user; 
        const token = res.data?.token;
  
        if (userData && token) {
          toast.success("Login successful"); 
          localStorage.setItem("auth", JSON.stringify({ user: userData, token })); 
          dispatch(userExist({ user: userData, token }));
          setFormData({
            email: '',
            password: '',
          });
  
          
        } else {
          toast.error("Invalid response data")
        }
      } else {
        // If the response does not contain 'data'
        const error = res.error as FetchBaseQueryError & {
          data?: { error?: string };
        };
        if (error.data && error.data.error) {
          const message = error.data.error;
          toast.error(message); 
        } else {
          toast.error("An unexpected error occurred"); 
        }
        dispatch(userNotExist());
      }
    } catch (error) {
      console.error("Error during submission:", error); 
      toast.error("Sign In Fail"); 
    }
  };
  

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
    <div className="w-full max-w-md p-8 space-y-8 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-bold text-center">Login</h2>
      <form className="mt-8 space-y-6" onSubmit={handleSubmit} >
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email address
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            autoComplete="email"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div>
          <label htmlFor="password" className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="current-password"
            required
            className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
          />
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember_me"
              name="remember_me"
              type="checkbox"
              className="w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label htmlFor="remember_me" className="block ml-2 text-sm text-gray-900">
              Remember me
            </label>
          </div>
          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>
        <div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
  )
}

export default LoginPage

































































// const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
//   e.preventDefault();
//   try {
//     const res = await login(formData);
//     console.log("res===>", res);

//     if ("data" in res) {
//       const userData = res.data?.user;
//       const token = res.data?.token;

//       if (userData && token) {
//         toast.success("Login successful");
//         localStorage.setItem("auth", JSON.stringify({ user: userData, token }));
//         dispatch(userExist({ user: userData, token }));
//         setFormData({
//           email: '',
//           password: '',
//         });

//         // navigate(`/dashboard/${userData.role === "admin" ? "admin" : "user"}`);
//       } else {
//         toast.error("Invalid response data");
//       }
//     } else {
//       const error = res.error as FetchBaseQueryError & {
//         data?: { error?: string };
//       };
//       if (error.data && error.data.error) {
//         const message = error.data.error;
//         toast.error(message);
//       } else {
//         toast.error("An unexpected error occurred");
//       }
//       // dispatch(userNotExist());
//     }
//   } catch (error) {
//     console.error("Error during submission:", error); // Log the catch block error
//     toast.error("Sign In Fail");
//   }
// };
