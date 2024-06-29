import { useSelector } from "react-redux";
import UserMenu from "../../components/nav/UserMenu";
import { RootState } from "../../redux/store";

export default function AdminDashboard() {
  const {user} = useSelector((state:RootState)=>state.userReducer)

  return (
    <div className="w-full h-full flex flex-col">
      <div className="break-normal flex-grow-0 h-1/3 bg-green-800 flex items-center justify-center text-5xl font-semibold pb-2 pt-16">
          Hello {user?.name}
      </div>
      <div className="flex-grow-0 bg-green-800 flex justify-center text-5xl font-semibold pb-2">
           Welcome to {user?.role}-dashboard
      </div>

    
      <div className="flex flex-grow">
        
        <div className="w-1/4">
        <UserMenu/>
        </div>

       
        <div className="w-3/4 p-4">
          <div className="p-3 mb-2 text-lg font-semibold bg-gray-200">Admin Information</div>

          <ul className="list-none">
            <li className="py-2">Name: {user?.name} </li>
            <li className="py-2">Email: {user?.email} </li>
            <li className="py-2">User Role: {user?.role}</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
