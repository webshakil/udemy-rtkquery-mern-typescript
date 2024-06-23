import { useSelector } from "react-redux";
import { MdOutlineRemoveRedEye } from "react-icons/md";
import { RootState } from "../../redux/store";
import { useEffect, useState } from "react";
import { useAllUsersQuery } from "../../redux/api/userAPI";
import { CustomError } from "../../types/api-types";
import toast from "react-hot-toast";
import AdminMenu from "../../components/nav/AdminMenu";
import { Link } from "react-router-dom";

export default function AdminUser() {
  const { user } = useSelector((state: RootState) => state.userReducer);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);

  const { data, isError, error, isLoading } = useAllUsersQuery({
    search: searchTerm,
    page: currentPage,
    limit: 5,
  });

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  useEffect(() => {
    if (isError) {
      const err = error as CustomError;
    
      if (searchTerm.trim() !== '') {
        toast.error(err.data.message);
      }
    }
  }, [isError, error, searchTerm]);

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setCurrentPage(1);
  };

  return (
    <div className="w-full h-full flex flex-col">
      
      <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16 px-8">
      <div>Hello {user?.name}-admin dashboard</div>
    </div>

      
      <div className="flex flex-grow">
        
        <div className="w-1/4">
          <AdminMenu />
        </div>

        
        <div className="overflow-x-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">List of All Users</h1>

          <div className="text-3xl font-bold mb-4 text-center">
            Total Users: {data?.pagination?.totalUser}
          </div>
          <div className="mb-4 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search by User Name, Email, or Phone"
              value={searchTerm}
              onChange={handleSearch}
              className="border rounded px-4 py-2 w-96"
            />
          </div>

          {isLoading && <div>Loading...</div>}

          {data?.users && data.users.length === 0 && !isLoading && !isError && (
           <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-md text-yellow-900">
           No users found for your search term
         </div>
          )}

          {data?.users && data.users.length > 0 && (
            <table className="min-w-full table-auto">
              <thead className="bg-gray-200">
                <tr>
                  <th className="px-4 py-2">Serial No.</th>
                  <th className="px-4 py-2">User Name</th>
                  <th className="px-4 py-2">Email</th>
                  <th className="px-4 py-2">Phone</th>
                  <th className="px-4 py-2">Status</th>
                  <th className="px-4 py-2">Role</th>
                  <th className="px-4 py-2">Action</th>
                </tr>
              </thead>
              <tbody>
                {isLoading ? (
                  <tr>
                    <td colSpan={7}>Loading...</td>
                  </tr>
                ) : data?.users.map((user, index) => (
                  <tr key={user._id}>
                    <td className="border px-4 py-2">{(currentPage - 1) * 5 + index + 1}</td>
                    <td className="border px-4 py-2">{user.name}</td>
                    <td className="border px-4 py-2">{user.email}</td>
                    <td className="border px-4 py-2">{user.phone}</td>
                    <td className="border px-4 py-2">{user.isBanned ? 'Banned' : 'Unbanned'}</td>
                    <td className="border px-4 py-2">{user.role}</td>
                    <td className="border px-4 py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                      <Link to={`/dashboard/admin/user/${user._id}`}><MdOutlineRemoveRedEye /></Link>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {data?.pagination && (
            <div className="flex justify-center mt-4 ">
              {[...Array(data.pagination.totalPages)].map((_, index) => (
                <button
                  key={index}
                  className={`mx-2 px-4 py-2 rounded-full ${
                    currentPage === index + 1 ? "bg-blue-500 text-white" : "bg-gray-300"
                  }`}
                  onClick={() => setCurrentPage(index + 1)}
                >
                  {index + 1}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}