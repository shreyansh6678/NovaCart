import { Routes,Route } from "react-router-dom"
import MainLayout from "./layouts/Mainlayout.jsx";
import Home from "./pages/Home.jsx";
import Login from "./pages/Login.jsx";
import Register from "./pages/Register.jsx";
import Products from "./pages/Products.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";
import Cart from "./pages/Cart.jsx";
import Wishlist from "./pages/Wishlist.jsx";
import Orders from "./pages/Orders.jsx";
import Profile from "./pages/Profile.jsx";
import NotFound from "./pages/NotFound.jsx";


function App() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout/>}>
      <Route index element={<Home/>}/>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="/products" element={<Products/>}/>
      <Route path="/products/:productId" element={<ProductDetails/>}/>
      <Route path="/cart" element={<Cart/>}/>
      <Route path="wishlist" element={<Wishlist />} />
      <Route path="orders" element={<Orders />} />
      <Route path="profile" element={<Profile />} />
      </Route>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
