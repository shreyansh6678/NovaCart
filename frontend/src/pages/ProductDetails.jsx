import { useParams } from "react-router-dom";
import { api } from "../api/axios.js";
import toast from "react-hot-toast";
import { useState, useEffect } from "react";
import Loader from "../components/Loader/Loader.jsx";
import "./css/productDetails.css"

const ProductDetails = () => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [addingToCart, setAddingToCart] = useState(false);
  const [addingToWishlist,setAddingToWishlist]=useState(false)
  const { productId } = useParams();
  const getProductById = async () => {
    try {
      setLoading(true);
      const response = await api.get(`/products/${productId}`);
      setProduct(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    getProductById();
  }, [productId]);
  if (loading) {
    return <Loader />;
  }
  if (!product) {
    return (
      <div className="products-empty">
        <h2>No Products Found</h2>
        <p>Try checking back later or browse another category.</p>
      </div>
    );
  }
  const handleAddToCart=async()=>{
    try {
      setAddingToCart(true)
      const response=await api.post("/cart",{productId:product._id,quantity:1})
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    finally{
      setAddingToCart(false)
    }
  }
  const handleAddingToWishlist=async()=>{
    try {
      setAddingToWishlist(true)
      const response=await api.post("/wishlist",{productId:product._id,quantity:1})
      toast.success(response.data.message);
    } catch (error) {
      toast.error(error?.response?.data?.message)
    }
    finally{
      setAddingToWishlist(false)
    }
  }
  const discountedPrice =
    Math.floor(product.price -
    (product.price * product.discount) / 100);
  return (
    <div className="product-details">
      <div className="products-image">
        <img
    src={product?.images[0]?.url}
    alt={product.title}
/>
      </div>

      <div className="product-info">
        <p className="category">
    {product.category.name}
</p>
<p className="brand">
    {product.brand}
</p>
<h1>
  {product.title}
</h1>
<div className="price-section">

  <span className="discounted-price">
    ₹{discountedPrice.toLocaleString("en-IN")}
  </span>

  {product.discount > 0 && (
    <>
      <span className="original-price">
        ₹{product.price.toLocaleString("en-IN")}
      </span>

      <span className="discount-badge">
        {product.discount}% OFF
      </span>
    </>
  )}

</div>
<p>
    {product.description}
</p>
<p>{product.stock>0?"In Stock":"Out Of Stock"}</p>
      <div className="buttons">
        <button onClick={handleAddToCart} disabled={addingToCart || product.stock === 0} className="Add-to-cart">{product.stock===0?"Out Of Stock" :addingToCart ?"Adding...":"Add To Cart"}</button>
        <button onClick={handleAddingToWishlist} disabled={addingToWishlist || product.stock === 0} className="wishlist">{product.stock===0?"Out Of Stock" :addingToWishlist ?"Adding...":"Add To Wishlist"}</button>
      </div>
      </div>
    </div>
  );
};

export default ProductDetails;
