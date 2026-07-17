import { Routes,Route } from "react-router-dom"
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";
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
      <Route path="products" element={<Products/>}/>
      <Route path="products/:productId" element={<ProductDetails/>}/>
      <Route path="cart" element={<ProtectedRoute><Cart/></ProtectedRoute>}/>
      <Route path="wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
      <Route path="orders" element={<ProtectedRoute><Orders /></ProtectedRoute>} />
      <Route path="profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
      </Route>
      <Route path="/login" element={<Login/>}/>
      <Route path="/register" element={<Register/>}/>
      <Route path="*" element={<NotFound/>}/>
    </Routes>
  )
}

export default App
