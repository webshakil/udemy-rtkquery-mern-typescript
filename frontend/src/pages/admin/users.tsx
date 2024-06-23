import AdminMenu from "../../components/nav/AdminMenu";

export default function AdminUser() {


  return (
    <div className="w-full h-full flex flex-col">
    
      <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16 px-8">
            <div>Hello admin dashboard</div>
      </div>
 
      <div className="flex flex-grow">
        <div className="w-1/4">
          <AdminMenu />
        </div>



        <div className="overflow-x-auto">
          <h1 className="text-3xl font-bold mb-4 text-center">List of All Users</h1>

          <div className="text-3xl font-bold mb-4 text-center">
            Total Users: 
          </div>

          <div className="mb-4 flex items-center justify-center">
            <input
              type="text"
              placeholder="Search by User Name, Email, or Phone"
             
              className="border rounded px-4 py-2 w-96"
            />
          </div>

   




           <div className="bg-yellow-100 border border-yellow-300 p-4 rounded-md text-yellow-900">
              No users found for your search term
           </div>
   

        
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
               
                  <tr>
                    <td colSpan={7}>Loading...</td>
                  </tr>
              
                  <tr >
                    <td className="border px-4 py-2">currentPage</td>
                    <td className="border px-4 py-2">name</td>
                    <td className="border px-4 py-2">user.email</td>
                    <td className="border px-4 py-2">phone</td>
                    <td className="border px-4 py-2">Banned or Unbanned</td>
                    <td className="border px-4 py-2">role</td>
                    <td className="border px-4 py-2">
                      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                    
                      </button>
                    </td>
                  </tr>
            
              </tbody>
            </table>
         

            <div className="flex justify-center mt-4 ">
            
                <button className='mx-2 px-4 py-2 rounded-full'></button>
           
            </div>
     
        </div>
      </div>
     
    </div>
  );
}