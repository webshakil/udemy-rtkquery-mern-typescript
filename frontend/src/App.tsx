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

function App() {
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
          </Route>
          <Route path="/dashboard" element={<AdminRoute/>}>
              <Route path="admin" element={<AdminDashboard/>}/>
          </Route>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
