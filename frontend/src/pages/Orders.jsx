import { useState, useEffect } from "react";
import { api } from "../api/axios.js";
import toast from "react-hot-toast";
import Loader from "../components/Loader/Loader.jsx";
import "./css/orders.css"

const Orders = () => {
  const [orders, setOrders] = useState(null);
  const [loading, setLoading] = useState(true);

  const getMyOrders = async () => {
    try {
      setLoading(true);
      const response = await api.get("/orders");
      setOrders(response.data.data);
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went worng");
    } finally {
      setLoading(false);
    }
  };
  const cancelOrder = async (orderId) => {
    try {
      const response = await api.patch(`/orders/${orderId}/cancel`);

      toast.success(response.data.message);
      setOrders((prev) =>
      prev.map((order) =>
        order._id === orderId
          ? { ...order, status: "Cancelled" }
          : order
      )
    );
    } catch (error) {
      toast.error(error?.response?.data?.message || "Something went wrong");
    }
  };
  useEffect(() => {
    getMyOrders();
  }, []);
  if (loading) {
    return <Loader />;
  }
  if (!orders || orders.length === 0) {
    return (
      <div className="products-empty">
        <h2>No Orders Yet</h2>
        <p>Start shopping to place your first order.</p>
      </div>
    );
  }
  return (
    <div className="orders-container">
      <h1>My Orders</h1>
      <div className="orders-list">
        {orders.map((order) => (
          <div key={order._id} className="order-card">
            <div className="order-header">
              <h2>Order #{order._id.slice(-6).toUpperCase()}</h2>
              <span>{order.status}</span>
            </div>
            <div className="order-items">
              {order.items.map((item) => {
                const discountedPrice = Math.round(
                  item.product.price -
                    (item.product.price * item.product.discount) / 100,
                );
                return (
                  <div key={item.product._id} className="order-item">
                    <img
                      src={item.product.images?.[0]?.url}
                      alt={item.product.title}
                    />

                    <div>
                      <h3>{item.product.title}</h3>
                      <p>{item.product.brand}</p>
                      <p>Quantity: {item.quantity}</p>
                      <p>₹{discountedPrice.toLocaleString("en-IN")}</p>
                      {order.status === "Pending" ? (
                        <button onClick={() => cancelOrder(order._id)}>
                          Cancel Order
                        </button>
                      ) : (
                        <button disabled>Cancelled</button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
            <div className="order-footer">
              <h3>Total: ₹{order.totalAmount.toLocaleString("en-IN")}</h3>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
