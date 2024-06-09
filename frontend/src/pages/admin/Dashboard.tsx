import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminDashboard() {

  return (
    <div className="w-full h-full flex flex-col">
      {/* Upper area with greeting */}
      <div className="break-normal flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-2 pt-16">
          Hello Admin
      </div>
      <div className="flex-grow-0 bg-green-800 flex justify-center text-5xl font-semibold pb-2">
           Admin-dashboard
      </div>

      {/* Lower area with Admin Links and Information */}
      <div className="flex flex-grow">
        {/* Left side with Admin Links */}
        <div className="w-1/4">
        <AdminMenu />
        </div>

        {/* Right side with Admin Information */}
        <div className="w-3/4 p-4">
          <div className="p-3 mb-2 text-lg font-semibold bg-gray-200">Admin Information</div>

          <ul className="list-none">
            <li className="py-2">Name</li>
            <li className="py-2">Email</li>
            <li className="py-2">Admin</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

