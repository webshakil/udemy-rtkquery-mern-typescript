import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { Link, useNavigate } from "react-router-dom";
import { userNotExist } from "../../redux/reducer/userReducer";
import { FaShoppingBag, FaShoppingCart } from "react-icons/fa";
import { IoLogOut } from "react-icons/io5";
import { Badge } from "antd";
const Menu = () => {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const {cartItems} = useSelector((state:RootState)=>state.cartReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logout = () => {
    localStorage.removeItem("auth");
    dispatch(userNotExist());
    navigate("/login");
  };

  return (
    <nav className="bg-blue-500 p-4  w-full z-10 pb-5 ">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold uppercase">
          Home
        </Link>

        <div className="space-x-4 flex items-center">
          
          <Link to="/shop" className="text-white hover:text-gray-300">
            <FaShoppingBag className="text-xl" />
          </Link>
          <div className="relative inline-block pt-2 pr-1">
            <Link to="/cart" className="text-white hover:text-gray-300 relative flex items-center">
              <Badge  count={cartItems?.length>=1 ? cartItems.length :0 } showZero={true} >
                <FaShoppingCart className="text-xl text-white" />
              </Badge>
            </Link>
           
          </div>

          {user ? (
            <>
              <Link
                to={`/dashboard/${user?.role === "admin" ? "admin" : "user"}`}
                className="text-white hover:text-gray-300 font-semibold uppercase"
              >
                Dashboard
              </Link>
              <Link
                to="/dashboard/user/orders"
                className="text-white hover:text-gray-300 font-semibold uppercase"
              >
                Order
              </Link>
             
              <span
                className="cursor-pointer text-white hover:text-gray-300"
                onClick={logout}
              >
                < p className="flex justify-start">Hello {user.name}</p><IoLogOut className="text-xl" />
              </span>
            </>
          ) : (
            <>
              <Link to="/register" className="text-white hover:text-gray-300 font-semibold uppercase">
                Register
              </Link>
              <Link to="/login" className="text-white hover:text-gray-300 font-semibold uppercase">
                Login
              </Link>
             
            </>
          )}
         

          <div className="relative inline-block text-white">
            <div className="absolute hidden bg-white text-gray-800 p-2 mt-2 space-y-2 rounded shadow-md">
              <a href="#" className="block">
                Category 1
              </a>
              <a href="#" className="block">
                Category 2
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Menu;

   
