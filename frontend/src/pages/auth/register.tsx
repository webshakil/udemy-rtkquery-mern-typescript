import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import { userExist, userNotExist } from "../../redux/reducer/userReducer";
import { useDispatch } from "react-redux";
import { useRegisterMutation } from "../../redux/api/userAPI";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { User } from "../../types/types";

interface FormData {
  name: string;
  email: string;
  password: string;
  phone: string;
}

interface RegisterResponse {
  message: string;
  user: User;
  token: string;
}

const Register = () => {
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    password: "",
    phone: ""
  });

  const navigate = useNavigate();

  const dispatch = useDispatch();
  const [register] = useRegisterMutation();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value || ''
    }));
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await register(formData);
      if ('data' in res) {
        const responseData = res.data as RegisterResponse;
        toast.success(responseData.message);

        const userData = responseData.user;
        const token = responseData.token;

        localStorage.setItem("auth", JSON.stringify({ user: userData, token }));
        dispatch(userExist({ user: userData, token }));

        setFormData({
          name: '',
          email: '',
          password: '',
          phone: "",
        });
        navigate("/");
      } else {
        const error = res.error as FetchBaseQueryError & {
          data?: { error?: string };
        };

        console.log("Error object:", error);

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
        <h2 className="text-2xl font-bold text-center">Register</h2>
        <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700">
              Name
            </label>
            <input
              id="name"
              name="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
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
              autoComplete="new-password"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="phone" className="block text-sm font-medium text-gray-700">
              Phone
            </label>
            <input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleChange}
              placeholder="123-456-7890"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Register
            </button>
          </div>
        </form>

        <div className="text-gray-600 text-sm flex flex-col items-center">
          <Link to="/login" className="mb-2 text-blue-500 hover:underline">
            Already registered? Login
          </Link>
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            Forgot your password? Reset Password
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
