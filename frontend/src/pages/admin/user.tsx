import { MdDelete } from "react-icons/md";
import AdminMenu from "../../components/nav/AdminMenu";

const UserEdit = () => {
return (

    <div className="flex flex-col h-screen">
           <div className="flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-12 pt-16 px-8">
             <div>Admin Dashboard</div>
           </div>
    
           <div className="flex flex-grow  mb-12">
             <div className="w-1/4">
               <AdminMenu />
             </div>
    
             <div className="container mx-auto mt-8">
              
                 <div className="items-center justify-center">
                   <h1 className="text-2xl font-bold mb-4">
                     Edit <span className="text-black-500">name</span>'s profile
                 </h1>
      
                   <div className="mb-4">
                     <label className="block text-gray-600">Name</label>
                     <input
                       type="text"
                      
                       readOnly
                    
                       className="border p-2 w-96 rounded-lg"
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-600 ">Email</label>
                     <input
                       type="text"
                      
                      
                       className="border p-2 w-96 rounded-lg"
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-600">Phone</label>
                     <input
                       type="text"
                      
                       
                       className="border p-2 w-96 rounded-lg"
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-600">Status</label>
                     <select
                       
                       
                       className="border p-2 w-96 rounded-lg"
                     >
                       <option value="active">Active</option>
                       <option value="banned">Banned</option>
                     </select>
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-600">Role</label>
                     <select
                      
                      
                       className="border p-2 w-96 rounded-lg"
                     >
                       <option value="user">User</option>
                       <option value="admin">Admin</option>
                     </select>
                   </div>
                   <div className="flex space-x-4">
                     <button
                       
                       className="bg-blue-500 text-white px-4 py-2 rounded"
                     >
                       Update
                     </button>
                     <button
                      
                       className="bg-red-500 text-white px-4 py-2 rounded"
                     >
                       <MdDelete />
                     </button>
                  
                   </div>
                    
                 </div>
          
             </div>
             
           </div>
         
         </div>
  );
};

export default UserEdit;