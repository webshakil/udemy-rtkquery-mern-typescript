

const Menu = () => {


  return (
    <nav className="bg-blue-500 p-4 w-full z-10 pb-5">
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-white text-lg font-semibold uppercase">
          Home
        </a>

        <div className="space-x-4 flex items-center">
          <a href="/shop" className="text-white hover:text-gray-300">
            <p className="text-xl">Shop</p>
          </a>
          <div className="relative inline-block pt-2 pr-1">
            <a href="/cart" className="text-white hover:text-gray-300 relative flex items-center">
              <p className="text-xl text-white">Cart (3)</p>
            </a>
          </div>

          <a href="/dashboard/user" className="text-white hover:text-gray-300 font-semibold uppercase">
            Dashboard
          </a>
          <a href="/dashboard/user/orders" className="text-white hover:text-gray-300 font-semibold uppercase">
            Order
          </a>
          <span className="cursor-pointer text-white hover:text-gray-300" >
            <p className="flex justify-start">Hello John</p>
            <p className="text-xl">Logout</p>
          </span>

          <a href="/register" className="text-white hover:text-gray-300 font-semibold uppercase">
            Register
          </a>
          <a href="/login" className="text-white hover:text-gray-300 font-semibold uppercase">
            Login
          </a>

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
