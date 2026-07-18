import { useState,useEffect } from "react";
import { useParams } from "react-router-dom";
import { api } from "../../api/axios.js";
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader.jsx";
import "./orderDetails.css";

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const getOrder = async () => {
    try {
      setLoading(true);

      const response = await api.get(`/orders/${orderId}`);

      setOrder(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  getOrder();
}, [orderId]);
const updateStatus = async () => {
  try {
    await api.patch(`/orders/${orderId}/status`, {
      orderStatus: order.orderStatus,
    });

    toast.success("Order status updated");
    getOrder()
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Something went wrong"
    );
  }
};
if (loading) return <Loader />;

if (!order) return <h2 className="order-not-found">Order not found</h2>;
  return (<div className="order-details-container">
    <div className="order-details-card">
      <div className="order-customer-info">
        <h3 className="order-customer-name">{order.user.fullName}</h3>

        <p className="order-customer-email">{order.user.email}</p>

        <p className="order-shipping-address">{order.shippingAddress}</p>

        <p className="order-payment-method">{order.paymentMethod}</p>

        <h2 className="order-total-amount">₹{order.totalAmount}</h2>
      </div>

      <div className="order-status-panel">
        <select
      className="order-status-select"
      value={order.orderStatus}
      onChange={(e) =>
        setOrder((prev) => ({
          ...prev,
          orderStatus: e.target.value,
        }))
      }
    >
      <option value="Pending">Pending</option>
      <option value="Confirmed">Confirmed</option>
      <option value="Shipped">Shipped</option>
      <option value="Delivered">Delivered</option>
      <option value="Cancelled">Cancelled</option>
    </select>
    <button className="order-update-btn" onClick={updateStatus}>
      Update Status
    </button>
      </div>
    </div>

    <div className="order-items-list">
    {order.items.map((item) => (
      <div className="order-item-card" key={item.product._id}>
        <img
          className="order-item-image"
          src={item.product.images[0]?.url}
          alt={item.product.title}
          width={80}
        />

        <h3 className="order-item-title">{item.product.title}</h3>

        <p className="order-item-quantity">Quantity : {item.quantity}</p>

        <p className="order-item-price">₹{item.price}</p>
      </div>
    ))}
    </div>

  </div>)
};

export default OrderDetails;