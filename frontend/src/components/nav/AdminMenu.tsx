import { NavLink } from "react-router-dom";
export default function AdminMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 text-lg font-semibold bg-gray-200">Admin Links</div>

      <ul className="list-none">
        <li>
          <NavLink
            className="block py-2 px-4 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md"
            to="/dashboard/admin/createproduct"
          >
            <span className="font-bold">Create product</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className="block py-2 px-4 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md"
            to="/dashboard/admin/products"
          >
            <span className="font-bold">Products</span>
          </NavLink>
        </li>
     

        <li>
          <NavLink
            className="block py-2 px-4 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md"
            to="/dashboard/admin/transaction"
          >
            <span className="font-bold">Transaction</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className="block py-2 px-4 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md"
            to="/dashboard/admin/users"
          >
            <span className="font-bold">Manage Users</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}
