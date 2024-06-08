import { useEffect, useState } from "react";
import { RootState} from"../../redux/store"
import { useSelector } from "react-redux";
import Loading from "./Loading";
import { Outlet } from "react-router-dom";

export default function AdminRoute(){
    const {token, user}= useSelector((state:RootState)=>state.userReducer);
    const [ok, setOk] = useState<boolean>(false);
    useEffect(()=>{
        const isAdmin: boolean =!!user && user.role==="admin" && !!token;
        setOk(isAdmin)
    },[token, user])

    if(user ===null)
        return<Loading/>
        return ok? <Outlet/>:<Loading/>
}