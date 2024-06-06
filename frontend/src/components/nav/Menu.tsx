import { Link } from "react-router-dom";


const Menu = () => {


  return (
    <nav className="bg-blue-500 p-4 w-full z-10 pb-5">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-white text-lg font-semibold uppercase">
          Home
        </Link>

        <div className="space-x-4 flex items-center">
          <Link to="/shop" className="text-white hover:text-gray-300">
            <p className="text-xl">Shop</p>
          </Link>     
           <div className="relative inline-block pt-2 pr-1">
            <Link to="/cart" className="text-white hover:text-gray-300 relative flex items-center">
              <p className="text-xl text-white">Cart (3)</p>
            </Link>     </div>

          <Link to="/dashboard/user" className="text-white hover:text-gray-300 font-semibold uppercase">
            Dashboard
          </Link>
          <Link to="/dashboard/user/orders" className="text-white hover:text-gray-300 font-semibold uppercase">
            Order
          </Link>
          <span className="cursor-pointer text-white hover:text-gray-300" >
            <p className="flex justify-start">Hello John</p>
            <p className="text-xl">Logout</p>
          </span>

          <Link to="/register" className="text-white hover:text-gray-300 font-semibold uppercase">
            Register
          </Link>
          <Link to="/login" className="text-white hover:text-gray-300 font-semibold uppercase">
            Login
          </Link>

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
