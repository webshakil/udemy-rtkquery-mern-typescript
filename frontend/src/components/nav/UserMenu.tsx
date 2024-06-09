import { NavLink } from "react-router-dom";

export default function UserMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 text-lg font-semibold bg-gray-200">Admin Links</div>

      <ul className="list-none">
        <li>
          <NavLink
            className="block py-2 px-4 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md"
            to="/dashboard/user/profile"
          >
            <span className="font-bold">Profile</span>
          </NavLink>
        </li>

        <li>
          <NavLink
            className="block py-2 px-4 transition duration-300 ease-in-out hover:bg-gray-100 hover:shadow-md"
            to="/dashboard/user/orders"
          >
            <span className="font-bold">Order History</span>
          </NavLink>
        </li>
      </ul>
    </>
  );
}
