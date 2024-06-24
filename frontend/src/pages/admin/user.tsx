import { MdDelete } from "react-icons/md";
import AdminMenu from "../../components/nav/AdminMenu";
import { User } from "../../types/types";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { RootState, server } from "../../redux/store";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import toast from "react-hot-toast";

const UserEdit = () => {
    const [user, setUser] =useState<User | null>(null);
    const [status, setStatus] =useState<string>("");
    const [role, setRole] = useState<string>("");
    const {token} = useSelector((state:RootState)=>state.userReducer);
    const params = useParams();
    const navigate = useNavigate();

    useEffect(()=>{
        const fetchUser = async()=>{
            try{
              const response= await axios.get(`${server}/api/v1/users/${params.id}`,{
                headers: {
                    Authorization: `${token}`,
                }
              });
              if(!response.data.user){
                console.error("User not found");
                return;
              }
              setUser(response.data.user);
              setStatus(response.data.user.isBanned ? 'banned' :"active");
              setRole(response.data.role)

            }catch(error){
                console.error("Error fetching user data", error)
            }
        }
        fetchUser();
    }, [params.id, token])
    const handleStatusChange =(e:React.ChangeEvent<HTMLSelectElement>)=>{
        const newStatus = e.target.value;
        setStatus(newStatus);
        setUser((prevUser)=>({
            ...(prevUser as User),
            isBanned: newStatus ==='banned'
        }))
    }
    const handleRoleChange =(e:React.ChangeEvent<HTMLSelectElement>)=>{
        setRole(e.target.value);
    }
    const handleUpdate = async()=>{
        try{
            const response= await axios.put(`${server}/api/v1/users/${user?._id}`,{
                role, isBanned: user?.isBanned
            },
        {
            headers: {
                Authorization:`${token}`
            }
        })
        const updatedUser = response.data.user;
        setUser(updatedUser);
        toast.success("User Updated Successfully")
        }catch(error){
            console.error('Error udating user', error)
        }
    }
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
              {user &&
                 <div className="items-center justify-center">
                   <h1 className="text-2xl font-bold mb-4">
                     Edit <span className="text-black-500">{user.name}</span>'s profile
                 </h1>
      
                   <div className="mb-4">
                     <label className="block text-gray-600">Name</label>
                     <input
                       type="text"
                       value={user.name}
                       readOnly
                       onChange={(e)=>setUser((prevUser)=>({...(prevUser as User), name:e.target.value}))}
                       className="border p-2 w-96 rounded-lg"
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-600 ">Email</label>
                     <input
                       type="text"
                       value={user.email}
                       onChange={(e)=>setUser((prevUser)=>({...(prevUser as User), email:e.target.value}))}
                       className="border p-2 w-96 rounded-lg"
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-600">Phone</label>
                     <input
                       type="text"
                       value={user.phone || ""}
                       onChange={(e)=>setUser((prevUser)=>({...(prevUser as User), phone:e.target.value}))}
                       
                       className="border p-2 w-96 rounded-lg"
                     />
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-600">Status</label>
                     <select
                       
                       value={status}
                       onChange={handleStatusChange}
                       className="border p-2 w-96 rounded-lg"
                     >
                       <option value="active">Active</option>
                       <option value="banned">Banned</option>
                     </select>
                   </div>
                   <div className="mb-4">
                     <label className="block text-gray-600">Role</label>
                     <select
                      
                      value={role}
                      onChange={handleRoleChange}
                       className="border p-2 w-96 rounded-lg"
                     >
                       <option value="user">User</option>
                       <option value="admin">Admin</option>
                     </select>
                   </div>
                   <div className="flex space-x-4">
                     <button
                       onClick={handleUpdate}
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
          

}

             </div>
           </div>
         </div>
  );
};

export default UserEdit;