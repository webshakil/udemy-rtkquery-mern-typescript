import './App.css'
import Menu from './components/nav/Menu'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Home from './pages/Home'
import Register from './pages/auth/register'
import Login from './pages/auth/login'
import Shop from './pages/Shop'
import Cart from './pages/Cart'

function App() {


  return (
    <>
    <BrowserRouter>
     <Menu/>
     <Routes>
        <Route path="/" element ={<Home/>}/>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/shop" element={<Shop/>}/>
        <Route path="/cart" element={<Cart/>}/>
     </Routes>
     </BrowserRouter>
    </>
  )
}

export default App
