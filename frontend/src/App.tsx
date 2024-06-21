import './App.css'
import Menu from './components/nav/Menu'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/auth/register'

import Shop from './pages/Shop'
import Cart from './pages/Cart'
import { Toaster } from 'react-hot-toast'
import LoginPage from './pages/auth/login'
import PrivateRoute from './components/routes/PrivateRoutes'
import UserDashboard from './pages/user/Dashboard'
import AdminRoute from './components/routes/AdminRoute'
import AdminDashboard from './pages/admin/Dashboard'
import CreateProduct from './pages/admin/CreateProduct'
import AdminProduct from './pages/admin/Products'
import SingleProduct from './pages/admin/product'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import { userExist, userNotExist } from './redux/reducer/userReducer'
import Shipping from './pages/user/Shipping'
import Orders from './pages/user/Orders'
import CheckOut from './pages/user/CheckOut'
import Transaction from './pages/admin/transaction'
import TransactionManagement from './pages/admin/transactionManagement'



function App() {
  const dispatch = useDispatch();
  const userString = localStorage.getItem("auth");
  const user = userString? JSON.parse(userString): null;
  const PageNotFound=()=>{
    return(<div className="flex justify-center items-center h-screen">
      <h1 className='text-4xl font-blod'>404 | Page Not Found</h1>
    </div>)
  }
  useEffect(()=>{
    if(user){
      dispatch(userExist(user))
    }else{
      dispatch(userNotExist())
    }
  }, [dispatch, user])
 
  return (
    <>
    <BrowserRouter>
     <Menu/>
     <Toaster position="top-center" toastOptions={{style: {background: '#4CAF50',color: '#FFFFFF'},duration: 5000}}/> 
     <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<LoginPage/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/cart" element={<Cart/>}/>
        

     
          <Route path="/dashboard" element={<PrivateRoute/>}>
              <Route path="user" element={<UserDashboard/>}/>
              <Route path="user/shipping" element={<Shipping/>}/>
              <Route path="user/orders" element={<Orders/>}/>
              <Route path="user/pay" element={<CheckOut/>}/>
          </Route>
          <Route path="/dashboard" element={<AdminRoute/>}>
              <Route path="admin" element={<AdminDashboard/>}/>
              <Route path="admin/products" element={<AdminProduct/>}/>
              <Route path="admin/createproduct" element={<CreateProduct/>}/>
              <Route path="admin/product/:id" element={<SingleProduct/>}/>
              <Route path="admin/transaction" element={<Transaction/>}/>
              <Route path="admin/transaction/:id" element={<TransactionManagement/>}/>
          </Route>
          <Route path="*" element={<PageNotFound/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
