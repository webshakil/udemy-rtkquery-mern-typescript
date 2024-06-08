import { useEffect, useState } from "react";
import { RootState} from"../../redux/store"
import { useSelector } from "react-redux";
import { Outlet } from "react-router-dom";
import Loading from "./Loading";

export default function PrivateRoute(){
    const {token} = useSelector((state: RootState)=>state.userReducer)
    const [ok, setOk] =useState(false)
    useEffect(()=>{
        if(token){
            setOk(true)
        }else{
            setOk(false)
        }
    },[token])
    return ok ? <Outlet/>:<Loading/>
}