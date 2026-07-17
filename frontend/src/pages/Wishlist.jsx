import {useEffect,useState} from 'react'
import toast from 'react-hot-toast'
import Loader from "../components/Loader/Loader.jsx"
import { api } from '../api/axios.js'
import "./css/wishlist.css"
const Wishlist = () => {
  const [wishlist,setWishlist]=useState(null)
  const [loading,setLoading]=useState(true)
  const getWishlist=async()=>{
    try {
      setLoading(true)
      const response=await api.get("/wishlist")
      console.log(response.data.data)
      setWishlist(response.data.data)
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong")
    }
    finally{
      setLoading(false)
    }
  }
  const removeFromWishlist=async(productId)=>{
     try {
    const response = await api.delete(`/wishlist/${productId}`);

    toast.success(response.data.message);

    getWishlist();
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
  }
  const moveToCart = async (productId) => {
  try {
    await api.post("/cart", {
      productId,
      quantity: 1,
    });
    await api.delete(`/wishlist/${productId}`);
    setWishlist((prev) => ({
      ...prev,
      products: prev.products.filter(
        (product) => product._id !== productId
      ),
    }));

    toast.success("Product moved to cart");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
};
  useEffect(()=>{
    getWishlist()
  },[])
  if(loading){
    return <Loader/>
  }
  if(!wishlist || wishlist.products.length===0){
    return (<div className="products-empty">
        <h2>Your Wishlist Is Empty</h2>
        <p>Add products you love ❤️</p>
      </div>)
  }
  return (
    <div className='wishlist-container'>
      <div className="wishlist-items-list">
        {wishlist.products.map((product)=>{
          const discountedPrice=Math.round(product.price-(product.price*product.discount)/100)
          return(
          <div key={product._id} className="wishlist-item">
            <img src={product.images?.[0]?.url} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.brand}</p>
            <p>₹{discountedPrice.toLocaleString("en-IN")}</p>
            <button className='remove' onClick={()=>removeFromWishlist(product._id)}>Remove</button>
            <button className='move-to-cart' onClick={() => moveToCart(product._id)}>Move To Cart</button>
          </div>
        )
})}
      </div>
    </div>
  )
}

export default Wishlist
