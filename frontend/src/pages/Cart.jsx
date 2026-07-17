import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { api } from "../api/axios.js";
import Loader from "../components/Loader/Loader.jsx";
import "./css/cart.css"

const Cart = () => {
  const [cart, setCart] = useState(null);
  const [loading, setLoading] = useState(true);
  const getCart = async () => {
    try {
      setLoading(true);
      const response = await api.get("/cart");
      setCart(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };
  const updateQuantity=async(productId, quantity)=>{
    try {
      await api.patch("/cart",{productId,quantity})
      getCart()
    } catch (error) {
      toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
    }
  }
  const removeItem = async (productId) => {
  try {
    const response = await api.delete(`/cart/${productId}`);

    toast.success(response.data.message);

    getCart();

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
};
const clearCart = async () => {
  try {
    const response = await api.delete("/cart");

    toast.success(response.data.message);

    getCart();

  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  }
};
const placeOrder = async () => {
  try {
    setLoading(true);

    const response = await api.post("/orders",{
      shippingAddress: "Delhi",
      paymentMethod: "COD",
    });

    toast.success(response.data.message);

    navigate("/orders");
  } catch (error) {
    toast.error(
      error?.response?.data?.message || "Something went wrong"
    );
  } finally {
    setLoading(false);
  }
};
  useEffect(() => {
    getCart();
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (!cart || cart.items.length === 0) {
    return (
      <div className="products-empty">
        <h2>Your Cart Is Empty</h2>
        <p>Continue Shopping</p>
      </div>
    );
  }
  const totalItems = cart.items.reduce((acc, item) => acc + item.quantity, 0);
  const grandTotal = cart.items.reduce((acc, item) => {
    const discountedPrice =
      item.product.price - (item.product.price * item.product.discount) / 100;

    return acc + discountedPrice * item.quantity;
  }, 0);
  return (
    <div className="cart-container">
      <h1>Shopping Cart</h1>
      <div className="cart-items list">

      {cart.items.map((item) => {
        const discountedPrice = Math.round(
          item.product.price -
          (item.product.price * item.product.discount) / 100,
        );
        const subtotal = discountedPrice * item.quantity;
        return (
          <div key={item.product._id} className="cart-item">
            <img src={item.product.images?.[0]?.url} alt={item.product.title} />
            <h2>{item.product.title}</h2>
            <p>{item.product.brand}</p>
            <p>₹{discountedPrice.toLocaleString("en-IN")}</p>
            <div className="quantity">
              <button onClick={()=>updateQuantity(item.product._id,item.quantity-1)} disabled={item.quantity === 1}>-</button>
              <p>{item.quantity}</p>
              <button onClick={()=>updateQuantity(item.product._id,item.quantity+1)}>+</button>
            </div>
            <button className="remove-item-cart" onClick={() => removeItem(item.product._id)}>Remove</button>
            <p>Subtotal : ₹{subtotal.toLocaleString("en-IN")}</p>
          </div>
        );
      })}
      </div>
      <div className="cart-summary">
        <h3>Total Items : {totalItems}</h3>

        <h2>Grand Total : ₹{grandTotal.toLocaleString("en-IN")}</h2>

        <button onClick={placeOrder}>Proceed To Checkout</button>
        <button onClick={clearCart}>Clear Cart</button>
      </div>
    </div>
  );
};

export default Cart;
